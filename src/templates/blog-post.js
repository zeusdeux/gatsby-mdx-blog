import React from 'react'
import PropTypes from 'prop-types'

import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { withMDXScope } from 'gatsby-mdx/context'

import Layout from '../components/layout'
import Video from '../components/video'

function PostPageTemplate({ data: { mdx } }) {
  return <MDXRenderer scope={{ Layout, Video }}>{mdx.code.body}</MDXRenderer>
}

PostPageTemplate.propTypes = {
  data: PropTypes.object
}
export default withMDXScope(PostPageTemplate)

export const pageQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      id
      code {
        body
      }
    }
  }
`
