"use client";

import Contact from "@/app/components/Contact";
import ErrorModal from "@/app/components/ErrorModal";
import ErrorContext from "@/app/store/error-context";
import PortfolioContext from "@/app/store/portfolio-context";
import CheckPortfolio from "@/middleware/CheckPortfolio";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import Nav from "@/app/components/Nav";

  const UpdatePortfolioPage = () => {
    const [select, setSelect] = useState<string>("personal-info");
    const selectRef = useRef<HTMLSelectElement>(null);
  const labelPersonalRef = useRef<HTMLInputElement>(null);
  const skillRef = useRef<HTMLInputElement>(null);
  const titleProfileRef = useRef<HTMLInputElement>(null);
  const linkProfileRef = useRef<HTMLInputElement>(null);
  const descriptionProfileRef = useRef<HTMLInputElement>(null);
  const typeWorkRef = useRef<HTMLInputElement>(null);
  const labelWorkRef = useRef<HTMLInputElement>(null);
  const headingPersonalRef = useRef<(HTMLInputElement | null)[]>([]);
  const subHeadingPersonalRef = useRef<(HTMLInputElement | null)[]>([]);
  const emailPersonalRef = useRef<(HTMLInputElement | null)[]>([]);
  const shortDescriptionWorkRef = useRef<(HTMLInputElement | null)[]>([]);
  const longDescriptionWorkRef = useRef<(HTMLInputElement | null)[]>([]);
  const liveLinksWorkRef = useRef<(HTMLInputElement | null)[]>([]);
  const assetsWorkRef = useRef<(HTMLInputElement | null)[]>([]);
  const portfolioCtx = useContext(PortfolioContext);
  const errorCtx = useContext(ErrorContext);
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");
  const [headingPersonal, setHeadingPersonal] = useState<JSX.Element[]>([
    <label className={styles.label} key={-1}>
      Heading
    </label>,
    <input
      className={styles.input}
      type="text"
      ref={el => {
        headingPersonalRef.current[0] = el;
      }}
      key={0}
    />,
  ]);
  const [subHeadingPersonal, setSubHeadingPersonal] = useState<JSX.Element[]>([
    <label className={styles.label} key={-1}>
      SubHeading
    </label>,
    <input
      className={styles.input}
      type="text"
      ref={el => {
        subHeadingPersonalRef.current[0] = el;
      }}
      key={0}
    />,
  ]);
  const [emailPersonal, setEmailPersonal] = useState<JSX.Element[]>([
    <label className={styles.label} key={-1}>
      Email
    </label>,
    <input
      className={styles.input}
      type="text"
      ref={el => {
        emailPersonalRef.current[0] = el;
      }}
      key={0}
    />,
  ]);
  const [shortDescriptionWork, setShortDescriptionWork] = useState<
    JSX.Element[]
  >([
    <label className={styles.label} key={-1}>
      Short Description
    </label>,
    <input
      className={styles.input}
      type="text"
      ref={el => {
        shortDescriptionWorkRef.current[0] = el;
      }}
      key={0}
    />,
  ]);
  const [longDescriptionWork, setLongDescriptionWork] = useState<JSX.Element[]>(
    [
      <label className={styles.label} key={-1}>
        Long Description
      </label>,
      <input
        className={styles.input}
        type="text"
        ref={el => {
          longDescriptionWorkRef.current[0] = el;
        }}
        key={0}
      />,
    ],
  );
  const [liveLinksWork, setLiveLinksWork] = useState<JSX.Element[]>([
    <label className={styles.label} key={-1}>
      Live Links
    </label>,
    <input
      className={styles.input}
      type="text"
      ref={el => {
        liveLinksWorkRef.current[0] = el;
      }}
      key={0}
    />,
  ]);
  const [assetsWork, setAssetsWork] = useState<JSX.Element[]>([
    <label className={styles.label} key={-1}>
      Image
    </label>,
    <input
      className={styles.input}
      type="file"
      accept="image/*"
      ref={el => {
        assetsWorkRef.current[0] = el;
      }}
      key={0}
    />,
  ]);

  const addInputHandler = (
    jsx: JSX.Element[],
    setJsx: Dispatch<SetStateAction<JSX.Element[]>>,
    ref: MutableRefObject<(HTMLInputElement | null)[]>,
  ) => {
    let newJsx = jsx;
    const add = (
      <input
        className={styles.input}
        type="text"
        ref={el => {
          ref.current[ref.current.length] = el;
        }}
        key={ref.current.length}
      />
    );
    newJsx = [...newJsx, add];
    setJsx(newJsx);
  };

  const addImageHandler = (
    jsx: JSX.Element[],
    setJsx: Dispatch<SetStateAction<JSX.Element[]>>,
    ref: MutableRefObject<(HTMLInputElement | null)[]>,
  ) => {
    let newJsx = jsx;
    const add = (
      <input
        className={styles.input}
        type="file"
        accept="image/*"
        ref={el => {
          ref.current[ref.current.length] = el;
        }}
        key={ref.current.length}
      />
    );
    newJsx = [...newJsx, add];
    setJsx(newJsx);
  };

  const changeHandler = () => {
    if (selectRef.current?.value) {
      setSelect(selectRef.current.value);
    }
  };

  const clickHandler = async () => {
    const data = new FormData();
    data.append("labelPersonal", labelPersonalRef.current?.value as string);
    data.append("skill", skillRef.current?.value as string);
    data.append("titleProfile", titleProfileRef.current?.value as string);
    data.append("linkProfile", linkProfileRef.current?.value as string);
    data.append(
      "descriptionProfile",
      descriptionProfileRef.current?.value as string,
    );
    data.append("typeWork", typeWorkRef.current?.value as string);
    data.append("labelWork", labelWorkRef.current?.value as string);
    headingPersonalRef.current.forEach((item, index) => {
      if (item?.value) {
        data.append(`headingPersonal[${index}]`, item.value);
      }
    });
    subHeadingPersonalRef.current.forEach((item, index) => {
      if (item?.value) {
        data.append(`subHeadingPersonal[${index}]`, item.value);
      }
    });
    emailPersonalRef.current.forEach((item, index) => {
      if (item?.value) {
        data.append(`emailPersonal[${index}]`, item.value);
      }
    });
    shortDescriptionWorkRef.current.forEach((item, index) => {
      if (item?.value) {
        data.append(`shortDescriptionWork[${index}]`, item.value);
      }
    });
    longDescriptionWorkRef.current.forEach((item, index) => {
      if (item?.value) {
        data.append(`longDescriptionWork[${index}]`, item.value);
      }
    });
    liveLinksWorkRef.current.forEach((item, index) => {
      if (item?.value) {
        data.append(`liveLinksWork[${index}]`, item.value);
      }
    });
    assetsWorkRef.current.forEach((item, index) => {
      if (item?.files) {
        data.append(`assetsWork`, item.files[0], `${index}.jpg`);
      }
    });
    const saved = await portfolioCtx.setPortfolioObject(
      data,
      select,
      token !== null ? token : undefined,
    );
    if (saved === false) {
      errorCtx.seterror(["Cannot Send The Details! Please Try Again"]);
    }
    if (saved === true) {
      router.replace("/");
    }
  };

  return (
    <div className={styles.section}>
      {errorCtx.error.length > 0 && <ErrorModal error={errorCtx.error} />}
      <Nav links={[]} link="/" />
      <div className={styles.container}>
        <div className={styles.main}>
        <div className={styles.submain}>
          <div className={styles.heading}>Update Portfolio</div>
          <hr className={styles.hr} />
          <select
            className={styles.button}
            ref={selectRef}
            name="options"
            onChange={changeHandler}
          >
            <option className={styles.button} value="personal-info">
              Change Personal Info
            </option>
            <option className={styles.button} value="work">
              Add Work
            </option>
            <option className={styles.button} value="skill">
              Add Skill
            </option>
            <option className={styles.button} value="profile">
              Add Profile
            </option>
          </select>
          <hr className={styles.hr} />
          {select === "personal-info" && (
            <>
              <label className={styles.label}>Name</label>
              <input
                className={styles.input}
                type="text"
                ref={labelPersonalRef}
                key={0}
              />
              {headingPersonal}
              <button
                className={styles.button}
                onClick={() => {
                  addInputHandler(
                    headingPersonal,
                    setHeadingPersonal,
                    headingPersonalRef,
                  );
                }}
              >
                Add Heading
              </button>
              {subHeadingPersonal}
              <button
                className={styles.button}
                onClick={() => {
                  addInputHandler(
                    subHeadingPersonal,
                    setSubHeadingPersonal,
                    subHeadingPersonalRef,
                  );
                }}
              >
                Add SubHeading
              </button>
              {emailPersonal}
              <button
                className={styles.button}
                onClick={() => {
                  addInputHandler(
                    emailPersonal,
                    setEmailPersonal,
                    emailPersonalRef,
                  );
                }}
              >
                Add Email
              </button>
            </>
          )}
          {select === "work" && (
            <>
              <label className={styles.label}>Type</label>
              <input
                className={styles.input}
                type="text"
                ref={typeWorkRef}
                key={0}
              />
              <label className={styles.label}>Label</label>
              <input
                className={styles.input}
                type="text"
                ref={labelWorkRef}
                key={1}
              />
              {shortDescriptionWork}
              <button
                className={styles.button}
                onClick={() => {
                  addInputHandler(
                    shortDescriptionWork,
                    setShortDescriptionWork,
                    shortDescriptionWorkRef,
                  );
                }}
              >
                Add Short Description
              </button>
              {longDescriptionWork}
              <button
                className={styles.button}
                onClick={() => {
                  addInputHandler(
                    longDescriptionWork,
                    setLongDescriptionWork,
                    longDescriptionWorkRef,
                  );
                }}
              >
                Add Long Description
              </button>
              {liveLinksWork}
              <button
                className={styles.button}
                onClick={() => {
                  addInputHandler(
                    liveLinksWork,
                    setLiveLinksWork,
                    liveLinksWorkRef,
                  );
                }}
              >
                Add Live Link
              </button>
              {assetsWork}
              <button
                className={styles.button}
                onClick={() => {
                  addImageHandler(assetsWork, setAssetsWork, assetsWorkRef);
                }}
              >
                Add Image
              </button>
            </>
          )}
          {select === "skill" && (
            <>
              <label className={styles.label}>Skill</label>
              <input
                className={styles.input}
                type="text"
                ref={skillRef}
                key={0}
              />
            </>
          )}
          {select === "profile" && (
            <>
              <label className={styles.label}>Title</label>
              <input
                className={styles.input}
                type="text"
                ref={titleProfileRef}
                key={0}
              />
              <label className={styles.label}>Link</label>
              <input
                className={styles.input}
                type="text"
                ref={linkProfileRef}
                key={1}
              />
              <label className={styles.label}>Description</label>
              <input
                className={styles.input}
                type="text"
                ref={descriptionProfileRef}
                key={2}
              />
            </>
          )}
          <hr className={styles.hr} />
          <button className={styles.button} onClick={clickHandler}>
            Submit
          </button>
        </div>
        </div>
        <Contact />
      </div>
    </div>
  );
};

export default CheckPortfolio(UpdatePortfolioPage);
