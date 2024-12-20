import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import hero from "../LandingDefaultImage.jpg";

const About = () => {
  const navigate = useNavigate();
  const [sellers, setSellers] = useState(0);
  const [clients, setClients] = useState(0);

  const companyStartDate = new Date("2020-01-01");
  const currentDate = new Date();
  const daysSinceStart = Math.floor((currentDate - companyStartDate) / (1000 * 60 * 60 * 24));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/getSellersandClients",{ method: 'Get'});
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setSellers(data.sellers || 0);
        setClients(data.clients || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>About Us</h1>
      <p style={styles.text}>
        Welcome to <strong>Our Company</strong>! For the past {daysSinceStart} days, we have been dedicated to providing 
        exceptional services and ensuring <strong>customer satisfaction</strong>.
      </p>
      <div style={styles.image_container}>
        <img src={hero} alt="Hero" style={styles.image} />
      </div>
      <p style={styles.text}>
        We have {sellers} sellers and {clients} satisfied clients, with a skilled team of expert technicians committed to 
        delivering top-notch solutions tailored to your needs.
      </p>
      <button style={styles.button} onClick={handleRegister}>
        Register Now
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
    lineHeight: "1.6",
  },
  header: {
    fontSize: "5rem",
    marginBottom: "1rem",
  },
  text: {
    fontSize: "3rem",
    marginBottom: "1rem",
    color: "#555",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: "10px 20px",
    fontSize: "2rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  image_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "1rem 0",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "8px",
  },
};

export default About;
