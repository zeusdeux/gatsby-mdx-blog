const path = require('path')

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
                  frontmatter {
                    slug
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

        // eslint-disable-next-line
        console.log(result)
        const posts = result.data.allMdx.edges

        // Create blog posts pages.
        posts.forEach(({ node }) => {
          const {
            frontmatter: { slug }
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
