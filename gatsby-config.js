module.exports = {
  siteMetadata: {
    title: 'Title of the site dude',
  },
  plugins: [
    'gatsby-plugin-less',
    'gatsby-transformer-remark',
    'gatsby-transformer-json',
    'gatsby-plugin-react-svg',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'works',
        path: `${__dirname}/src/content/works`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'notes',
        path: `${__dirname}/src/content/notes`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'logs',
        path: `${__dirname}/src/content/logs`,
      },
    }],
};
