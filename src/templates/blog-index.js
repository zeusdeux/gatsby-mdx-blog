import React from 'react'
import PropTypes from 'prop-types'

import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Tags from '../components/tags'
import Paginate from '../components/paginate'
// import style from './index.module.css'

const IndexPage = props => {
  const { data } = props

  return (
    <Layout>
      <SEO title="Home" keywords={['gatsby', 'application', 'react', 'blog', 'mdx']} />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>
        Total posts: <b>{data.allMdx.totalCount}</b>{' '}
      </p>
      <Tags />
      <div>
        <p>Posts:</p>
        <ul>
          {data.allMdx.edges.map(({ node }, i) => {
            const {
              frontmatter: { title, image, slug }
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
      </div>
      <Paginate />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.object
}

export default IndexPage

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }, skip: $skip, limit: $limit) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            tags
            slug
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
