import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Toast from './Toast'

const propTypes = {
  position: PropTypes.string,
}

const defaultProps = {
  position: 'top-right',
}

const ToastContainer = ({ position, ...props }) => {
  const classes = classNames('toast-container', position)
  return (
    <div className={classes}>
      <Toast message="test toast11" />
      <Toast message="test toast11" />
    </div>
  )
}

ToastContainer.propTypes = propTypes
ToastContainer.defaultProps = defaultProps

export default ToastContainer
