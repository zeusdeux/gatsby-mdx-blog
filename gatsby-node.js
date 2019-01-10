const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const postsPromise = new Promise((resolve, reject) => {
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
  const byTagsPromise = graphql(`
    {
      allMdx {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      // eslint-disable-next-line
      console.log(result.errors)
      throw result.errors
    }

    const tags = result.data.allMdx.group
    tags.forEach(({ fieldValue: tag }) => {
      createPage({
        path: `/tags/${tag.trim().replace(/\s+/g, '-')}`,
        component: path.resolve('./src/templates/by-tag.js'),
        context: { tag }
      })
    })
  })

  return Promise.all([postsPromise, byTagsPromise])
}
