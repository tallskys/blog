/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import styled from "@emotion/styled"
import { StaticQuery, graphql } from "gatsby"
import Header from "./header"
import "./layout.css"

const Content = styled.div`
  margin: 0 auto;
  max-width: 860px;
  padding: 0 1.0875rem 1rem;
  padding-top: 0;
`


const AboutLayout = ({ children }) => (
    <StaticQuery
      query={graphql`
        query SiteAboutTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <>
          <Header siteTitle={data.site.siteMetadata.title} />
          <Content>
            <main>{children}</main>
          </Content>
        </>
      )}
    />
  )

export default AboutLayout
