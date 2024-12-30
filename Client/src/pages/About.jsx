import React, { useEffect, useState } from "react";
import hero from "../LandingDefaultImage.jpg";
const About = () => {
  const [sellers, setSellers] = useState(0);
  const [clients, setClients] = useState(0);

  const companyStartDate = new Date("2024-11-01");
  const currentDate = new Date();
  const daysSinceStart = Math.floor(
    (currentDate - companyStartDate) / (1000 * 60 * 60 * 24)
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/getSellersandClients",
          { method: "GET" }
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setSellers(data.sellers || 0);
        setClients(data.clients || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "4rem 2rem",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.8",
        backgroundColor: "#f9f9f9",
        color: "#333",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          marginBottom: "1.5r",
          color: "#222",
        }}
      >
        About Us
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          marginBottom: "2",
          color: "#555",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        Welcome to <strong>Our Company</strong>! For the past {daysSinceStart}{" "}
        days, we have been dedicated to providing exceptional services and
        ensuring <strong>customer satisfaction</strong>.
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "2rem 0",
        }}
      >
        <img
          src={hero}
          alt="Hero"
          style={{
            maxWidth: "30%",
            height: "auto",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>
      <p
        style={{
          fontSize: "1.2",
          marginBottom: "2",
          color: "#555",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        We have <strong>{sellers}</strong> sellers and{" "}
        <strong>{clients}</strong> satisfied clients, with a skilled team of
        expert technicians committed to delivering top-notch solutions tailored
        to your needs.
      </p>
    </div>
  );
};

export default About;
