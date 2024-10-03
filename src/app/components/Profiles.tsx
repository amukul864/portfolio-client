"use client";

import { useContext } from "react";
import PortfolioContext from "../store/portfolio-context";
import styles from "./Profiles.module.css";

const Profiles = () => {
  const portfolioCtx = useContext(PortfolioContext);

  return (
    <div id="profiles">
      {portfolioCtx.portfolio.profiles.length > 0 && (
        <div className={styles.main}>
          <div className={styles.heading}>Profiles</div>
          <hr className={styles.hr} />
          {portfolioCtx.portfolio.profiles.map((item, index) => (
            <div className={styles.profile} key={index}>
              <a href={item.link} target="_blank" className="link">
                <div className={styles.title}>{item.title}</div>
              </a>
              <div className={styles.description}>{item.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profiles;
