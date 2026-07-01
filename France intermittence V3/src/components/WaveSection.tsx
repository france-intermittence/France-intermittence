import cameraIcon from '../../icone/Caméra-32.svg'
import masksIcon from '../../icone/masque de comédien-32.svg'
import microphoneIcon from '../../icone/micro-32.svg'

const baseHeights = [
  18, 28, 40, 66, 84, 60, 28, 22, 48, 86, 108, 76, 36, 24, 46, 70, 94, 74, 42, 30, 52, 88, 112,
  90, 64, 44, 24, 36, 56, 84, 104, 82, 46, 32, 54, 76, 94, 64, 34, 20,
]
const waveHeights = [...baseHeights, ...baseHeights, ...baseHeights, ...baseHeights]

export function WaveSection() {
  return (
    <section className="wave-section" aria-hidden="true">
      <div className="wave-section__bars">
        {waveHeights.map((height, index) => (
          <span
            key={`${height}-${index}`}
            className={`wave-section__bar wave-section__bar--${index % 3}`}
            style={{ height }}
          />
        ))}
      </div>
      <img
        src={cameraIcon}
        className="wave-section__illustration wave-section__illustration--left"
        alt=""
        loading="lazy"
        decoding="async"
      />
      <img
        src={masksIcon}
        className="wave-section__illustration wave-section__illustration--center"
        alt=""
        loading="lazy"
        decoding="async"
      />
      <img
        src={microphoneIcon}
        className="wave-section__illustration wave-section__illustration--right"
        alt=""
        loading="lazy"
        decoding="async"
      />
    </section>
  )
}
