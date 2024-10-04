"use client";

import { useContext } from "react";
import PortfolioContext from "../store/portfolio-context";
import styles from "./Personal.module.css";
import Image from "next/image";

const Personal = () => {
  const portfolioCtx = useContext(PortfolioContext);

  return (
    <div className={styles.container} id="personal">
      <div className={styles.label}>
        Hi, I&apos;m {portfolioCtx.portfolio.personalInfo.label}!
      </div>
      <div className={styles.heading}>
        {portfolioCtx.portfolio.personalInfo.heading.map((item, index) => (
          <span key={index}>
            {item}{" "}
            {index !=
              portfolioCtx.portfolio.personalInfo.heading.length - 1 && (
              <>|</>
            )}{" "}
          </span>
        ))}
      </div>
      <div className={styles.subHeading}>
        {portfolioCtx.portfolio.personalInfo.subHeading.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
      <div className={styles.image}>
        <Image
          alt="Cover Photo"
          fill={true}
          src="/coverPhoto.png"
          unoptimized
        />
      </div>
    </div>
  );
};

export default Personal;
