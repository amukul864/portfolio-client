import PortfolioContext from "@/app/store/portfolio-context";
import { useContext, useEffect } from "react";

const usePortfolio = () => {
  const portfolioCtx = useContext(PortfolioContext);

  useEffect(() => {
    const getPortfolio = async () => {
      await portfolioCtx.getPortfolio();
    };

    getPortfolio();
  }, []);
};

export default usePortfolio;
