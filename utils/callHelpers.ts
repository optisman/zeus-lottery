import { ethers } from 'ethers'

export const approveToken = async (tokenContract, LotteryContract, account) => {
    return tokenContract.methods
        .approve(LotteryContract.options.address, ethers.constants.MaxUint256)
        .send({ from: account })
}

export const createLottery = async (LotteryContract, account, ticketPrice, maxTicketCnt) => {
    return LotteryContract.methods
        .createLottery(ticketPrice, maxTicketCnt)
        .send({ from: account })
        .on('transactionHash', (tx) => {
            return tx.transactionHash
        })
}

export const enterLottery = async (LotteryContract, lotteryId, ticketQuantity, account) => {
    return LotteryContract.methods
        .enterLottery(lotteryId, ticketQuantity)
        .send({ from: account })
        .on('transactionHash', (tx) => {
            return tx.transactionHash
        })
}

export const endLottery = async (LotteryContract, lotteryId, account) => {
    return LotteryContract.methods
        .endLottery(lotteryId)
        .send({ from: account })
        .on('transactionHash', (tx) => {
            return tx.transactionHash
        })
}

export const distributeReward = async (LotteryContract, lotteryId, account) => {
    return LotteryContract.methods
        .distributeWinnerReward(lotteryId)
        .send({ from: account })
        .on('transactionHash', (tx) => {
            return tx.transactionHash
        })
}
