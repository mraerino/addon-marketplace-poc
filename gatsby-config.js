module.exports = {
  siteMetadata: {
    title: `Netlify Addon Marketplace`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `addons`,
        path: `${__dirname}/content/addons`,
      },
    },
    `gatsby-transformer-remark`,
  ],
}
