import React from 'react'
import PropTypes from 'prop-types'

import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>
      Total posts: <b>{data.allMdx.totalCount}</b>{' '}
    </p>
    <ul>
      {data.allMdx.edges.map(({ node }, i) => {
        const {
          fields: { slug },
          frontmatter: { title }
        } = node
        return (
          <li key={i}>
            <Link to={slug}>{title}</Link>
          </li>
        )
      })}
    </ul>
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
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
