import React, { useState } from "react";
import { FaPhoneVolume } from "react-icons/fa";
import { MdOutlineEmail, MdLocationPin } from "react-icons/md";
import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress"; // Import LinearProgress from Material-UI
import "./contact.css";
import toast, { Toaster } from "react-hot-toast";
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if message exceeds 500 characters
    if (message.length > 500) {
      alert("Message should not exceed 500 characters.");
      return;
    }

    setLoading(true); // Start loading indicator

    const data = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      topic: topic,
      message: message,
    };
    axios
      .post("https://contact-page-backend.onrender.com/api/v1/newContact", data)
      .then((response) => {
        console.log(response);
        setEmail("");
        setName("");
        setPhoneNumber("");
        setTopic("");
        setMessage("");
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      })
      .finally(() => {
        setLoading(false);
        toast.success("Message Sent Sucessfully!");
        // Stop loading indicator
      });
  };

  return (
    <section className="contact">
      <Toaster />
      <div className="content">
        <h2>CONTACT US</h2>
        <p>
          At TO Let Globe, we prioritize your privacy and ensure the security of
          your personal information. We collect and use your data solely for
          improving our services, managing accounts, and complying with legal
          requirements. Your information is protected with industry-standard
          security measures, and we do not share it without your consent, except
          as required by law. For more details, please read our full Privacy
          Notice or contact us at hello@toletglobe.in
        </p>
      </div>
      <div className="container1">
        <div className="contactInfo">
          <div className="box">
            <div className="icon">
              <MdLocationPin />
            </div>
            <div className="text">
              <h3>Address</h3>
              <p>D1/122 vipulkhand,Gomtinagar Lucknow, Uttar Pradesh</p>
            </div>
          </div>
          <div className="box">
            <div className="icon">
              <MdOutlineEmail />
            </div>
            <div className="text">
              <h3>Email</h3>
              <p>hello@toletglobe.in</p>
            </div>
          </div>
          <div className="box">
            <div className="icon">
              <FaPhoneVolume />
            </div>
            <div className="text">
              <h3>Phone</h3>
              <p>+91-8707727347</p>
            </div>
          </div>
        </div>
        <div className="contactForm">
          {loading && <LinearProgress />}{" "}
          {/* Render LinearProgress when loading is true */}
          <form onSubmit={handleSubmit}>
            <h2>We love to hear from you</h2>
            <div className="inputBox">
              <input
                type="text"
                name="name"
                required
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span>Full Name</span>
            </div>
            <div className="inputBox">
              <input
                type="email"
                name="email"
                required
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span>Email</span>
            </div>
            <div className="inputBox">
              <input
                type="text"
                name="phoneNumber"
                required
                autoComplete="off"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <span>Phone Number</span>
            </div>
            <span>Topic</span>
            <div className="inputBox">
              <select
                name="topic"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              >
                <option value="" disabled>
                  Select Topic
                </option>
                <option value="Inquiry">Inquiry</option>
                <option value="Report Bug">Report Bug</option>
                <option value="Support">Support</option>
                <option value="Feedback">Feedback</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="inputBox">
              <textarea
                name="message"
                required
                autoComplete="off"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={500} // Added maxLength attribute
              ></textarea>
              <span>Type your Message (max 500 characters)</span>
            </div>
            <div className="inputBox">
              <input type="submit" value="Send" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
