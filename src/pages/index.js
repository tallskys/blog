import React from "react"
import Logo from "../images/tc.png"
import LandingBio from "../components/landing-bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "@emotion/styled"

const Image = styled.img`
    max-width: 100%;
    height: auto;
  `

const IndexPage = () => (
  <Layout>
    <SEO title="Tanner Carrico" keywords={[`tanner carrico`, `application`, `react`]} />
    <LandingBio />
  </Layout>
)

export default IndexPage
