"use client";

import React, { useState } from "react";
import { IWork } from "@/utils/interfaces/portfolio";
import styles from "./Work.module.css";
import Image from "next/image";
import Link from "next/link";

const Work: React.FC<{
  item: IWork;
  isWhiteBackground?: boolean;
  isLongDescription?: boolean;
}> = ({ item, isWhiteBackground, isLongDescription }) => {
  const [index, setIndex] = useState<number>(0);

  const prevHandler = () => {
    setIndex(state => {
      return (
        (state - 1 + (item.assetLinks ? item.assetLinks?.length : 1000)) %
        (item.assetLinks ? item.assetLinks?.length : 1)
      );
    });
  };

  const nextHandler = () => {
    setIndex(state => {
      return (state + 1) % (item.assetLinks ? item.assetLinks?.length : 1);
    });
  };

  return (
    <>
      <div className={styles.work}>
        <div className={isWhiteBackground ? styles.photos2 : styles.photos1}>
          {item.assetLinks && (
            <Image
              className={styles.icon}
              src={
                item.assetLinks
                  ? process.env.NEXT_PUBLIC_URL + item.assetLinks[index]
                  : "/logo.png"
              }
              fill={true}
              alt="icon"
            />
          )}
          <div className={isWhiteBackground ? styles.nav2 : styles.nav1}>
            <div
              className={
                isWhiteBackground ? styles.navbutton2 : styles.navbutton1
              }
              onClick={prevHandler}
            >
              &lt;
            </div>
            <div
              className={
                isWhiteBackground ? styles.navbutton2 : styles.navbutton1
              }
              onClick={nextHandler}
            >
              &gt;
            </div>
          </div>
        </div>
        <div className={styles.info}>
          <Link
            className="link"
            href={`/work/?type=${item.type}&label=${item.label}`}
          >
            <div className={isWhiteBackground ? styles.label2 : styles.label1}>
              {item.label}
            </div>
          </Link>
          <hr className={isWhiteBackground ? styles.hr2 : styles.hr1} />
          <ul className={styles.ul}>
            {item.shortDescription &&
              item.shortDescription.map((item1, index) => (
                <li
                  className={
                    isWhiteBackground
                      ? styles.description2
                      : styles.description1
                  }
                  key={index}
                >
                  {item1}
                </li>
              ))}
            {item.longDescription &&
              isLongDescription &&
              item.longDescription.map((item1, index) => (
                <li
                  className={
                    isWhiteBackground
                      ? styles.description2
                      : styles.description1
                  }
                  key={index}
                >
                  {item1}
                </li>
              ))}
          </ul>
          <hr className={isWhiteBackground ? styles.hr2 : styles.hr1} />
          <div className={styles.links}>
            {item.liveLinks &&
              item.liveLinks.map((item1, index) => (
                <div key={index}>
                  <a href={item1} target="_blank" className="link">
                    <div
                      className={
                        isWhiteBackground ? styles.link2 : styles.link1
                      }
                      key={index}
                    >
                      {item.liveLinks && index < item.liveLinks.length - 2 ? `Live Link ${index}` : `Github Link ${index}`}
                    </div>
                  </a>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Work;
