// src/components/hero.jsx
import React from "react";
import { motion } from "framer-motion";
import desktopImage from "../../assets/desktop.jpg";
import "./hero.css"; // Import the CSS

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* LEFT CONTENT */}
        <motion.div
          className="hero-text-content"
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">
            Explore Municipal Job Opportunities
          </h1>
          <p className="hero-description">
            Discover exciting roles within your municipality and help build stronger communities.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">Standard Application</button>
            <button className="btn-primary">Senior Application</button>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          className="hero-image-container"
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={desktopImage}
            alt="Municipality Careers"
            className="hero-image"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
