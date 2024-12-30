import React, { useState } from "react";
import { sendRequest } from "../config/request.js";

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
      const response = await sendRequest({
        route: "/contactFill",
        method: "POST",
        body: formData,
      });
      if (response.success) {
        setStatus("Message sent successfully!");
        setFormData({ fullName: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message. Please try again later.");
      }
    } catch (error) {
      setStatus("An error occurred. Please try again later.");
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
      </div>

      <div className="max-w-4xl w-full mx-auto flex flex-col md:flex-row gap-8 justify-center items-center">
        <div className="w-full md:w-1/2 text-center">
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-teal-600">Address</h4>
            <p className="text-gray-700">Byblos, Lebanon</p>
          </div>
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-teal-600">Phone</h4>
            <p className="text-gray-700">76890908</p>
          </div>
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-teal-600">Email</h4>
            <p className="text-gray-700">propertease@gmail.com</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-white p-8 shadow-lg rounded-lg">
          <form onSubmit={handleSubmit} className="text-center">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Send Message</h2>

            <div className="mb-4">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Name"
                className="w-full px-4 py-2 border-b-2 border-gray-300 outline-none focus:border-teal-500"
              />
            </div>

            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email"
                className="w-full px-4 py-2 border-b-2 border-gray-300 outline-none focus:border-teal-500"
              />
            </div>

            <div className="mb-4">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Message"
                className="w-full px-4 py-2 border-b-2 border-gray-300 outline-none focus:border-teal-500 resize-none"
              ></textarea>
            </div>

            <div className="mb-4">
              <input
                type="submit"
                value="Send"
                className="w-full bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 cursor-pointer transition-all"
              />
            </div>

            {status && <p className="text-center text-red-500 mt-4">{status}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
