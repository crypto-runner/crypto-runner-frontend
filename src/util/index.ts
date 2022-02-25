import axios from "axios";
import CommonPng from "src/assets/icons/common.png";
import RarePng from "src/assets/icons/rare.png";
import SuperRarePng from "src/assets/icons/superrare.png";
import EpicPng from "src/assets/icons/epic.png";
import LegendaryPng from "src/assets/icons/legendary.png";

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
      data.image = `https://ipfs.io/${data.image.replace("ipfs://", "")}`;
    }
    resolve(data);
  });

export const getPoolRarity = (poolId: number) => {
  switch (poolId) {
    case 0:
      return {
        rarity: "Common",
        rarityIcon: CommonPng,
      };
    case 1:
      return {
        rarity: "Rare",
        rarityIcon: RarePng,
      };
    case 2:
      return {
        rarity: "Super Rare",
        rarityIcon: SuperRarePng,
      };
    case 3:
      return {
        rarity: "Epic",
        rarityIcon: EpicPng,
      };
    case 4:
      return {
        rarity: "Legendary",
        rarityIcon: LegendaryPng,
      };
    default:
      return {
        rarity: "Common",
        rarityIcon: CommonPng,
      };
  }
};
