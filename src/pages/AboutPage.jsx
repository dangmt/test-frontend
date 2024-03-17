import React from "react";
import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <div className="container mt-4">
      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">About Us</h1>
          <p className="col-md-8 fs-4">
            This is the about page content. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Sed neque velit, lobortis ut magna
            varius, blandit rhoncus sem. Morbi lacinia nisi ac dui fermentum,
            sed luctus urna tincidunt.
          </p>
          <Link to="/" className="btn btn-primary btn-lg" type="button">
            Go back to Home
          </Link>
        </div>
      </div>

      <div className="row align-items-md-stretch">
        <div className="col-md-6">
          <div className="h-100 p-5 text-white bg-dark rounded-3">
            <h2>Our Mission</h2>
            <p>
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. Vestibulum tortor quam.
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="h-100 p-5 bg-light border rounded-3">
            <h2>Our Vision</h2>
            <p>
              Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh
              elementum imperdiet. Duis sagittis ipsum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
