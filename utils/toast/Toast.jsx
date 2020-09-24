import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const propTypes = {
  type: PropTypes.string,
  duration: PropTypes.number,
  message: PropTypes.string,
  position: PropTypes.string,
}

const defaultProps = {
  type: 'default',
  duration: 3,
  message: '',
  position: 'top-right',
}

const Toast = ({ className, type, position, duration, message, ...props }) => {
  const classes = classNames(
    'toast',
    position,
    type && `toast-${type}`,
    className
  )
  const iconClasses = classNames('toast-icon', type && `toast-${type}`)

  return (
    <div {...props} className={classes}>
      <div className={iconClasses}></div>
      <div className="toast-message">{message}</div>
    </div>
  )
}

Toast.propTypes = propTypes
Toast.defaultProps = defaultProps

export default Toast
