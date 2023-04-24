import React from "react";
import "../assets/Footer.css";

function Footer() {
  return ( 
    <footer className="footer text-center" id="contact">
       <span className="icons">&copy; 2023 Copyright:</span><a href="http://www.github.com/jdomindev" target="_blank" rel="noopener noreferrer" className="icon"> José Dominguez</a>
      <br></br>
      <div className="icons">
        <a href="http://www.twitter.com" target="_blank" rel="noopener noreferrer" className="icon"><i className="fa-brands fa-2x fa-twitter"></i></a>
        <a href="http://www.facebook.com" target="_blank" rel="noopener noreferrer" className="icon"><i className="fa-brands fa-2x fa-facebook"></i></a>
        <a href="http://www.instagram.com" target="_blank" rel="noopener noreferrer" className="icon"><i className="fa-brands fa-2x fa-instagram"></i></a>
      </div>
    </footer>
  );
}

export default Footer;