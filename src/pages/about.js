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
        I am a professional web developer with a talent for clean and simple designs.<br />
        I am a writer of all things including technical write-ups, fiction, and everything in between. <br />
        I am an honest and hard-working person who also has some cool tattoos and a really good Tetris high score. <br />
        If you need any work done and want it swiftly and professionally, you can reach me here: <a href="mailto:me@tannercarri.co">me@tannercarri.co</a>
        </p>
        <Image src={ProfilePic} alt="profile pic" />
    </AboutLayout>
)

export default AboutPage