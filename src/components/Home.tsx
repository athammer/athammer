import React from "react"

import Github from "../images/github.svg";
import Twitter from "../images/twitter.svg";
import Linkedin from "../images/linkedin.svg";
import Medium from "../images/medium1.svg";
import Resume from "../images/file.svg";
import resumeFile from "../pdf/resume.pdf";


import "../styles/components/home.scss"

const Home = () => {

  return (
    <div className="home-content">
      <h1 className="title">Aaron Hammer's Website</h1>
      <div className="links">
        <a href={resumeFile} target="_blank"><Resume/></a>
        <a href="https://www.linkedin.com/in/athammer/" target="_blank"><Linkedin title="Resume" alt="Resume"/></a>
        <a href="https://twitter.com/athammer_" target="_blank"><Twitter title="Twitter" alt="Twitter"/></a>
        <a href="https://github.com/athammer" target="_blank"><Github title="Github" alt="Github"/></a>
        <a href="https://medium.com/@athammer_" target="_blank"><Medium title="Medium" alt="Medium"/></a>
      </div>
      <h3 className="contact-me"><a href="mailto:athammer@buffalo.edu">Contact me by Email</a></h3>

    </div>
  )
}

export default Home
