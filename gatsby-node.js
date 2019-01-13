const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const postsPromise = new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            site {
              siteMetadata {
                postsPerPage
              }
            }
            allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
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

        const posts = result.data.allMdx.edges
        // eslint-disable-next-line
        console.log(posts)

        // Create paginated blog index page
        const postsPerPage = result.data.site.siteMetadata.postsPerPage
        const numPages = Math.ceil(posts.length / postsPerPage)

        Array.from({ length: numPages }).forEach((_, i) => {
          createPage({
            path: i === 0 ? `/` : `/blog/${i + 1}`,
            component: path.resolve('./src/templates/blog-index.js'),
            context: {
              limit: postsPerPage,
              skip: i * postsPerPage
            }
          })
        })

        // Create blog posts pages.
        posts.forEach(({ node }, index) => {
          const previous = index === posts.length - 1 ? null : posts[index + 1].node
          const next = index === 0 ? null : posts[index - 1].node

          const {
            frontmatter: { slug }
          } = node
          createPage({
            path: slug,
            component: path.resolve('./src/templates/blog-post.js'),
            context: { id: node.id, next, previous }
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
