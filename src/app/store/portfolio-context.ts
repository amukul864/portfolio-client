"use client";
import IPortfolio from "@/utils/interfaces/portfolio";
import React from "react";

interface PortfolioContextType {
  portfolio: IPortfolio;
  getPortfolio: () => Promise<void>;
  setPortfolioObject: (
    value: FormData,
    type: string,
    token?: string,
  ) => Promise<boolean>;
}

const PortfolioContext = React.createContext<PortfolioContextType>({
  portfolio: {
    id: "",
    works: [],
    contactDetails: [],
    skills: [],
    profiles: [],
    personalInfo: { label: "", heading: [], subHeading: [], email: [] },
  },
  getPortfolio: async () => {},
  setPortfolioObject: async (value: FormData, type: string, token?: string) =>
    false,
});

export default PortfolioContext;
