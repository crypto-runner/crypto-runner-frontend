import { useERC1155, useERC721 } from "@react-dapp/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { notify } from "reapop";
import { fetchIpfs } from "src/util";

/**
 * This hook fetches the metadata of an ERC1155 token.
 *
 * @param contractAddress Address of contract
 *
 */

export const useMetadata = (contractAddress: string | undefined, tokenId: string | undefined) => {
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState<any>();
    let contract = useERC721(contractAddress);

    useEffect(() => {
        const fetchMetadata = async () => {
            if (!contract || !contractAddress || !tokenId) return
            setLoading(true)
            try {
                let uri: string = await contract.tokenURI(tokenId);
                console.log('raw uri', uri)
                uri = uri.replaceAll("{address}", contractAddress);
                uri = uri.replaceAll("{id}", tokenId);
                console.log('uri', uri)
                let data;
                if (uri.includes("ipfs://")) {
                    data = await fetchIpfs(uri);
                    setMetadata(data);
                } else {
                    let res = await axios.get(uri);
                    data = res.data;
                    setMetadata(data);
                }
                console.log('metadata', data)
                return
            } catch (error) {
                console.error(error);
                notify({
                    type: 'error',
                    message: "Unable to fetch metadata!",
                });
            }
            setLoading(false)
        }

        fetchMetadata()
    }, [contract, tokenId])

    return { metadata, loading };
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