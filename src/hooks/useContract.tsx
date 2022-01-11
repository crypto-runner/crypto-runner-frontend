import { useContract } from "@react-dapp/utils"
import { RANDOM_PRESALE_ADDRESS } from "../config/config";
import RANDOM_PRESALE_ABI from '../assets/abi/random_Presale.json';

export const usePresale = () => {
    return useContract(RANDOM_PRESALE_ABI, RANDOM_PRESALE_ADDRESS)
}