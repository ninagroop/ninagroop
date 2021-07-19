import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

// https://github.com/gatsbyjs/gatsby/issues/5329#issuecomment-484741119
const browser = typeof window !== "undefined" && window

const NotFoundPage = () => {
  return (
    browser && (
      <Layout>
        <SEO title="Blog - Nina Groop" />
        <h1>Blog</h1>
        <p>The blog.</p>
      </Layout>
    )
  )
}

export default NotFoundPage
