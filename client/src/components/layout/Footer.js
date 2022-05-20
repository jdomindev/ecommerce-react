import React from "react";
import "../assets/Footer.css";

function Footer() {
  return ( 
    <footer className="footer text-center" id="contact">
       <span className="footer-color">&copy; 2022 Copyright:</span><a href="http://www.github.com/jdomindev"> José Dominguez</a>
      <br></br>
      <div className="icons">
        <a href="http://www.twitter.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-2x fa-twitter"></i></a>
        <a href="http://www.facebook.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-2x fa-facebook"></i></a>
        <a href="http://www.instagram.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-2x fa-instagram"></i></a>
        <a href="http://www.github.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-2x fa-github"></i></a>
      </div>
    </footer>
  );
}

export default Footer;