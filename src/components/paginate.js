import React from 'react'
// import PropTypes from 'prop-types'
import { StaticQuery, graphql, Link } from 'gatsby'
import style from './paginate.module.css'

export default function Paginate() {
  return (
    <StaticQuery
      query={paginateQuery}
      render={data => {
        const postsPerPage = data.site.siteMetadata.postsPerPage

        return (
          <div>
            <p>Pages:</p>
            <nav>
              {Array.from({ length: Math.ceil(data.allMdx.totalCount / postsPerPage) }).map(
                (_, i) => {
                  return (
                    <Link
                      className={style.pageNumber}
                      key={i}
                      to={i === 0 ? '/' : `/blog/${i + 1}`}
                    >
                      {i + 1}
                    </Link>
                  )
                }
              )}
            </nav>
          </div>
        )
      }}
    />
  )
}

const paginateQuery = graphql`
  query {
    site {
      siteMetadata {
        postsPerPage
      }
    }
    allMdx {
      totalCount
    }
  }
`
