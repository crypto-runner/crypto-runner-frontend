import React from "react";
import { useERC1155Balance } from "@react-dapp/utils";
import { getRunner, RUNNERS } from "src/config/cards";
import { POOL_CARD_ADDRESS } from "../config/config";

export const useInventory = () => {
  const { balance, loading } = useERC1155Balance(
    POOL_CARD_ADDRESS || "",
    RUNNERS.map((e) => e.tokenId)
  );

  return {
    loading,
    balance: balance
      ?.filter((e) => e.amount > 0)
      ?.map((e) => {
        return {
          amount: e.amount,
          ...getRunner(e.tokenId),
        };
      }),
  };
};
