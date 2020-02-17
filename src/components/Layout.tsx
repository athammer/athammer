/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Helmet from "react-helmet"
import PropTypes from "prop-types"

import "../styles/layout.scss"

const Layout = ({ children }) => {


  return (
    <>
      <Helmet>
        <link href="https://fonts.googleapis.com/css?family=Lora&display=swap" rel="stylesheet"></link>
      </Helmet>
      <main>{children}</main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
