const componentWithMDXScope = require('gatsby-mdx/component-with-mdx-scope')
const path = require('path')

exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
  if (node.internal.type === `Mdx`) {
    const fileNode = getNode(node.parent)
    const slug = path.relative('content/blog', fileNode.dir)
    createNodeField({
      node,
      name: `slug`,
      value: `/${slug}`
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMdx {
              edges {
                node {
                  id
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                    author
                    excerpt
                  }
                  code {
                    scope
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        console.log(result)
        const posts = result.data.allMdx.edges

        // Create blog posts pages.
        posts.forEach(({ node }) => {
          const {
            fields: { slug }
          } = node
          createPage({
            path: slug,
            component: path.resolve('./src/templates/blog-post.js'),
            context: { id: node.id }
          })
        })
      })
    )
  })
}
