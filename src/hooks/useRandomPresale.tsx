import { awaitTransaction } from "@react-dapp/utils";
import { usePresale } from './useContract'
import { ethers } from "ethers"
import { useState } from "react";

export const useBuyPack = () => {
    const presale = usePresale()
    const [txPending, setTxPending] = useState(false)

    const buyPack = async () => {
        if (!presale) {
            console.log("Unable to find presale contract")
            return
        }
        try {
            setTxPending(true)
            const txResponse = await awaitTransaction(presale.buyPack({
                value: ethers.utils.parseUnits('1000000', 5)  // 1 Bnb
            }))
            setTxPending(false)
            return txResponse
        } catch (error) {
            console.log(error)
            setTxPending(false)
        }
    }
    return { buyPack, txPending }
}