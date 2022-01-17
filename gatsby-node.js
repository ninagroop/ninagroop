const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

// Create dynamic routing for products
// This is handled by `gatsby-source-stripe`
exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path === `/product/`) {
    page.matchPath = `/product/*`;
    createPage(page);
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Define a template for page
  const pageTemplate = path.resolve(`./src/templates/page.js`);

  // Get all markdown page sorted by date
  // note that we filter by `templatekey` here, other collections
  // will need their own query if added
  const pagesResult = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { frontmatter: { templatekey: { eq: "page" } } }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  );

  if (pagesResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your pages`,
      pagesResult.errors
    );
    return;
  }

  const pages = pagesResult.data.allMarkdownRemark.nodes;

  // Create blog pages pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (pages.length > 0) {
    pages.forEach((page, index) => {
      createPage({
        path: page.fields.slug.replace('/pages', ''),
        component: pageTemplate,
        context: {
          id: page.id,
        },
      });
    });
  }

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.js`);

  // Get all markdown blog posts sorted by date
  // note that we filter by `templatekey` here, other collections
  // will need their own query if added
  const blogPostsResult = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { frontmatter: { templatekey: { eq: "blog-post" } } }
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  );

  if (blogPostsResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      blogPostsResult.errors
    );
    return;
  }

  const posts = blogPostsResult.data.allMarkdownRemark.nodes;

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id;
      const nextPostId =
        index === posts.length - 1 ? null : posts[index + 1].id;

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      });
    });
  }
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;

  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }
    type Author {
      name: String
      summary: String
    }
    type Social {
      twitter: String
    }
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }
    type Frontmatter @infer {
      title: String
      description: String
      date: Date @dateformat
      featuredimage: File @fileByRelativePath
      footerbioimage: File @fileByRelativePath
      featuredpost: Boolean
    }
    type Fields {
      slug: String
    }
  `);
};
