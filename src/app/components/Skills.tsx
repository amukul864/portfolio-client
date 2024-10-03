"use client";

import { useContext } from "react";
import PortfolioContext from "../store/portfolio-context";
import styles from "./Skills.module.css";

const Skills = () => {
  const portfolioCtx = useContext(PortfolioContext);

  return (
    <div className={styles.main} id="skills">
      {portfolioCtx.portfolio.skills.length > 0 && (
        <div className={styles.heading}>
          Skills
          <hr className={styles.hr} />
          <div className={styles.skills}>
            {portfolioCtx.portfolio.skills.map((item, index) => (
              <div key={index}>
                <div className={styles.skill} key={index}>
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Skills;
