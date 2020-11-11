/**
 * @file CircleWaveButton.js
 *
 * @see http://thenewcode.com/1124/Rotating-Elements-To-Mouse-and-Touch-Locations-Using-JavaScript
 */
import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

import styles from './CircleWaveButton.module.css'

/**
 * Math.degrees
 * @param {*} radians
 */
Math.degrees = (radians) => {
  return radians * (180 / Math.PI) * -1 + 180
}

const CircleWaveButton = (props) => {
  const { tagName: Tag, className, variant, children } = props

  const svgRef = useRef()
  const [angles, setAngles] = useState()

  useEffect(() => {
    let svg = d3.select(svgRef.current)

    let angles = d3.range(0, 2 * Math.PI, Math.PI / 100)

    // svg.on('mouseover', (event) => {
    //   var coordinates = d3.pointer(event)
    //   const x = coordinates[0]
    //   const y = coordinates[1]
    //   console.log('2 * Math.PI', 2 * Math.PI)
    //   console.log('x', x)
    //   console.log('Math.PI / 100', Math.PI / 100)
    //   console.log('y', y)
    //   angles = d3.range(0, 2 * Math.PI, Math.PI / 100)
    //   setAngles(angles)
    //   console.log('coordinates', coordinates)
    // })

    var width = +svg.attr('width')
    var height = +svg.attr('height')

    var path = svg
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
      .attr('fill', 'none')
      .attr('stroke-width', 2)
      .attr('stroke-linejoin', 'round')
      .selectAll('path')
      .data(['cyan', 'magenta', 'yellow'])
      .enter()
      .append('path')
      .attr('stroke', function (d) {
        return d
      })
      .style('mix-blend-mode', 'darken')
      .datum((d, i) => {
        return d3
          .lineRadial()
          .curve(d3.curveLinearClosed)
          .angle((a) => {
            return a
          })
          .radius((a) => {
            var t = d3.now() / 2000
            return (
              200 +
              Math.cos(a * 10 - (i * 2 * Math.PI) / 3 + t) *
                Math.pow((1 + Math.cos(a - t)) / 2, 7) *
                16
            )
          })
      })

    svg.on('mousemove', (event) => {
      var coordinates = d3.pointer(event)
      // console.log('coordinates', coordinates)
      const x = coordinates[0]
      const y = coordinates[1]
      const centerPoint = window.getComputedStyle(svgRef.current)
        .transformOrigin
      const centers = centerPoint.split(' ')
      console.log('centers', centers)

      const centerX =
        svgRef.current.clientLeft + parseInt(centers[0]) - window.pageXOffset
      const centerY =
        svgRef.current.clientTop + parseInt(centers[1]) - window.pageYOffset

      const radians = Math.atan2(x - centerX, y - centerY)
      const degrees = Math.degrees(radians)
      path
        .transition()
        .duration(500)
        .attr('transform', `rotate(${Math.round(degrees)})`)
    })

    d3.timer(() => {
      path.attr('d', (d) => {
        return d(angles)
      })
    })
  }, [svgRef])

  return (
    <Tag
      className={`${styles.circle_wave_button} ${
        styles[`circle_wave_button__${variant}`]
      } ${className}`}
      style={{
        zIndex: 9999,
      }}
    >
      <svg ref={svgRef} width="900" height="500"></svg>
    </Tag>
  )
}

CircleWaveButton.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
}

CircleWaveButton.defaultProps = {
  tagName: 'div',
  className: 'flex w-screen h-screen absolute justify-center items-center',
  variant: 'default',
  children: '',
}

export default CircleWaveButton
