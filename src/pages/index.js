import React from 'react'
import PropTypes from 'prop-types'

import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

import style from './index.module.css'

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={['gatsby', 'application', 'react', 'blog', 'mdx']} />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>
      Total posts: <b>{data.allMdx.totalCount}</b>{' '}
    </p>
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
