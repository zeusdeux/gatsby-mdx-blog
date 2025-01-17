module.exports = {
  siteMetadata: {
    title: 'My blog',
    author: 'Mudit Ameta',
    description: 'My blog that uses MDX with Gatsby',
    siteUrl: 'https://blog.mudit.xyz',
    social: {
      twitter: 'muditameta'
    },
    postsPerPage: 2
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/blog/`
      }
    },
    {
      // setup this plugin to read and work with images
      resolve: 'gatsby-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
              sizeByPixelDensity: true
            }
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem'
            }
          },
          { resolve: 'gatsby-remark-copy-linked-files' },
          { resolve: 'gatsby-remark-smartypants' }
        ]
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-blog-mdx',
        short_name: 'mdx-blog',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'content/assets/notbad.jpg' // This path is relative to the root of the site.
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: '',
        head: false,
        anonymize: true,
        respectDNT: true
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ]
}
