"use client";

import { useContext } from "react";
import styles from "./Nav.module.css";
import Link from "next/link";
import PortfolioContext from "../store/portfolio-context";
import Image from "next/image";
import { ILinks } from "@/utils/interfaces/portfolio";

const Nav: React.FC<{ links: ILinks[]; link: string }> = ({ links, link }) => {
  const portfolioCtx = useContext(PortfolioContext);

  return (
    <div className={styles.nav}>
      <Link className="link" href={link}>
        <div className={styles.name}>
          <div className={styles.image}>
            <Image src="/icon.png" fill={true} alt="icon" />
          </div>
          {portfolioCtx.portfolio.personalInfo.label}
        </div>
      </Link>
      <div className={styles.subnav}>
        {links &&
          links.map((item, index) => (
            <Link className="link" href={item.link} key={index}>
              <div className={styles.sub}>{item.label}</div>
            </Link>
          ))}
        <Link className="link" href={"#contact"}>
          <div className={styles.contact}>Contact Us</div>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
