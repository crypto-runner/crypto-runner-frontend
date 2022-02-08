import { useERC1155, useERC721 } from "@react-dapp/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { notify } from "reapop";
import { POOL_CARD_ADDRESS } from "src/config/config";
import { fetchIpfs } from "src/util";

/**
 * This hook fetches the metadata of an ERC1155 token.
 *
 * @param contractAddress Address of contract
 *
 */

export const useMetadata = (contractAddress: string | undefined, tokenId: string | undefined) => {
  const [loading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState<any>();
  console.log("contract", contractAddress, tokenId);
  let contract = useERC1155(contractAddress);

  useEffect(() => {
    const fetchMetadata = async () => {
      if (!contract || !contractAddress || !tokenId) return;
      setLoading(true);
      try {
        let uri: string = await contract.uri(tokenId);
        console.log("raw uri", uri);
        uri = uri.replaceAll("{address}", contractAddress);
        uri = uri.replaceAll("{id}", tokenId);
        console.log("uri", uri);
        let data;
        if (uri.includes("ipfs://")) {
          data = await fetchIpfs(uri);
          setMetadata(data);
        } else {
          let res = await axios.get(uri);
          data = res.data;
          setMetadata(data);
        }
        console.log("metadata", data);
        setLoading(false);
        return;
      } catch (error) {
        console.error(error);
        setLoading(false);
        notify({
          type: "error",
          message: "Unable to fetch metadata!",
        });
      }
    };

    fetchMetadata();
  }, [contract, tokenId]);

  return { metadata, loading };
};

export const useFetchMetadataForTokenIds = () => {
  let contract = useERC1155(POOL_CARD_ADDRESS);

  const fetch = (tokenId: number) =>
    new Promise(async (resolve, reject) => {
      try {
        if (!contract) return;
        let uri: string = await contract.uri(tokenId);
        uri = uri.replaceAll("{address}", POOL_CARD_ADDRESS);
        uri = uri.replaceAll("{id}", tokenId.toString());
        let data;
        if (uri.includes("ipfs://")) {
          data = await fetchIpfs(uri);
        } else {
          let res = await axios.get(uri);
          data = res.data;
        }
        resolve(data);
      } catch (error) {
        resolve({ name: "", image: "" });
      }
    });

  const fetchAllMetadata = async (tokenIds: number[]) => {
    let allData = [];
    let promises: Promise<unknown>[] = [];
    tokenIds.forEach((tokenId, i) => {
      let promise = fetch(tokenId);
      promises[i] = promise;
    });
    allData = await Promise.all(promises);
    return allData;
  };

  return { fetchAllMetadata };
};

//   const recursivefn = async (object: any) => {
//     if (typeof object === "object") {
//       for (const key in object) {
//         object[key] = await recursivefn(object[key]);
//       }
//     } else if (typeof object === "string") {
//       if (object.startsWith("ipfs://")) {
//         object = await fetchIpfs(object);
//         object = await recursivefn(object);
//       }
//     }
//     return object;
//   };
