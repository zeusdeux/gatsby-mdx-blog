import React from 'react'
// import PropTypes from 'prop-types'
import { StaticQuery, graphql, Link } from 'gatsby'
import style from './tags.module.css'

export default function Tags() {
  return (
    <StaticQuery
      query={tagsQuery}
      render={data => {
        return (
          <div>
            <p>Tags:</p>
            <ul>
              {data.allMdx.group.map(({ fieldValue: tag }, i) => (
                <Link key={i} className={style.tag} to={`/tags/${tag.trim().replace(/\s+/g, '-')}`}>
                  {tag}{' '}
                </Link>
              ))}
            </ul>
          </div>
        )
      }}
    />
  )
}

const tagsQuery = graphql`
  query {
    allMdx {
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
  }
`
