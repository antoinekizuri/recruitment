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
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="hero-title">
            Welcome to the 
            <span className="hero-highlight">Polokwane Municipality</span>
            Employment Portal
          </h1>
          <p className="hero-description">
            This application form assists government departments in selecting candidates for advertised positions. 
            Complete all sections accurately and thoroughly to ensure your application is processed fairly.
          </p>
          <div className="hero-instructions">
            <div className="instruction-item">
              <div className="instruction-icon">1</div>
              <p>Fill in all sections completely and accurately</p>
            </div>
            <div className="instruction-item">
              <div className="instruction-icon">2</div>
              <p>Review your information before submission</p>
            </div>
            <div className="instruction-item">
              <div className="instruction-icon">3</div>
              <p>Submit your application before the deadline</p>
            </div>
          </div>
          <div className="hero-buttons">
            <button 
              className="btn-primary" 
              onClick={() => navigate("/apply-standard")}
            >
              Standard Application
            </button>
            <button 
              className="btn-outline" 
              onClick={() => navigate("/apply-senior")}
            >
              Senior Management Application
            </button>
          </div>
        </motion.div>

        <motion.div
          className="hero-image-container"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="image-wrapper">
            <img 
              src={desktopImage} 
              alt="Polokwane Municipality Careers" 
              className="hero-image" 
            />
            <div className="image-overlay">
              <div className="overlay-content">
                <div className="overlay-icon">✓</div>
                <p>Join our team and make a difference in your community</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;