"use client";

import Contact from "@/app/components/Contact";
import ErrorModal from "@/app/components/ErrorModal";
import Work from "@/app/components/Work";
import Works from "@/app/components/Works";
import ErrorContext from "@/app/store/error-context";
import PortfolioContext from "@/app/store/portfolio-context";
import CheckPortfolio from "@/middleware/CheckPortfolio";
import { ILinks, IWork } from "@/utils/interfaces/portfolio";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";
import styles from "./page.module.css";
import Nav from "@/app/components/Nav";

const WorkPage = () => {
  const portfolioCtx = useContext(PortfolioContext);
  const errorCtx = useContext(ErrorContext);
  const params = useSearchParams();
  const type = params.get("type");
  const label = params.get("label");
  let work: IWork[] = [];
  let experience: IWork[] = [];
  let freelance: IWork[] = [];
  let project: IWork[] = [];

  const links: ILinks[] = [{ link: "#works", label: "Works" }];

  if (type) {
    work = portfolioCtx.portfolio.works
      .filter(item => item.type === type)
      .sort((a: any, b: any) => a.sortOrder - b.sortOrder);
    if (label) {
      work = work
        .filter(item => item.label === label)
        .sort((a: any, b: any) => a.sortOrder - b.sortOrder);
    }
  } else {
    experience = portfolioCtx.portfolio.works
      .filter(item => item.type === "experience")
      .sort((a: any, b: any) => a.sortOrder - b.sortOrder);
    freelance = portfolioCtx.portfolio.works
      .filter(item => item.type === "freelance")
      .sort((a: any, b: any) => a.sortOrder - b.sortOrder);
    project = portfolioCtx.portfolio.works
      .filter(item => item.type === "project")
      .sort((a: any, b: any) => a.sortOrder - b.sortOrder);
  }

  useEffect(() => {
    if (portfolioCtx.portfolio.works.length === 0) {
      errorCtx.seterror(["Nothing Found! Please Try Again"]);
    }
  }, [portfolioCtx.portfolio]);

  return (
    <div className={styles.section}>
      <Nav links={links} link="/" />
      <div className={styles.container}>
        {errorCtx.error.length > 0 && <ErrorModal error={errorCtx.error} />}
        {work.length === 1 && type && label && (
          <div className={styles.main} id="works">
            {type === "experience" && (
              <div className={styles.heading}>Professional Experience</div>
            )}
            {type === "project" && (
              <div className={styles.heading}>Personal Project</div>
            )}
            {type === "freelance" && (
              <div className={styles.heading}>Freelancing Project</div>
            )}
            <hr className={styles.hr} />
            <Work isLongDescription item={work[0]} />
          </div>
        )}
        {(work.length > 1 || (!label && type)) && (
          <div className={styles.main} id="works">
            {type === "experience" && (
              <div className={styles.heading}>Professional Experiences</div>
            )}
            {type === "project" && (
              <div className={styles.heading}>Personal Projects</div>
            )}
            {type === "freelance" && (
              <div className={styles.heading}>Freelancing Projects</div>
            )}
            <hr className={styles.hr} />
            {work.map((item, index) => (
              <Work item={item} key={index} />
            ))}
          </div>
        )}
        {work.length === 0 && (
          <>
            <Works />
          </>
        )}
        <Contact />
      </div>
    </div>
  );
};

export default CheckPortfolio(WorkPage);
