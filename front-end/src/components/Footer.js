import React from "react";
import(
  "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css"
);
const Footer = () => {
  return (
    <>
      <div className="footer bg-black text-muted d-flex justify-content-center py-4 fs-5">
        <span>
          Made with <i className="bi bi-heart-fill text-danger"></i> by{" "}
          <a
            href="https://github.com/Mohamed3Okasha/"
            className="text-decoration-none text-muted"
          >
            Mohamed Okasha <i className="bi bi-github fs-5"></i>
          </a>
        </span>
      </div>
    </>
  );
};

export default Footer;
