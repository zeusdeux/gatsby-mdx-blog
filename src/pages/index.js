import React from 'react'
import PropTypes from 'prop-types'

import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={['gatsby', 'application', 'react', 'blog', 'mdx']} />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>
      Total posts: <b>{data.allMdx.totalCount}</b>{' '}
    </p>
    <ul>
      {data.allMdx.edges.map(({ node }, i) => {
        const {
          fields: { slug },
          frontmatter: { title, image }
        } = node
        const {
          childImageSharp: {
            resize: { src: publicURL }
          }
        } = image
        return (
          <li key={i}>
            <img src={publicURL} alt="image" />
            <Link to={slug}>{title}</Link>
          </li>
        )
      })}
    </ul>
    <div>
      <p>Tags:</p>
      <ul>
        {data.allMdx.group.reduce(
          ({ fieldValue: acc }, { fieldValue: tagName }) => `${acc}, ${tagName}`
        )}
      </ul>
    </div>
  </Layout>
)

IndexPage.propTypes = {
  data: PropTypes.object
}

export default IndexPage

export const query = graphql`
  query {
    allMdx {
      totalCount
      group(field: frontmatter___tags) {
        fieldValue
      }
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
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
