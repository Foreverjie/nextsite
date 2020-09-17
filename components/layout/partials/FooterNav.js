import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'

const FooterNav = ({ className, ...props }) => {
  const classes = classNames('footer-nav', className)

  return (
    <nav {...props} className={classes}>
      <ul className="list-reset">
        <li>
          <Link href="#">
            <a>Contact</a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>About us</a>
          </Link>
        </li>
        <li>
          <Link href="#0">
            <a>FAQ's</a>
          </Link>
        </li>
        <li>
          <Link href="#0">
            <a>Support</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default FooterNav
