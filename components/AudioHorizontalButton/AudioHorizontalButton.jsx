/**
 * @file AudioHorizontalButton.js
 */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import styles from './AudioHorizontalButton.module.css'

const AudioHorizontalButton = (props) => {
  const { tagName: Tag, className, variant, children, color } = props
  const [active, setActive] = useState(false)

  return (
    <Tag
      className={`${styles.audio_horizontal_button} ${
        styles[`audio_horizontal_button__${variant}`]
      } ${className} ui-audio active`}
      onClick={() => setActive(!active)}
    >
      <button
        className={`sound-toggle ${
          active ? 'audio-on' : ''
        } focus:shadow-none focus:outline-none`}
      >
        <div className="flex items-end justify-between bars">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </button>
      <style jsx>{`
        .ui-audio {
          position: fixed;
          bottom: 2rem;
          right: 1.5rem;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          transition: all 0.8s cubic-bezier(0.6, 0.4, 0.05, 0.95) 0.7s;
          z-index: 70;
          transform: translateY(100px);
          opacity: 0;
        }

        @media (min-width: 768px) {
          .ui-audio {
            z-index: 91;
            bottom: 3.5rem;
            right: 1.75rem;
          }
        }

        .ui-audio.active {
          transition: all 0.8s cubic-bezier(0.6, 0.4, 0.05, 0.95);
          transform: translateY(0);
          opacity: 1;
        }

        .ui-audio .sound-toggle {
          width: auto;
          height: 60px;
        }

        .ui-audio .sound-toggle.audio-on .bar:first-child {
          -webkit-animation-delay: 0.1s;
          animation-delay: 0.1s;
        }
        .ui-audio .sound-toggle.audio-on .bar:nth-child(2) {
          -webkit-animation-delay: 0.3s;
          animation-delay: 0.3s;
        }
        .ui-audio .sound-toggle.audio-on .bar:nth-child(3) {
          -webkit-animation-delay: 0.5s;
          animation-delay: 0.5s;
        }
        .ui-audio .sound-toggle.audio-on .bar:nth-child(4) {
          -webkit-animation-delay: 0.7s;
          animation-delay: 0.7s;
        }
        .ui-audio .sound-toggle.audio-on .bar:nth-child(5) {
          -webkit-animation-delay: 0.9s;
          animation-delay: 0.9s;
        }
        .ui-audio .sound-toggle.audio-on .bar:nth-child(6) {
          -webkit-animation-delay: 1.1s;
          animation-delay: 1.1s;
        }
        .ui-audio .sound-toggle.audio-on .bar:nth-child(7) {
          -webkit-animation-delay: 1.3s;
          animation-delay: 1.3s;
        }
        .ui-audio .sound-toggle.audio-on .bar:nth-child(8) {
          -webkit-animation-delay: 1.5s;
          animation-delay: 1.5s;
        }
        .ui-audio .sound-toggle.audio-on .bar:nth-child(9) {
          -webkit-animation-delay: 1.7s;
          animation-delay: 1.7s;
        }

        .ui-audio .sound-toggle.audio-on .bar {
          height: 20px;
          -webkit-animation: oscilate-data 1.5s linear infinite;
          animation: oscilate-data 1.5s linear infinite;
        }

        .ui-audio .sound-toggle .bar {
          width: 1px;
          height: 8px;
          margin: 2px;
          background: ${color};
          border-radius: 3px;
          transition: all 0.2s ease-out;
        }

        @keyframes oscilate-data {
          0% {
            transform: scaleY(1);
          }
          25% {
            transform: scaleY(1.25);
          }
          75% {
            transform: scaleY(0.25);
          }
          100% {
            transform: scaleY(1);
          }
        }
      `}</style>
    </Tag>
  )
}

AudioHorizontalButton.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
  color: PropTypes.string,
}

AudioHorizontalButton.defaultProps = {
  tagName: 'div',
  className: '',
  variant: 'default',
  children: '',
  color: '#000000',
}

export default AudioHorizontalButton
