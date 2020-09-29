import React from 'react'
import { render, unmountComponentAtNode, createPortal } from 'react-dom'
import Toast from '../utils/toast/Toast'

export default function test() {
  const close = () => {
    console.log('close')
    const toast = document.querySelector('.toast')
    toast.classList.add('toast-close')
    setTimeout(() => toast.remove(), 500)
  }

  const add = () => {
    console.log('add')
    const toastContainer = document.getElementById('toast-container')
    console.log(toastContainer)
    return createPortal(<Toast />, toastContainer)
  }

  return (
    <>
      <button onClick={close}>click</button>
      <button onClick={add}>add</button>
    </>
  )
}
