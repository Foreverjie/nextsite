import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import Image from '../../elements/Image'

const Logo = ({ className, ...props }) => {
  const classes = classNames('brand', className)

  return (
    <div {...props} className={classes}>
      <h1 className="m-0">
        <Link href="/test_nav">
          <a>
            <Image
              src={require('./../../../assets/images/logo.svg')}
              alt="Open"
              width={32}
              height={32}
            />
          </a>
        </Link>
      </h1>
    </div>
  )
}

export default Logo
