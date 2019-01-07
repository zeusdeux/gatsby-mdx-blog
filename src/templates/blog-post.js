import React from 'react'
import PropTypes from 'prop-types'

import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'

// import { withMDXScope } from 'gatsby-mdx/context'

function PostPageTemplate({ data: { mdx } }) {
  return (
    <article>
      <MDXRenderer>{mdx.code.body}</MDXRenderer>
    </article>
  )
}

PostPageTemplate.propTypes = {
  data: PropTypes.object
}
export default PostPageTemplate

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
