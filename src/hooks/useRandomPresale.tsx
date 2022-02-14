import { awaitTransaction, toBigNumber, useEthers, useReload } from "@react-dapp/utils";
import { usePresale } from './useContract'
import { ethers } from "ethers"
import { useEffect, useState } from "react";
import useNotify from "./useNotify";

export const useBuyPack = () => {
    const presale = usePresale()
    const { account } = useEthers()
    const [txPending, setTxPending] = useState(false)
    const [soldOut, setSoldOut] = useState(false);
    const [enabled, setEnabled] = useState(true);
    const { reload, reloadable } = useReload()
    const { notifyError } = useNotify()

    useEffect(() => {
        const init = async () => {
            if (!presale || !account) return

            setSoldOut(toBigNumber((await presale.sellCount())).gte(1000))
            setEnabled(await presale.enabled())
        }
        init()
    }, [presale, account, reloadable]);


    const buyPack = async () => {
        if (!presale) {
            console.log("Unable to find presale contract")
            return
        }
        setTxPending(true)
        const txResponse = await awaitTransaction(presale.buyPack({
            value: ethers.utils.parseEther("0.001")  // 1 Bnb
        }))
        reload()
        setTxPending(false)
        console.log(txResponse.error);
        if (!txResponse.status) notifyError(txResponse.error)
        return txResponse
    }
    return { buyPack, soldOut, enabled, txPending }
}