const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require(`path`);

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const {createNodeField} = boundActionCreators;

  if (node.internal.type === 'MarkdownRemark') {

    let slug = createFilePath({ node, getNode, basePath: 'src/content' });
    let prefix = '', type = '';

    if(node.id.match(/\/works\//)){
      prefix = '/works';
      type = 'work';
    }
    if(node.id.match(/\/notes\//)){
      prefix = '/logs-notes';
      type = 'note';
    }
    if(node.id.match(/\/logs\//)){
      prefix = '/logs-notes';
      type = 'log';
    }

    createNodeField({
      node,
      name: 'slug',
      value: prefix + slug,
    });

    createNodeField({
      node,
      name: 'type',
      value: type,
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
                type
              }
            }
          }
        }
      }
    `).then(res => {
      let componentName = '';
      // console.log(JSON.stringify(res, null, 4))
      res.data.allMarkdownRemark.edges.forEach(({ node }) => {

        if(node.fields.type === 'log' || node.fields.type === 'note'){
          componentName = 'LogNotesPageSingle.js';
        }
        if(node.fields.type === 'work'){
          componentName = 'WorkPageSingle.js';
        }

        componentName = 'JustATest.js';

        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/${componentName}`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        });
      });

      resolve();
    });
  });
};
