const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require(`path`);

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const {createNodeField} = boundActionCreators;

  // console.log(node.internal.type);
  if (node.internal.type === 'MarkdownRemark'
      || node.internal.type === 'PortfolioJson') {
    // const fileNode = getNode(node.parent)
    // console.log(`\n`, fileNode.relativePath)
    // console.log(node);
    let slug = createFilePath({ node, getNode, basePath: 'pages' });
    let prefix = node.internal.type === 'MarkdownRemark' ? "/blog" : "/portfolio";
    createNodeField({
      node,
      name: 'slug',
      value: prefix + slug,
    });
  }
};

exports.createPages = ({graphql, boundActionCreators}) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
        allPortfolioJson{
          edges{
            node{
              fields{
                slug
              },
              title,
              tags

            }
          }
        }
      }
    `).then(res => {
      // console.log(JSON.stringify(res, null, 4))
      res.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/blog-post.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        });
      });
      let portfolios = res.data.allPortfolioJson.edges;

      portfolios.forEach(({ node }, index) => {
        console.log(node);
        const prev = index === 0 ? portfolios[index + 1].node : portfolios[index - 1].node
        const next = index === portfolios.length - 1 ? portfolios[0].node : portfolios[index + 1].node
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/portfolio-post.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
            prev,
            next,
          },
        });
      });
      resolve();
    });
  });
};
