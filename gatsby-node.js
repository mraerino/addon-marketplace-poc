const path = require('path');

const processAddonNode = (node, { createNodeField }) => {
  const slug = `/addons/${node.frontmatter.name}`;
  createNodeField({
    node,
    name: `slug`,
    value: slug,
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type !== `MarkdownRemark`) {
    return
  }

  const fileNode = getNode(node.parent);
  switch (fileNode.sourceInstanceName) {
    case "addons":
      return processAddonNode(node, actions)
  }
}

const addonComponent = path.resolve(`./src/templates/addon.tsx`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const addons = await graphql(`
    query AddonsQuery {
      allFile(filter: {sourceInstanceName: {eq: "addons"}, internal: {mediaType: {eq: "text/markdown"}}}) {
        edges {
          node {
            childMarkdownRemark {
              id
              fields {
                slug
              }
            }
          }
        }
      }
    }
  `);

  addons.data.allFile.edges.forEach(({ node }) => {
    const addon = node.childMarkdownRemark;
    createPage({
      path: addon.fields.slug,
      component: addonComponent,
      context: {
        id: addon.id,
      },
    })
  })
}
