require("dotenv").config();

export const POOL_CARD_ADDRESS = process.env.REACT_APP_POOL_CARDS_ADDRESS as string;
export const BASE_RELAYER_URL = process.env.REACT_APP_BASE_RELAYER_URL as string;
export const RANDOM_PRESALE_ADDRESS = process.env.REACT_APP_RANDOM_PRESALE_ADDRESS as string;
export const PROJECT_ID = 0;

export const GIFT_CLAIM_API = "https://whitelist-winners-api.herokuapp.com/api/";
export const ZERO_ADDRESS = process.env.REACT_APP_ZERO_ADDRESS as string;
export const LAND_PRESALE_ADDRESS = process.env.REACT_APP_PRESALE_ADDRESS as string;
export const NFT_CLAIM_ADDRESS = process.env.REACT_APP_NFT_CLAIM_ADDRESS as string;
export const NFT_GIFT_CLAIM_ADDRESS = process.env.REACT_APP_NFT_NEW_GIFT_ADDRESS as string;
export const MYSTERY_BOX_ADDRESS = process.env.REACT_APP_MYSTERY_BOX as string;
export const FARM_ADDRESS = process.env.REACT_APP_FARM_ADDRESS as string;
export const CRYPTORUNNER_POINTS_TOKEN = process.env.REACT_APP_CRYPTORUNNER_POINTS_TOKEN as string;