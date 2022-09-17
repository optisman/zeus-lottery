import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import moment from 'moment'
import { Box, Button } from 'theme-ui'
import { useLottery } from 'hooks/useLottery'
import { useLotteryState } from 'state/hooks'
import { fetchLotteryUserDataAsync } from 'state/actions'
import { getBalanceInEther } from 'utils/formatBalance'
import { JoinModal } from './JoinModal'
import { ConnectWallet } from 'components/ConnectWallet'
import styled from 'styled-components'

const getLotteryStatus = {
  0: 'Not Started',
  1: 'Active',
  2: 'Closed',
}

const getRankingText = (ranking) => {
  let suffix = 'th Place'
  if (ranking === 1) suffix = 'st Place'
  if (ranking === 2) suffix = 'nd Place'
  if (ranking === 3) suffix = 'rd Place'

  return `${ranking}${suffix}`
}

const getRewardPercentage = (ranking) => {
  if (ranking === 1) return '50.00%'
  if (ranking === 2) return '17.00%'
  if (ranking === 3) return '11.00%'
  if (ranking === 4) return '6.00%'
  if (ranking === 5) return '5.00%'
  if (ranking === 6) return '4.00%'
  if (ranking === 7) return '3.00%'
  if (ranking === 8) return '2.00%'
  if (ranking === 9) return '2.00%'
  if (ranking === 10) return '1 ZEUS NODE'
}

const Lottery = () => {
  const dispatch = useDispatch()

  const [isEndPending, setEndPending] = useState(false)
  const [isClaimPending, setIsClaimPending] = useState(false)
  const [isJoinModalOpened, setIsJoinModalOpened] = useState(false)
  const { account } = useWeb3React()

  const { onEndLottery, onClaimLotteryReward } = useLottery()
  const lotteryState = useLotteryState()
  const { currentLotteryId, currentLottery, userData, owner, maxTicketQuantityPerJoin, numberOfWinners } = lotteryState
  const currrentLotteryPlayers = currentLottery && currentLottery.players ? currentLottery.players : []
  const currrentLotteryWinners = currentLottery && currentLottery.winners ? currentLottery.winners : []
  const currrentLotteryStatus = currentLottery && currentLottery.status ? currentLottery.status : 0
  const currentLotteryTicketPrice = currentLottery && currentLottery.ticketPrice ? currentLottery.ticketPrice : 0
  const currentLotteryMaxTicketCnt = currentLottery && currentLottery.maxTicketCnt ? currentLottery.maxTicketCnt : 0
  const currentLotteryRewardClaimed =
    currentLottery && currentLottery.isRewardClaimed ? currentLottery.isRewardClaimed : false
  const isApproved = userData && userData.allowance && getBalanceInEther(userData.allowance) > 0

  const usdcTokenBalanceInWallet = Number(userData && userData.tokenBalance ? userData.tokenBalance : 0).toFixed(2)
  const currentAmountInPrizePool = (currentLotteryTicketPrice * currrentLotteryPlayers.length * 0.6).toFixed(2)
  const maxAmountInPrizePool = currentLotteryTicketPrice * currentLotteryMaxTicketCnt * 0.6
  const ticketsFromWallet = currrentLotteryPlayers.filter(
    (row) => row.account.toLowerCase() === account?.toLowerCase(),
  ).length
  const isOwner = account && account.toLowerCase() === owner?.toLowerCase()

  const participantsWithWinnerOrder = currrentLotteryPlayers.map((player) => {
    return {
      address: player.account,
      joinedTime: moment
        .utc(Number(player.joinedTimestamp) * 1000)
        .local()
        .format('YYYY-MM-DD HH:mm:ss'),
      isWinner: currrentLotteryWinners.includes(player.ticketId) ? 1 : 0,
    }
  })

  const winnersWithInfo = currrentLotteryWinners.map((winner) => {
    const winnerInfo = currrentLotteryPlayers.find((row) => row.ticketId === winner)
    return {
      ticketId: winner,
      address: winnerInfo?.account,
      joinedTime: moment
        .utc(Number(winnerInfo?.joinedTimestamp) * 1000)
        .local()
        .format('YYYY-MM-DD HH:mm:ss'),
    }
  })
  // .sort((player1, player2) => (player1.isWinner > player2.isWinner ? -1 : 1))

  useEffect(() => {
    if (account) {
      dispatch(fetchLotteryUserDataAsync(account))
    }
  }, [account, dispatch])

  // end lottery
  const onClose = async () => {
    if (isEndPending || !account || getLotteryStatus[currrentLotteryStatus] !== 'Active') return

    setEndPending(true)

    try {
      await onEndLottery(currentLotteryId)
    } catch (err) {
      console.log('Ending lottery error:', err)
    }
    setEndPending(false)
  }

  // distribute rewards
  const onClaim = async () => {
    if (
      currentLotteryRewardClaimed ||
      isClaimPending ||
      !account ||
      getLotteryStatus[currrentLotteryStatus] !== 'Closed'
    )
      return

    setIsClaimPending(true)

    try {
      await onClaimLotteryReward(currentLotteryId)
    } catch (err) {
      console.log('Ending lottery error:', err)
    }
    setIsClaimPending(false)
  }

  const onToggleJoinLotteryModal = () => {
    setIsJoinModalOpened(!isJoinModalOpened)
  }

  return (
    <div className="main-content">
      <div className="url-notice">
        Please ensure you are at the correct url: <i className="uil uil-lock"></i>{' '}
        <span className="url">https://lottery.zeusfinance.org</span>
      </div>
      <div className="top-nav">
        <div className="container">
          <ConnectWallet isHeaderBtn={true} />
          <button className="btn btn-primary menu-toggle-btn">
            <label htmlFor="nav-toggle" className="">
              <i className="uil uil-bars nav-open"></i>
              <i className="uil uil-times nav-close"></i>
            </label>
          </button>
        </div>
      </div>

      <div className="container">
        <div className="page-title dash-title">
          LOTTERY
          <div className="title-underline">
            <img src="/images/undline.png" className="" />
          </div>
        </div>

        <div className="page-section">
          <div className="lottery-cards">
            <div className="lottery-card glass-card">
              <div className="lottery-card-title">Wallet Balance</div>
              <div className="lottery-card-value gold-text">
                {`${usdcTokenBalanceInWallet?.toLocaleString() || 0}`}
                <span className="card-value-currency">USDC</span>
              </div>
            </div>

            <div className="lottery-card glass-card">
              <div className="lottery-card-title">Lottery ID</div>
              <div className="lottery-card-value gold-text">{currentLotteryId}</div>
            </div>

            <div className="lottery-card glass-card">
              <div className="lottery-card-title">Ticket Price</div>
              <div className="lottery-card-value gold-text">
                {`${currentLotteryTicketPrice?.toLocaleString() || 0}`}
                <span className="card-value-currency">USDC</span>
              </div>
            </div>

            <div className="lottery-card glass-card">
              <div className="lottery-card-title">My Owned Tickets</div>
              <div className="lottery-card-value gold-text">{ticketsFromWallet}</div>
            </div>

            <div className="lottery-card glass-card">
              <div className="lottery-card-title">Tickets Sold</div>
              <div className="lottery-card-value gold-text">{`${currrentLotteryPlayers.length} / ${currentLotteryMaxTicketCnt}`}</div>
            </div>

            <div className="lottery-card glass-card">
              <div className="lottery-card-title">Lottery Prize Pool</div>
              <div className="lottery-card-value gold-text">
                {`${currentAmountInPrizePool} / ${maxAmountInPrizePool}`}
                <span className="card-value-currency">{` USDC`}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="page-section"></div>

        <div className="glass-card lottery-winners">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="lottery-winners-card-title">Lottery Winners</div>
            <LotteryTableAction>
              {!isOwner && account && getLotteryStatus[currrentLotteryStatus] === 'Active' && (
                <StyledButton
                  disabled={!account || getLotteryStatus[currrentLotteryStatus] !== 'Active'}
                  onClick={onToggleJoinLotteryModal}
                >
                  {`JOIN LOTTERY`}
                </StyledButton>
              )}

              {isOwner && getLotteryStatus[currrentLotteryStatus] === 'Active' && (
                <StyledButton
                  isApproveBtn={isApproved}
                  disabled={isEndPending || !account || getLotteryStatus[currrentLotteryStatus] !== 'Active'}
                  onClick={onClose}
                >
                  {isEndPending ? 'Pending...' : 'End Lottery'}
                </StyledButton>
              )}

              {isOwner && getLotteryStatus[currrentLotteryStatus] === 'Closed' && (
                <StyledButton
                  disabled={
                    currentLotteryRewardClaimed ||
                    isClaimPending ||
                    !account ||
                    getLotteryStatus[currrentLotteryStatus] !== 'Closed'
                  }
                  onClick={onClaim}
                >
                  {isEndPending ? 'Pending...' : 'Claim reward'}
                </StyledButton>
              )}
              {currentLotteryId !== undefined &&
                currentLotteryId > 0 &&
                getLotteryStatus[currrentLotteryStatus] !== 'Active' && (
                  <LotteryStatus>{`LOTTERY CLOSED 🔐`}</LotteryStatus>
                )}
            </LotteryTableAction>
          </div>
          <div className="lottery-winners-table table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Ranking</th>
                  <th>Winners</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => {
                  const winner = winnersWithInfo[index]
                  let winnerAddress = winner && winner.address ? winner.address : ''
                  if (winnerAddress.length > 0) {
                    if (index === 0) winnerAddress = `${winnerAddress} 🥇`
                    if (index === 1) winnerAddress = `${winnerAddress} 🥈`
                    if (index === 2) winnerAddress = `${winnerAddress} 🥉`
                    if (index >= 3) winnerAddress = `${winnerAddress} 🏅`
                  }

                  return (
                    <tr key={index}>
                      <td>{getRankingText(index + 1)}</td>
                      <td>{winnerAddress}</td>
                      <td>{getRewardPercentage(index + 1)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isJoinModalOpened && <JoinModal modalIsOpen={isJoinModalOpened} closeModal={onToggleJoinLotteryModal} />}

      <div className="footer">
        <div className="container">
          <div className="copyright">Copyright &copy; 2022 Zeus Finance</div>

          <div className="socials">
            <a href="https://twitter.com/ZeusFinanceOrg" target="_blank">
              <i className="uil uil-twitter"></i>
            </a>
            <a href="https://t.me/zeusfinanceorg" target="_blank">
              <i className="uil uil-telegram"></i>
            </a>
            <a href="https://medium.com/the-olympus-post" target="_blank">
              <i className="uil uil-medium-m"></i>
            </a>
            <a href="https://www.youtube.com/channel/UC1rRw5AqlxdgUV2nfWqcyfQ" target="_blank">
              <i className="uil uil-youtube"></i>
            </a>
            <a href="https://discord.gg/ZeusFinance" target="_blank">
              <i className="uil uil-discord"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

const LotteryTableAction = styled.div`
  display: flex;
`

const StyledButton = styled(Button)<{ isApproveBtn?: boolean }>`
  background: ${({ isApproveBtn }) =>
    isApproveBtn ? 'linear-gradient(107.61deg, #3282f3 -4.47%, #203f99 103.79%)' : '#E3E9F8'};
  color: ${({ isApproveBtn }) => (isApproveBtn ? '#fff' : '#214099')};
  margin-left: 20px;
  cursor: pointer;
  height: 40px;
`
const LotteryStatus = styled.div`
  font-size: 24px;
  color: red;
  font-weight: 600;
  font-family: 'Work Sans', sans-serif;
  margin-left: 20px;
`

export default Lottery
