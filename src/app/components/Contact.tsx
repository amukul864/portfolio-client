"use client";

import { useContext, useRef } from "react";
import ErrorContext from "../store/error-context";
import PortfolioContext from "../store/portfolio-context";
import styles from "./Contact.module.css";

const Contact = () => {
  const errorCtx = useContext(ErrorContext);
  const portfolioCtx = useContext(PortfolioContext);
  const emailRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const clickHandler = async () => {
    if (
      emailRef &&
      emailRef.current &&
      emailRef.current.value !== "" &&
      titleRef &&
      titleRef.current &&
      titleRef.current.value !== "" &&
      descriptionRef &&
      descriptionRef.current &&
      descriptionRef.current.value !== ""
    ) {
      const data = new FormData();
      data.append("email", emailRef.current.value);
      data.append("title", titleRef.current.value);
      data.append("description", descriptionRef.current.value);
      const saved = await portfolioCtx.setPortfolioObject(
        data,
        "contact-detail",
      );
      if (saved === false) {
        errorCtx.seterror(["Cannot Send The Details! Please Try Again"]);
      }
      if (saved === true) {
        emailRef.current.value = "";
        titleRef.current.value = "";
        descriptionRef.current.value = "";
        errorCtx.seterror(["Details Sent! Thanks For Contacting"]);
      }
    } else {
      errorCtx.seterror(["No Field Should Be Empty!"]);
    }
  };

  return (
    <div className={styles.section} id="contact">
      <div className={styles.main}>
        <div className={styles.heading}>Contact Us</div>
        <hr className={styles.hr} />
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          ref={emailRef}
        />
        <input
          className={styles.input}
          type="text"
          name="title"
          placeholder="Subject"
          ref={titleRef}
        />
        <input
          className={styles.input}
          type="text"
          name="description"
          placeholder="Description"
          ref={descriptionRef}
        />
        <button className={styles.button} onClick={clickHandler}>
          Submit
        </button>
        <hr className={styles.hr} />
        <div className={styles.input}>
          Or Mail Us At{" "}
          {portfolioCtx.portfolio.personalInfo.email.map((item, index) => (
            <span key={index}>
              <a className="link" href={`mailto:${item}`}>
                {item}
              </a>{" "}
              {index !=
                portfolioCtx.portfolio.personalInfo.email.length - 1 && (
                <>|</>
              )}{" "}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
