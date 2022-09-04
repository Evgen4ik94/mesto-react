import React from "react";

function Footer() {
  const date = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer__author">&copy; {date} Евгений Миляков</p>
    </footer>
  );
}

export default Footer;
