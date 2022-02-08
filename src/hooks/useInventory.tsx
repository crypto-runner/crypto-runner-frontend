import React from "react";
import { useERC1155Balance } from "@react-dapp/utils";
import { POOL_CARD_ADDRESS } from "../config/config";
import { useFetchMetadataForTokenIds } from "src/hooks/useMetadata";
import useLoading from "./useLoading";

let totalTokenIds = 205;
let tokenIds = new Array(totalTokenIds).fill(0, 0, totalTokenIds).map((v, i) => i);

export const useInventory = () => {
  const [results, setResults] = React.useState<any>([]);
  const { fetchAllMetadata } = useFetchMetadataForTokenIds();
  const [inventoryLoading, setLoading] = React.useState(false);

  const { balance, loading } = useERC1155Balance(POOL_CARD_ADDRESS || "", tokenIds);

  useLoading(inventoryLoading);

  React.useEffect(() => {
    if (!inventoryLoading && loading) setLoading(true);
    if (!inventoryLoading && !loading) setLoading(false);
  }, [loading]);

  React.useEffect(() => {
    const fetchMetaData = async () => {
      setLoading(true);
      console.log(balance);
      let arr = balance
        ?.filter((e: any) => e && e.amount && e.amount > 0)
        ?.map((e: any) => {
          return {
            amount: e.amount,
            tokenId: e.tokenId,
          };
        }) || [];

      console.log("arr", arr);

      let res: any = await fetchAllMetadata(arr.map((e) => e.tokenId));
      res = res.map((item: any, i: number) => ({ ...item, amount: arr[i]?.amount }));
      console.log("res", res);

      setResults(res);
      setLoading(false);
    };
    if (balance && balance?.length > 0) fetchMetaData();
  }, [balance]);

  return {
    loading,
    balance: results,
  };
};
