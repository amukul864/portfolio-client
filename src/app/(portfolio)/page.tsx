"use client";

import CheckPortfolio from "@/middleware/CheckPortfolio";
import { useContext } from "react";
import ErrorContext from "../store/error-context";
import ErrorModal from "../components/ErrorModal";
import Personal from "../components/Personal";
import Skills from "../components/Skills";
import Profiles from "../components/Profiles";
import Works from "../components/Works";
import Contact from "../components/Contact";
import styles from "./page.module.css";
import Nav from "../components/Nav";
import { ILinks } from "@/utils/interfaces/portfolio";

const HomePage = () => {
  const errorCtx = useContext(ErrorContext);

  const links: ILinks[] = [
    { link: "#skills", label: "Skills" },
    { link: "#profiles", label: "Profiles" },
    { link: "#works", label: "Works" },
  ];

  return (
    <div className={styles.main}>
      {errorCtx.error.length > 0 && <ErrorModal error={errorCtx.error} />}
      <Nav links={links} link="#personal" />
      <div className={styles.section}>
        <div className={styles.personalContainer}>
          <Personal />
        </div>
        <div className={styles.otherContainer}>
          <Skills />
          <Profiles />
          <Works />
          <Contact />
        </div>
      </div>
    </div>
  );
};

export default CheckPortfolio(HomePage);
