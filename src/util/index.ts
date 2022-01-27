import axios from "axios";

/**
   * Fetch IPFS data
   *
   * @param ipfsUrl IPFS url of the metadata
   * @returns json object of the metadata
   */
export const fetchIpfs = (ipfsUrl: string) =>
    new Promise(async (resolve) => {
        let url = `https://ipfs.io/${ipfsUrl.replace("ipfs://", "")}`;
        let { data } = await axios.get(url);
        if (data?.image?.includes("ipfs://")) {
            data.image = `https://ipfs.io/${data.image.replace(
                "ipfs://",
                ""
            )}`;
        }
        resolve(data);
    });