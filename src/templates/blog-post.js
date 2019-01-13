import React from 'react'
import PropTypes from 'prop-types'

import { graphql, Link } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { withMDXScope } from 'gatsby-mdx/context'

import Layout from '../components/layout'
import Video from '../components/video'

function PostPageTemplate(props) {
  const {
    data: { mdx }
  } = props
  const { previous, next } = props.pageContext

  return (
    <article>
      <p>{mdx.frontmatter.tags.join(', ')}</p>
      <Link to="/">Home</Link>
      <MDXRenderer scope={{ Layout, Video, OutboundLink }}>{mdx.code.body}</MDXRenderer>
      <div>
        {previous ? <Link to={previous.frontmatter.slug}>{previous.frontmatter.title}</Link> : null}
        {next ? <Link to={next.frontmatter.slug}>{next.frontmatter.title}</Link> : null}
      </div>
    </article>
  )
}

PostPageTemplate.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.object
}
export default withMDXScope(PostPageTemplate)

export const pageQuery = graphql`
  query($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        tags
      }
      code {
        body
      }
    }
  }
`
