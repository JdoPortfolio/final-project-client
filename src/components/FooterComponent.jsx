import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const FooterComponent = () => {
  return (
    <footer className="bg-black text-center text-white py-3">
      <Container>
        <Row>
          <Col>
            {/* LinkedIn Icon */}
            <a href="https://www.linkedin.com/in/jonathan-diaz-ortiz-b54a21254/" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>

            {/* GitHub Icon */}
            <a href="https://github.com/JdoPortfolio?tab=repositories" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>

            {/* Gmail Icon (using envelope icon) */}
            <a href="mailto:nathan.diaz062@gmail.com" className="text-white mx-2">
              <FontAwesomeIcon icon={faEnvelope} size="2x" />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterComponent;
