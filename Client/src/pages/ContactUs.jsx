import React, { useState } from "react";
import "./ContactUs.css";
import { sendRequest } from '../config/request.js'; 

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await sendRequest({route:"/contactFill"
        ,method: "POST",
        body:formData,
      });
      if (response.success) {
        setStatus("Message sent successfully!");
        setFormData({ fullName: "", email: "", message: "" });
      } else {
        console.log(response)

        setStatus("Failed to send message. Please try again later.");
      }
    } catch (error) {

      setStatus("An error occurred. Please try again later.");
      console.log(error)
    }
  };

  return (
    <section className="outermost">
      <div className="section-header">
        <div className="container">
          <h2>Contact Us</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="contact-info">
            <div className="contact-info-item">
  
              <div className="contact-info-content">
                <h4>Address</h4>
                <p>4671 Sugar Camp Road, Owatonna, Minnesota, 55060</p>
              </div>
            </div>
            <div className="contact-info-item">

              <div className="contact-info-content">
                <h4>Phone</h4>
                <p>571-457-2321</p>
              </div>
            </div>
            <div className="contact-info-item">

              <div className="contact-info-content">
                <h4>Email</h4>
                <p>ntamerrwael@mfano.ga</p>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <h2>Send Message</h2>
              <div className="input-box">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Name"
                />
              </div>
              <div className="input-box">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email"

                />
              </div>
              <div className="input-box">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Message"

                ></textarea>
              </div>
              <div className="input-box">
                <input type="submit" value="Send" />
              </div>
              {status && <p className="form-status">{status}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
