// Imports
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }


    render() {
        return (<div className="home-render">
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

          <h1 className="home-animation">
              <span className="text-wrapper">
                  <span className="letters">Aaron Taylor Hammer</span>
                  <br/>
                  <span className="sub-letters">Check Me Out!</span>
              </span>
          </h1>
          <div className="icons">

              <h1 className="icon-animation">
                <a href="https://github.com/athammer" target="_blank" rel="noopener noreferrer" data-tippy-content="Github" id="tip-git" className="icon">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                <a href="https://www.linkedin.com/in/athammer/" target="_blank" rel="noopener noreferrer" data-tippy-content="Linkedin" id="tip-link" className="icon">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href="/resume" data-tippy-content="Resume" id="tip-res" className="icon">
                  <FontAwesomeIcon icon={faFile} />
                </a>
              </h1>
          </div>
          <h5 className="text-muted">Made using Node, React, Sass, and with mobile in mind</h5>

          <h5 className="text-muted">Hosted on AWS's ec2, find the repository <span className="divRepo"><a className="repo" href="https://github.com/athammer/AaronTHammer.me" target="_blank" rel="noopener noreferrer">here</a></span></h5>

        </div>)
    }

}
Home.defaultProps = {
    name: 'riperoni pep boy'
};
export default Home;
