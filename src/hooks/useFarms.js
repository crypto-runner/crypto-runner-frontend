import { toLowerUnit, useERC20Approval, useInputValue } from '@react-dapp/utils'
import { usePools, useDeposit, useWithdraw, useHarvest } from "@nftvillage/farms-sdk"
import { PROJECT_ID, FARM_ADDRESS, ZERO_ADDRESS } from "src/config/config"
import { useEffect } from 'react';
import useNotify from "./useNotify"

export const useFarm = (poolId) => {
    const { pools, loading, reload } = usePools()
    const pool = pools.find(e => e.poolId === poolId)
    const { notifyError: showError } = useNotify()

    // useEffect(() => {
    //     setInterval(() => reload(), 5000)
    // }, [])

    const deposit = useDeposit()
    const withdraw = useWithdraw()
    const harvest = useHarvest()
    const stakeTokenApproval = useERC20Approval(pool?.stakedToken, FARM_ADDRESS)

    const depositAmount = useInputValue(pool?.stakedTokenDetails?.balance.toFixed(), pool?.stakedTokenDetails?.decimals)
    const withdrawAmount = useInputValue(pool?.stakedAmount.toFixed(), pool?.stakedTokenDetails?.decimals)

    const handleDeposit = async () => {
        if (depositAmount.error) {
            showError(depositAmount.error)
            return
        }

        const response = await deposit.deposit({
            projectId: PROJECT_ID, poolId: poolId, amount: depositAmount.getValue(), depositFeeCards: [], harvestCards: [], multiplierCards: [], withdrawFeeCards: [], referrer: ZERO_ADDRESS
        })
        if (!response.status) showError(response.error)
        else {
            depositAmount.setValue('0')
            reload()
        }
    }

    const handleWithdraw = async () => {
        if (withdrawAmount.error) {
            showError(withdrawAmount.error)
            return
        }

        const response = await withdraw.withdraw({
            projectId: PROJECT_ID, poolId: poolId, amount: withdrawAmount.getValue()
        })
        if (!response.status) showError(response.error)
        else {
            withdrawAmount.setValue('0')
            reload()
        }
    }

    const handleHarvest = async () => {
        const response = await harvest.harvest({
            projectId: PROJECT_ID, poolId: poolId
        })
        if (!response.status) showError(response.error)
        else {
            reload()
        }
    }

    // console.log(pool)

    return pool && {
        stakeTokenApproved: (stakeTokenApproval.isApproved || pool.stakeTokenApproved),
        poolCardsApproved: pool.poolCardsApproved,
        liquidity: pool.stats?.liquidity.toFormat(0),
        totalStaked: toLowerUnit(pool.stakedAmount.toFixed(), pool.stakedTokenDetails?.decimals).toFormat(2),
        stakedAmount: toLowerUnit(pool.userInfo.amount.toFixed(), pool.stakedTokenDetails?.decimals).toFormat(2),
        stakedTokenSymbol: pool.stakedTokenDetails?.symbol,
        stakedTokenBalance: toLowerUnit(pool.stakedTokenDetails?.balance.toFixed(), pool.stakedTokenDetails?.decimals).toFormat(2),
        rewards: pool.rewardInfo.map((e, i) => {
            return {
                apy: pool.stats?.apy[i]?.toFixed(0),
                rewardTokenSymbol: e.details?.symbol,
                rewards: toLowerUnit(e.rewards.toFixed(), e.details?.decimals).toFormat(4)
            }
        }),
        loading,
        approval: { approve: stakeTokenApproval?.approve, approvePending: stakeTokenApproval?.txPending },
        depositInfo: {
            input: depositAmount,
            deposit: handleDeposit,
            pending: deposit.txPending
        },
        withdrawInfo: {
            input: withdrawAmount,
            withdraw: handleWithdraw,
            pending: withdraw.txPending
        },
        harvestInfo: {
            harvest: handleHarvest,
            pending: harvest.txPending
        }
    }
}