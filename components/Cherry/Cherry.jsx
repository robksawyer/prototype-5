/**
 * @file Cherry.js
 */
import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { Html } from '@react-three/drei'

import styles from './Cherry.module.css'

import CherryModel from './CherryModel'

const Cherry = (props) => {
  const { tagName: Tag, className, variant, children, forwardRef } = props

  return (
    <Suspense
      fallback={
        <Html>
          <p className="transition duration-500 ease-out opacity-100">
            LOADING...
          </p>
        </Html>
      }
    >
      <CherryModel forwardRef={forwardRef} {...props} />
    </Suspense>
  )
}

Cherry.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
}

Cherry.defaultProps = {
  tagName: 'div',
  className: '',
  variant: 'default',
  children: '',
}

export default Cherry
