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
    }],
};
