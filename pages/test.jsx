import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import Toast from '../utils/toast/Toast'

export default function test() {
  const close = () => {
    console.log('close')
    const toast = document.querySelector('.toast')
    toast.classList.add('toast-close')
    setTimeout(() => toast.remove(), 500)
  }

  const remove = () => {
    const toast = document.querySelector('.toast')
    toast.classList.remove('toast-close')
  }

  return (
    <>
      <button onClick={close}>click</button>
      <button onClick={remove}>remove</button>
    </>
  )
}
