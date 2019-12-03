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
        I'm a former electrician/barista/bathroom renovator/retail worker/line chef, and currently I'm a QA Analyst at a software company and a freelance web developer and writer. I've had a weird life, but I'm pretty happy with the person who is the end result. I make music in my free time as Tall Sky, which is a John Ashbery reference because I'm also a huge poetry dork. I'm trying to be a better person everyday, that's about as deep as my personal philosphy gets. <br />
        If you need any work done and want it swiftly and professionally, you can reach me here: <a href="mailto:me@tannercarri.co">me@tannercarri.co</a>
        </p>
        <Image src={ProfilePic} alt="profile pic" />
    </AboutLayout>
)

export default AboutPage