import React from "react"
import ProfilePic from "../images/profilepic.jpg"
import AboutLayout from "../components/about-layout"
import SEO from "../components/seo"
import styled from "@emotion/styled"


const Image = styled.img`
    max-width: 100%;
    height: auto;
  `

const AboutPage = () => (
    <AboutLayout>
      <SEO title="About" />
      
        <h1>About Me</h1>
        <p>
            I am a professional web developer with a knack for clean and simple designs. I also have a passion for all things writing including technical, fiction, and everything in between. If you need work done in any of those areas and want it swiftly and professionally, you can reach me here: me@tannercarri.co
        </p>
        <Image src={ProfilePic} alt="profile pic" />
    </AboutLayout>
)

export default AboutPage