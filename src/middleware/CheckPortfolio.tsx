"use client";

import LoadingSpinner from "@/app/components/ui/LoadingSpinner";
import PortfolioContext from "@/app/store/portfolio-context";
import usePortfolio from "@/hooks/usePortfolio";
import { useContext } from "react";

const CheckPortfolio = (Component: React.ComponentType) => {
  return function AuthenticatedComponent(props: any) {
    const portfolioCtx = useContext(PortfolioContext);
    usePortfolio();

    if (portfolioCtx.portfolio.id === "") {
      return <LoadingSpinner />;
    }

    return <Component {...props} />;
  };
};

export default CheckPortfolio;
