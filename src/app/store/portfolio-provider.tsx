"use client";

import { useContext, useState } from "react";
import PortfolioContext from "./portfolio-context";
import IPortfolio from "@/utils/interfaces/portfolio";
import axios from "@/utils/axios";
import { AxiosError } from "axios";
import ErrorContext from "./error-context";

const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}): any => {
  const errorCtx = useContext(ErrorContext);
  const [portfolio, setPortfolio] = useState<IPortfolio>({
    id: "",
    works: [],
    contactDetails: [],
    skills: [],
    profiles: [],
    personalInfo: { label: "", heading: [], subHeading: [], email: [] },
  });

  const getPortfolio = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/portfolio`,
        {
          withCredentials: true,
        },
      );
      setPortfolio(response.data as IPortfolio);
    } catch (err) {
      const error = err as AxiosError<any>;
      errorCtx.seterror([error.response?.data.error.message]);
    }
  };

  const setPortfolioObject = async (
    value: FormData,
    type: string,
    token?: string,
  ) => {
    try {
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/portfolio/${type}${
          type !== "contact-detail"
            ? `?token=${token}`
            : ""
        }`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: value,
      };
      const response = await axios.request(config);
      if (response.data.saved === true) {
        return true;
      }
      return false;
    } catch (err) {
      const error = err as AxiosError<any>;
      errorCtx.seterror([error.response?.data?.error?.message]);
      return false;
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        getPortfolio,
        setPortfolioObject,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export default PortfolioProvider;
