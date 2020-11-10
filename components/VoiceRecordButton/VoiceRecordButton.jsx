/**
 * @file VoiceRecordButton.js
 */
import * as React from 'react'
import PropTypes from 'prop-types'

import styles from './VoiceRecordButton.module.css'

const VoiceRecordButton = (props) => {
  const {
    tagName: Tag,
    className,
    variant,
    children,
  } = props

  return (
    <Tag className={`${styles.voice_record_button} ${styles[`voice_record_button__${variant}`]} ${className}`}>
      {children}
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
