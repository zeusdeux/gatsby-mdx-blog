import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMdx
  const tagHeader = `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with "${tag}"`

  return (
    <div>
      <h1>{tagHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const { slug, title, image } = node.frontmatter
          const {
            childImageSharp: {
              resize: { src: publicURL }
            }
          } = image
          return (
            <li key={slug}>
              <img src={publicURL} alt="image" />
              <Link to={slug}>{title}</Link>
            </li>
          )
        })}
      </ul>
      {/*
              This links to a page that does not yet exist.
              We'll come back to it!
            */}
      <Link to="/">Home</Link>
    </div>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired
  }),
  data: PropTypes.object
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            slug
            image {
              childImageSharp {
                resize(width: 200) {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`
