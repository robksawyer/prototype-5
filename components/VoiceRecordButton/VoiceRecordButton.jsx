/**
 * @file VoiceRecordButton.js
 */
import * as React from 'react'
import PropTypes from 'prop-types'

import styles from './VoiceRecordButton.module.css'

const VoiceRecordButton = (props) => {
  const { tagName: Tag, className, variant, children } = props

  return (
    <Tag
      className={`${styles.voice_record_button} ${
        styles[`voice_record_button__${variant}`]
      } ${className} ui-record active`}
    >
      <div className="recordFlowTrigger">
        <button className="reactive-cta reactiveCta recordJourney active focus:shadow-none focus:outline-none">
          <div className="background">
            <div className="wiggle-lines">
              <svg
                className="wiggle"
                viewBox="-100 -100 200 200"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M-53.53457138537734 67.45159008000333C-40.84543436921754 77.52262785101398 -30.413113814935222 94.61485890470368 -14.388479921333998 96.99206494879134C1.6361539722672251 99.369270992879 14.823734099285884 81.59429248659143 29.890077159533412 75.64069636400038C44.95642021978094 69.68710024140933 64.43007287352923 71.81872938542836 74.50111064453922 59.12959236926803C84.57214841554922 46.440455353107716 85.71228451937144 29.092443790437706 88.08949056345827 13.067809896836364C90.4666966075451 -2.95682399676498 89.65550201285416 -18.009190954151798 83.70190589026234 -33.07553401439902C77.74830976767052 -48.14187707464624 68.63934685510165 -60.42416787432863 55.95020983894081 -70.49520564533798C43.26107282277997 -80.56624341634732 29.231334138523742 -86.64853780925549 13.206700244922274 -89.0257438533415C-2.817933648679194 -91.4029498974275 -18.00919095415641 -89.65550201285323 -33.075534014403324 -83.70190589026063C-48.14187707465024 -77.74830976766803 -60.424167874332156 -68.63934685509852 -70.49520564534085 -55.95020983893718C-80.56624341634954 -43.26107282277582 -86.64853780925698 -29.23133413851928 -89.02574385334216 -13.206700244917693C-91.40294989742735 2.817933648683896 -89.9644830756155 18.131287500739433 -84.01088695302214 33.19763056098604C-78.05729083042877 48.26397362123265 -66.22370840152418 57.380552309004855 -53.53457138536231 67.45159008001289"></path>
                <path d="M-12.02492056852887 81.05942275788892C3.999713325072353 83.43662880197658 21.194647809008472 97.71671153911875 36.260990869256 91.7631154165277C51.327333929503524 85.80951929393665 56.41826287512097 65.45996432478117 66.48930064613097 52.770827308620845C76.56033841714097 40.08169029246053 87.5847910991365 29.37022448661868 89.96199714322333 13.34559059301734C92.33920318731016 -2.679043300584004 89.65550201285416 -18.009190954151798 83.70190589026234 -33.07553401439902C77.74830976767052 -48.14187707464624 68.63934685510165 -60.42416787432863 55.95020983894081 -70.49520564533798C43.26107282277997 -80.56624341634732 29.231334138523742 -86.64853780925549 13.206700244922274 -89.0257438533415C-2.817933648679194 -91.4029498974275 -18.00919095415641 -89.65550201285323 -33.075534014403324 -83.70190589026063C-48.14187707465024 -77.74830976766803 -60.424167874332156 -68.63934685509852 -70.49520564534085 -55.95020983893718C-80.56624341634954 -43.26107282277582 -86.64853780925698 -29.23133413851928 -89.02574385334216 -13.206700244917693C-91.40294989742735 2.817933648683896 -89.34652095008909 17.887094407582595 -83.39292482749572 32.953437467829204C-77.43932870490235 48.01978052807581 -71.05498530866666 63.46778343966653 -58.36584829250479 73.53882121067457C-45.67671127634292 83.6098589816826 -28.049554462113733 78.6822167138059 -12.024920568512018 81.05942275789026"></path>
              </svg>
            </div>
            <div className="dotted-circle"></div>
            <div className="ring-bg ring-hover">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="96px"
                height="96px"
                viewBox="0 0 96 96"
                xmlSpace="preserve"
                style={{ overflow: 'visible' }}
              >
                <defs></defs>
                <circle
                  id="Ellipse_65_1_"
                  cx="48"
                  cy="48"
                  r="48"
                  className="ringBg"
                ></circle>
              </svg>
            </div>
            <div className="ring-bg">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="96px"
                height="96px"
                viewBox="0 0 96 96"
                xmlSpace="preserve"
                style={{
                  overflow: 'visible',
                }}
              >
                <defs></defs>
                <circle
                  id="Ellipse_65_1_"
                  cx="48"
                  cy="48"
                  r="48"
                  className="ringBg"
                ></circle>
              </svg>
            </div>
          </div>
          <div className="content">
            <div className="icon-holder">
              <div className="mask">
                <div className="off">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    width="29.5px"
                    height="56.3px"
                    viewBox="0 0 29.5 56.3"
                    xmlSpace="preserve"
                    style={{
                      overflow: 'visible',
                    }}
                  >
                    <g id="Group_89_1_">
                      <path
                        id="Path_316_1_"
                        d="M26.4,27.9c0-0.9,0.7-1.5,1.6-1.5c0.8,0,1.5,0.7,1.5,1.5c0.1,7.5-5.6,13.9-13.1,14.7v10.6
        h6.2c0.9,0,1.5,0.8,1.5,1.6c0,0.8-0.7,1.5-1.5,1.5H6.9c-0.9,0-1.5-0.8-1.5-1.6c0-0.8,0.7-1.5,1.5-1.5h6.4V42.6
        C5.7,41.8,0,35.5,0,27.9c0-0.9,0.8-1.5,1.6-1.5c0.8,0,1.5,0.7,1.5,1.5c0,6.4,5.3,11.7,11.7,11.7C21.2,39.6,26.4,34.3,26.4,27.9z"
                        className="svgfill"
                      ></path>{' '}
                      <path
                        id="Path_317_1_"
                        d="M14.8,0c4.4,0.1,8,3.7,8.1,8.1v19.8c0,4.5-3.7,8.2-8.2,8.2s-8.2-3.7-8.2-8.2V8.1
        C6.7,3.6,10.3,0,14.8,0z M14.8,3.1c-2.8,0-5.1,2.2-5.1,5v19.8c0,2.8,2.3,5.1,5.1,5.1c2.8,0,5-2.3,5-5.1c0,0,0,0,0,0V8.1
        C19.8,5.4,17.6,3.1,14.8,3.1z"
                        className="svgfill"
                      ></path>
                    </g>
                  </svg>
                </div>
                <div className="on">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    width="29.5px"
                    height="56.3px"
                    viewBox="0 0 29.5 56.3"
                    xmlSpace="preserve"
                    style={{
                      overflow: 'visible',
                    }}
                  >
                    <g id="Group_89_1_">
                      <path
                        id="Path_316_1_"
                        d="M26.4,27.9c0-0.9,0.7-1.5,1.6-1.5c0.8,0,1.5,0.7,1.5,1.5c0.1,7.5-5.6,13.9-13.1,14.7v10.6
        h6.2c0.9,0,1.5,0.8,1.5,1.6c0,0.8-0.7,1.5-1.5,1.5H6.9c-0.9,0-1.5-0.8-1.5-1.6c0-0.8,0.7-1.5,1.5-1.5h6.4V42.6
        C5.7,41.8,0,35.5,0,27.9c0-0.9,0.8-1.5,1.6-1.5c0.8,0,1.5,0.7,1.5,1.5c0,6.4,5.3,11.7,11.7,11.7C21.2,39.6,26.4,34.3,26.4,27.9z"
                        className="svgfill"
                      ></path>{' '}
                      <path
                        id="Path_317_1_"
                        d="M14.8,0c4.4,0.1,8,3.7,8.1,8.1v19.8c0,4.5-3.7,8.2-8.2,8.2s-8.2-3.7-8.2-8.2V8.1
        C6.7,3.6,10.3,0,14.8,0z M14.8,3.1c-2.8,0-5.1,2.2-5.1,5v19.8c0,2.8,2.3,5.1,5.1,5.1c2.8,0,5-2.3,5-5.1c0,0,0,0,0,0V8.1
        C19.8,5.4,17.6,3.1,14.8,3.1z"
                        className="svgfill"
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </button>
        <div className="trigger-copy">
          <div className="pre-journey copy active">Add your voice</div>
          <div className="in-journey copy">Click and hold to test mic</div>
          <div className="in-journey copy">Keep holding to test</div>
          <div className="in-journey copy">Click and hold to record</div>
          <div className="in-journey copy">Click and hold to record</div>
          <div className="in-journey copy">
            Keep mic button pressed to record
          </div>
        </div>
      </div>
      <style jsx>{`
        audio,
        canvas,
        embed,
        iframe,
        img,
        object,
        svg,
        video {
          display: block;
          vertical-align: middle;
        }
        .ui-record {
          transform: translateY(200px);
          opacity: 0;
        }
        .ui-record.active {
          transition: all 0.8s cubic-bezier(0.6, 0.4, 0.05, 0.95);
          transform: translateY(0);
          opacity: 1;
        }
        .ui-record .recordFlowTrigger {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-conten: center;
          text-align: center;
          z-index: 61;
        }
        .ui-record {
          position: fixed;
          bottom: 1rem;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          transition: all 0.8s cubic-bezier(0.6, 0.4, 0.05, 0.95);
          z-index: 60;
          width: 100%;
          pointer-events: none;
        }
        .ui-record .recordFlowTrigger .reactiveCta.active {
          opacity: 1;
        }
        .ui-record .recordFlowTrigger .reactiveCta {
          pointer-events: all;
          opacity: 0;
          transition: all 0.3s ease-out;
        }
        .reactive-cta {
          width: 140px;
          height: 140px;
          position: relative;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        .reactive-cta .background,
        .reactive-cta .ring-bg {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 70%;
          height: 70%;
          transform: translate(-50%, -50%);
          z-index: 1;
        }
        .reactive-cta .wiggle-lines,
        .reactive-cta:active .cta-label,
        .reactive-cta:hover .cta-label {
          color: #2b9dd8;
        }

        .reactive-cta .dotted-circle {
          position: absolute;
          width: 80%;
          height: 80%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 2px dotted #2b9dd8;
          border-radius: 50%;
        }

        .reactive-cta.recordJourney .ring-hover {
          transition: all 0.25s cubic-bezier(0.6, 0.4, 0.05, 0.95);
          transform: scale(0) translate(-50%, -50%);
          opacity: 0.4;
          transform-origin: top left;
        }

        .reactive-cta .background svg,
        .reactive-cta .ring-bg svg {
          width: 100%;
          height: auto;
        }

        .reactive-cta .ring-bg {
          width: 80%;
          height: 80%;
          opacity: 0.16;
        }
        .reactive-cta .content {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          transform: translate(-50%, -50%);
          z-index: 2;
        }
        @media (min-width: 768px) {
          .ui-record {
            bottom: 1.25rem;
          }
          .reactive-cta {
            width: 175px;
            height: 175px;
          }
          .ui-record .recordFlowTrigger .trigger-copy {
            font-size: 0.7rem;
          }
          .ui-record .recordFlowTrigger .trigger-copy .copy {
            padding: 0 1.5rem;
          }
          .reactive-cta.recordJourney .icon-holder svg {
            max-width: 20px;
          }
        }

        .reactive-cta.recordJourney .icon-holder .mask {
          overflow: hidden;
          position: relative;
        }

        .reactive-cta.recordJourney .icon-holder .mask .on {
          position: absolute;
          top: 0;
          transform: translateY(100%);
          opacity: 0;
          transition: all 0.5s cubic-bezier(0.6, 0.4, 0.05, 0.95);
        }

        .reactive-cta.recordJourney .icon-holder .mask .off {
          position: relative;
          transition: all 0.5s cubic-bezier(0.6, 0.4, 0.05, 0.95);
        }

        .reactive-cta.recordJourney:active .on,
        .reactive-cta.recordJourney:hover .on {
          transform: translateY(0) !important;
          opacity: 1 !important;
        }

        .reactive-cta.recordJourney:active .off,
        .reactive-cta.recordJourney:hover .off {
          transform: translateY(-100%);
          opacity: 0;
        }

        .reactive-cta.recordJourney .icon-holder svg {
          max-width: 18px;
          height: auto;
        }

        .ui-record .recordFlowTrigger .trigger-copy .copy.active {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        .ui-record .recordFlowTrigger .trigger-copy .copy {
          width: 100%;
          position: absolute;
          top: -0.5rem;
          left: 50%;
          padding: 0 0.5rem;
          transition: all 0.6s cubic-bezier(0.6, 0.4, 0.05, 0.95);
          opacity: 0;
          transform: translateX(-50%) translateY(60px);
        }

        .svgfill {
          fill: #ffffff;
        }

        .ringBg {
          fill: #2b9dd8;
        }
      `}</style>
    </Tag>
  )
}

VoiceRecordButton.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
}

VoiceRecordButton.defaultProps = {
  tagName: 'div',
  className: '',
  variant: 'default',
  children: '',
}

export default VoiceRecordButton
