import React, { useEffect, useState } from "react";
import styles from "./Feedback.module.css";
import { feedbackOptions } from "../../utils/feedbackOptions";
import feedbackImage from "../../assets/icon/feedback.png";
import { addFeedback } from "../../apis/feedback";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Feedback = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setfeedbackType] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleSelect = (e) => {
    setfeedbackType(e.target.value);
  };

  const handleChange = (e) => {
    setFeedbackMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addFeedback(feedbackType, feedbackMessage);
    if (response) {
      toast.success("Feedback submitted");
      setIsOpen(false);
    }
  };

  const toggleFeedbackBox = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.mainContainer}>
      {isOpen && (
        <div className={styles.feedbackBar}>
          <form onSubmit={handleSubmit}>
            <div className={styles.feedbackBox}>
              <div className={styles.feedbackSelect}>
                <label>Type of feedback</label>
                <select onChange={handleSelect} required>
                  <option value="" hidden>
                    Choose the type
                  </option>
                  {feedbackOptions.options.map((element) => (
                    <option value={element.value}>{element.displayName}</option>
                  ))}
                </select>
              </div>

              <div className={styles.feedbackTextArea}>
                <label>Feedback</label>
                <textarea
                  onChange={handleChange}
                  required
                  placeholder="Type your feedback"
                ></textarea>
              </div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      )}
      <div className={styles.feedbackIcon}>
        <img src={feedbackImage} onClick={toggleFeedbackBox} />
      </div>
    </div>
  );
};
