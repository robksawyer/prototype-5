/**
 * @file SineWave.js
 */
import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'

import styles from './SineWave.module.css'

const SineWave = (props) => {
  const { tagName: Tag, className, variant, children } = props

  gsap.registerPlugin(CustomEase)

  const svg = useRef()
  const wave = useRef()

  const width = 300
  const amplitude = 100
  const frequency = 20
  const segments = 500
  const interval = width / segments

  useEffect(() => {
    const sinus = CustomEase.create(
      'sinus',
      'M0,0 C0.4,0 0.3,1 0.5,1 0.7,1 0.6,0 1,0'
    )

    gsap.defaults({
      ease: 'sine.inOut',
    })

    gsap.set('g', {
      y: window.innerHeight / 2,
    })

    for (let i = 0; i <= segments; i++) {
      var norm = 1 - i / segments
      var point = wave.current.points.appendItem(svg.current.createSVGPoint())

      point.x = i * interval
      point.y = (amplitude / 2) * sinus(norm)

      console.log('point', point)
      gsap
        .to(point, 0.3, {
          duration: 0.3,
          y: -point.y,
          repeat: -1,
          yoyo: true,
        })
        .progress(norm * frequency)
    }
  }, [])

  return (
    <Tag
      className={`${styles.sine_wave} ${
        styles[`sine_wave__${variant}`]
      } ${className} absolute flex justify-center items-center w-screen h-screen`}
    >
      <svg ref={svg}>
        <g>
          <line id="line" x1="0" x2="100%" />
          <polyline id="wave" ref={wave} />
        </g>
      </svg>
      <style jsx>{`
        svg {
          width: ${width};
          height: 100%;
          padding: 50px;
        }

        line {
          stroke-width: 1;
          stroke: #3c3c3c;
        }

        #wave {
          fill: none;
          stroke-width: 4;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke: #56acf4;
        }
      `}</style>
    </Tag>
  )
}

SineWave.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
}

SineWave.defaultProps = {
  tagName: 'div',
  className: '',
  variant: 'default',
  children: '',
}

export default SineWave
