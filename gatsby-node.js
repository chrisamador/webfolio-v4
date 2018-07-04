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
        works: allMarkdownRemark(
          filter: {fields: {type: {eq: "work"}}}
        ){
          edges {
            node {
              fields {
                slug
                type
              }
              frontmatter {
                title
                image_bg {
                  childImageSharp {
                    sizes {
                      originalImg
                    }
                  }
                }
              }
            }
          }
        }
        logs: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: {fields: {type: {eq: "log"}}}
        ){
          edges {
            node {
              fields {
                slug
                type
              }
              frontmatter{
                title
                tags
                images {
                  main_url
                  main_id
                  type_id
                }
                date
                meta {
                  primary_color
                  type_of
                  min_read
                  exp
                }
              }
            }
          }
        }
        notes: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: {fields: {type: {eq: "note"}}}
        ){
          edges {
            node {
              fields {
                slug
                type
              }
              frontmatter{
                title
                tags
                images {
                  main_url
                  main_id
                  type_id
                }
                date
                meta {
                  primary_color
                  type_of
                  min_read
                  exp
                }
              }
            }
          }
        }
      }
    `).then(res => {
      // console.log(JSON.stringify(res));
      res.data.works.edges.forEach(({ node }, index)=> {

        let next = res.data.works.edges[index + 1]
          ? res.data.works.edges[index + 1].node
          : res.data.works.edges[0].node;

        createPage({
          path: node.fields.slug,
          component: path.resolve('./src/templates/WorkPageSingle.js'),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
            next,
          },
        });
      })

      res.data.logs.edges.forEach(({ node })=> {
        createPage({
          path: node.fields.slug,
          component: path.resolve('./src/templates/LogNotesPageSingle.js'),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
            related: res.data.logs.edges,
          },
        });
      })

      res.data.notes.edges.forEach(({ node })=> {
        createPage({
          path: node.fields.slug,
          component: path.resolve('./src/templates/LogNotesPageSingle.js'),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
            related: res.data.notes.edges,
          },
        });
      })

      resolve();
    });
  });
};
