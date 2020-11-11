/**
 * @file CircleWave.js
 */
import * as React from 'react'
import PropTypes from 'prop-types'
import Sketch from 'react-p5'

import styles from './CircleWave.module.css'

const CircleWave = (props) => {
  const { tagName: Tag, className, variant, children } = props

  /**
   *
   * @param {*} p5
   * @param {*} canvasParentRef
   */
  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(640, 480).parent(canvasParentRef)
    p5.stroke(255)
    p5.strokeWeight(5)
  }

  const draw = (p5) => {
    p5.background(255, 255, 255, 0)
    p5.stroke(150, 0, 0, 30)
    drawCircle(
      p5,
      p5.width / 2,
      p5.height / 2,
      100,
      720,
      p5.radians(p5.frameCount),
      function (i) {
        return i
      }
    )

    p5.stroke(0, 0, 0, 0)
    drawCircle(
      p5,
      p5.width / 2,
      p5.height / 2,
      100,
      720,
      p5.radians(p5.frameCount),
      (i) => {
        return -i
      }
    )
  }

  const sinDeformer = (p5, i) => {
    return p5.sin(15 * i)
  }

  const amplifyDeformer = (val, amplification) => {
    return val * amplification
  }

  const constrainDeformation = (p5, val, i, startI, endI) => {
    if (i % (2 * p5.PI) >= startI && i % (2 * p5.PI) < endI) {
      var segmentLength = endI - startI
      var segmentMultiple = p5.PI / segmentLength
      return val * p5.sin((i - startI) * segmentMultiple)
    }
    return 0
  }

  const drawCircle = (
    p5,
    x,
    y,
    radius,
    segments,
    degreeOffset,
    radiusDeformer
  ) => {
    var circleSegmentLength = (2 * p5.PI) / segments
    var startX = radiusDeformer(0) + radius + x
    var startY = y

    for (var i = 0; i < 2 * p5.PI; i += circleSegmentLength) {
      var offsettedI = i + degreeOffset
      var radiusDeform = constrainDeformation(
        p5,
        amplifyDeformer(sinDeformer(p5, radiusDeformer(i)), 15),
        offsettedI,
        p5.PI,
        2 * p5.PI
      )

      var nextX = (radius + radiusDeform) * p5.cos(i) + x
      var nextY = (radius + radiusDeform) * p5.sin(i) + y

      p5.line(startX, startY, nextX, nextY)
      startX = nextX
      startY = nextY
    }
  }

  return (
    <Tag
      className={`${styles.circle_wave} ${
        styles[`circle_wave__${variant}`]
      } ${className}`}
    >
      <Sketch className="bg-transparent" setup={setup} draw={draw} />
    </Tag>
  )
}

CircleWave.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
}

CircleWave.defaultProps = {
  tagName: 'div',
  className: 'absolute w-screen h-screen flex justify-center items-center',
  variant: 'default',
  children: '',
}

export default CircleWave
