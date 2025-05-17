import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import desktopImage from "../../assets/desktop.jpg";
import "./hero.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-container">
        <motion.div
          className="hero-text-content"
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">Explore Municipal Job Opportunities</h1>
          <p className="hero-description">
            Discover exciting roles within your municipality and help build stronger communities.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate("/apply-standard")}>
              Standard Application
            </button>
            <button className="btn-primary" onClick={() => navigate("/apply-senior")}>
              Senior Application
            </button>
          </div>
        </motion.div>

        <motion.div
          className="hero-image-container"
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img src={desktopImage} alt="Municipality Careers" className="hero-image" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
