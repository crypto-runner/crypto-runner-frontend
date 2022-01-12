
import { awaitTransaction } from "@react-dapp/utils";
import {usePresale} from './useContract'
import { ethers } from "ethers"

export const  useBuyPack = () => {

    const preSale = usePresale()

    const buyPack = async () => {
        if (!preSale) {
            console.log("Unable to find presale contract")
            return
        }
        try {
            const txResponse = await awaitTransaction(preSale.buyPack({
                value: ethers.utils.parseUnits('1000000', 5)  // 1 Bnb
            }))
            return txResponse
        } catch (error) {
            console.log(error)
        }
    }
    return {buyPack}
}