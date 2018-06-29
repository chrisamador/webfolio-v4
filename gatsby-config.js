module.exports = {
  siteMetadata: {
    title: 'Title of the site dude',
  },
  plugins: [
    'gatsby-plugin-less',
    'gatsby-transformer-remark',
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        include: /svg-icons/,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/content/blog/`,
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/content/portfolio/`,
        name: 'portfolio',
      },
    }],
};
