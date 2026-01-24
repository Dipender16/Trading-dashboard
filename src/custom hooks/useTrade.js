import trades from "../appwrite/tradeManagement";
import authService from "../appwrite/auth";
import { Query } from "appwrite";

export const useTrade = () => {
  const fetchMonthlyTrades = async (date) => {
    const user = await authService.getCurrentUser();

    const start = new Date(
      date.getFullYear(),
      date.getMonth(),
      1,
    ).toISOString();
    const end = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
    ).toISOString();

    const res = await trades.getTrades([
        Query.equal("userId", user.$id),
        Query.greaterThanEqual("$createdAt", start),
        Query.lessThanEqual("$createdAt", end)
    ])
    return res || [];
  };

  return {fetchMonthlyTrades}
};
