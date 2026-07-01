import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import sharp from 'sharp'
import { optimize as svgoOptimize } from 'svgo'

/**
 * Build-time media optimizer.
 *
 * Runs in `generateBundle`, i.e. AFTER assets have been emitted, so it never
 * touches the source files or the import paths used in the app code. It only
 * rewrites the bytes of the emitted assets:
 *
 *  - PNG/JPG  -> recompressed with sharp (same dimensions, visually identical).
 *  - SVG      -> the embedded base64 raster (these "icons" are actually a small
 *                <svg> wrapping a huge full-resolution PNG) is decoded,
 *                downscaled to a sane max size and recompressed, then re-embedded.
 *                SVGO then cleans up the remaining markup.
 *
 * Nothing here changes which image is shown or how it is laid out: dimensions,
 * viewBox and aspect ratios are preserved. We only drop wasted pixels/bytes.
 */
function mediaOptimizer(): Plugin {
  // Embedded rasters in the SVG icons are downscaled to this longest edge.
  // The icons render at <= ~120px on screen, so 512px keeps them crisp on
  // high-DPI displays while removing the multi-megabyte overscaled payload.
  const MAX_EMBEDDED_EDGE = 512
  const EMBEDDED_QUALITY = 78
  const PNG_QUALITY = 80

  async function recompressRaster(
    buffer: Buffer,
    mime: string,
    maxEdge?: number,
    quality = EMBEDDED_QUALITY,
  ): Promise<Buffer> {
    let pipeline = sharp(buffer, { failOn: 'none' })
    if (maxEdge) {
      pipeline = pipeline.resize({
        width: maxEdge,
        height: maxEdge,
        fit: 'inside',
        withoutEnlargement: true,
      })
    }
    if (mime.includes('jpeg') || mime.includes('jpg')) {
      return pipeline.jpeg({ quality, mozjpeg: true }).toBuffer()
    }
    // PNG (the embedded rasters here are all PNG). Quantise + max compression.
    return pipeline
      .png({ quality, compressionLevel: 9, effort: 10, palette: true })
      .toBuffer()
  }

  async function optimizeSvg(source: string): Promise<string> {
    // 1) Recompress any embedded base64 raster(s).
    const dataUriRe = /data:image\/(png|jpe?g);base64,([A-Za-z0-9+/=]+)/g
    const matches = [...source.matchAll(dataUriRe)]
    let out = source
    for (const match of matches) {
      const [full, fmt, b64] = match
      try {
        const original = Buffer.from(b64, 'base64')
        const optimized = await recompressRaster(
          original,
          `image/${fmt}`,
          MAX_EMBEDDED_EDGE,
        )
        if (optimized.length < original.length) {
          const newUri = `data:image/${
            fmt === 'jpg' ? 'jpeg' : fmt
          };base64,${optimized.toString('base64')}`
          out = out.replace(full, newUri)
        }
      } catch {
        // Leave the raster untouched if it can't be decoded.
      }
    }
    // 2) Clean up the SVG markup itself (keep viewBox so rendering is identical).
    // preset-default keeps the viewBox by default in current SVGO, so on-screen
    // sizing/scaling stays identical. We don't override removeViewBox to avoid
    // a deprecation warning in this SVGO version.
    const result = svgoOptimize(out, { multipass: true })
    return result.data
  }

  return {
    name: 'media-optimizer',
    apply: 'build',
    async generateBundle(_options, bundle) {
      for (const [fileName, asset] of Object.entries(bundle)) {
        if (asset.type !== 'asset') continue
        const lower = fileName.toLowerCase()
        try {
          if (lower.endsWith('.svg')) {
            const source =
              typeof asset.source === 'string'
                ? asset.source
                : Buffer.from(asset.source).toString('utf8')
            asset.source = await optimizeSvg(source)
          } else if (
            lower.endsWith('.png') ||
            lower.endsWith('.jpg') ||
            lower.endsWith('.jpeg')
          ) {
            const buffer = Buffer.isBuffer(asset.source)
              ? asset.source
              : Buffer.from(asset.source as Uint8Array)
            const mime = lower.endsWith('.png') ? 'image/png' : 'image/jpeg'
            const optimized = await recompressRaster(
              buffer,
              mime,
              undefined,
              PNG_QUALITY,
            )
            if (optimized.length < buffer.length) {
              asset.source = optimized
            }
          }
        } catch {
          // Never fail the build on an un-optimizable asset; keep the original.
        }
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mediaOptimizer()],
})
