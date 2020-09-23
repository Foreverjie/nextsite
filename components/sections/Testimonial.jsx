import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { SectionTilesProps } from '../../utils/SectionProps'
import SectionHeader from './partials/SectionHeader'
import axios from 'axios'
import { urlPrefix } from '../../config'
import Link from 'next/link'

const propTypes = {
  ...SectionTilesProps.types,
}

const defaultProps = {
  ...SectionTilesProps.defaults,
}

const Testimonial = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  ...props
}) => {
  const outerClasses = classNames(
    'testimonial section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  )

  const [articles, setArticles] = useState([])

  useEffect(() => {
    async function fetchArticles() {
      // const articles = await axios.get("https://www.jie1203.com/api/articles")
      try {
        const articles = await axios.get(`${urlPrefix}/articles`)
        setArticles(articles.data)
      } catch (error) {
        // console.log(error)
      }
    }
    fetchArticles()
  }, [])

  const innerClasses = classNames(
    'testimonial-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  )

  const tilesClasses = classNames('tiles-wrap', pushLeft && 'push-left')

  const sectionHeader = {
    title: 'Article By JIE',
    paragraph: '随笔',
  }

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={tilesClasses}>
            <Article articles={articles} />
          </div>
        </div>
      </div>
    </section>
  )
}

const Article = (articles) => {
  if (articles.articles !== []) {
    return articles.articles.map((article) => {
      return (
        <div
          className="tiles-item reveal-from-right"
          data-reveal-delay="200"
          key={article._id}
        >
          <div className="tiles-item-inner">
            <div className="testimonial-item-content">
              <p className="text-sm mb-0">— {article.desc}</p>
            </div>
            <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">
              <span className="testimonial-item-name text-color-high">JIE</span>
              <span className="text-color-low"> / </span>
              <span className="testimonial-item-link">
                <Link href="/article/[id]" as={`article/${article._id}`}>
                  <a>{article.title}</a>
                </Link>
              </span>
            </div>
          </div>
        </div>
      )
    })
  } else {
    return null
  }
}

Testimonial.propTypes = propTypes
Testimonial.defaultProps = defaultProps

export default Testimonial
