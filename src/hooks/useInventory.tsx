import { useERC1155Balance } from "@react-dapp/utils";
import { getLand, LANDS } from "src/config/cards";

export const useInventory = () => {
  const { balance, loading } = useERC1155Balance(
    process.env.REACT_APP_POOL_CARDS_ADDRESS || "",
    LANDS.map((e) => e.tokenId)
  );

  return {
    loading,
    balance: balance
      ?.filter((e) => e.amount > 0)
      ?.map((e) => {
        return {
          amount: e.amount,
          ...getLand(e.tokenId),
        };
      }),
  };
};
