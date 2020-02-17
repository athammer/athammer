import React from "react"
import { Link } from "gatsby"

import Home from "../components/containers/Home"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Home/>
  </Layout>
)

export default IndexPage
