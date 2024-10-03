"use client";

import { useContext } from "react";
import PortfolioContext from "../store/portfolio-context";
import { IWork } from "@/utils/interfaces/portfolio";
import Work from "./Work";
import styles from "./Works.module.css";
import Link from "next/link";

const Works = () => {
  const portfolioCtx = useContext(PortfolioContext);

  const experience: IWork[] = portfolioCtx.portfolio.works
    .filter(item => item.type === "experience")
    .sort((a: any, b: any) => a.sortOrder - b.sortOrder);
  const freelance: IWork[] = portfolioCtx.portfolio.works
    .filter(item => item.type === "freelance")
    .sort((a: any, b: any) => a.sortOrder - b.sortOrder);
  const project: IWork[] = portfolioCtx.portfolio.works
    .filter(item => item.type === "project")
    .sort((a: any, b: any) => a.sortOrder - b.sortOrder);

  return (
    <div className={styles.section} id="works">
      {experience.length > 0 && (
        <div className={styles.main1}>
          <Link className="link" href={"/work?type=experience"}>
            <div className={styles.heading1}>Professional Experiences</div>
          </Link>
          <hr className={styles.hr1} />
          {experience.map((item, index) => (
            <Work item={item} key={index} />
          ))}
        </div>
      )}
      {freelance.length > 0 && (
        <div className={styles.main2}>
          <Link className="link" href={"/work?type=freelance"}>
            <div className={styles.heading2}>Freelancing Projects</div>
          </Link>
          <hr className={styles.hr2} />
          {freelance.map((item, index) => (
            <Work isWhiteBackground item={item} key={index} />
          ))}
        </div>
      )}
      {project.length > 0 && (
        <div className={styles.main1}>
          <Link className="link" href={"/work?type=project"}>
            <div className={styles.heading1}>Personal Projects</div>
          </Link>
          <hr className={styles.hr1} />
          {project.map((item, index) => (
            <Work item={item} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Works;
