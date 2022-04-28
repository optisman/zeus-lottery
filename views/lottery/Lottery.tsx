import React, { useState, useEffect } from 'react'
import { Box, Button } from 'theme-ui'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import moment from 'moment'
import { useLottery } from 'hooks/useLottery'
import { useLotteryState } from 'state/hooks'
import { fetchLotteryUserDataAsync } from 'state/actions'
import { getBalanceInEther } from 'utils/formatBalance'
import { JoinModal } from './JoinModal'

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

  const zeusTokenBalanceInWallet = Number(userData && userData.tokenBalance ? userData.tokenBalance : 0).toFixed(2)
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
    <LotteryContainer>
      <LotteryContent>
        {/* <LotteryTitle>ZEUS Lottery</LotteryTitle> */}

        {/* lottery general info */}
        <LotteryInfoCards>
          {/* ZEUS balance in wallet */}
          <LotteryInfoCard>
            <CardBgImg src="images/gradient-green.png" />
            <CardTop>
              <CardTitle>Wallet Balance</CardTitle>
              <CardIcon>
                <i className="uil uil-wallet icon"></i>
              </CardIcon>
            </CardTop>
            <CardBottom>{`${zeusTokenBalanceInWallet?.toLocaleString() || 0} ZEUS 💰`}</CardBottom>
          </LotteryInfoCard>

          {/* current lottery id */}
          <LotteryInfoCard>
            <CardBgImg src="images/gradient-green.png" />
            <CardTop>
              <CardTitle>Lottery ID</CardTitle>
              <CardIcon>
                <i className="uil uil-wallet icon"></i>
              </CardIcon>
            </CardTop>
            <CardBottom>{`${currentLotteryId} ⚡️`}</CardBottom>
          </LotteryInfoCard>

          {/* ticket price in current lottery*/}
          <LotteryInfoCard>
            <CardBgImg src="images/gradient-green.png" />
            <CardTop>
              <CardTitle>Ticket Price</CardTitle>
              <CardIcon>
                <i className="uil uil-wallet icon"></i>
              </CardIcon>
            </CardTop>
            <CardBottom>{`${currentLotteryTicketPrice?.toLocaleString() || 0} ZEUS 💰`}</CardBottom>
          </LotteryInfoCard>

          {/* MY OWNED TICKETS */}
          <LotteryInfoCard>
            <CardBgImg src="images/gradient-green.png" />
            <CardTop>
              <CardTitle>MY OWNED TICKETS</CardTitle>
              <CardIcon>
                <i className="uil uil-list-ul icon"></i>
              </CardIcon>
            </CardTop>
            <CardBottom>{`${ticketsFromWallet} TICKETS 🎫`}</CardBottom>
          </LotteryInfoCard>

          {/* total TICKETS sold */}
          <LotteryInfoCard>
            <CardBgImg src="images/gradient-blue.png" />
            <CardTop>
              <CardTitle>Tickets Sold</CardTitle>
              <CardIcon>
                <i className="uil uil-users-alt icon"></i>
              </CardIcon>
            </CardTop>
            <CardBottom>{`${currrentLotteryPlayers.length} / ${currentLotteryMaxTicketCnt} TICKETS 🎫`}</CardBottom>
          </LotteryInfoCard>

          {/* lottery prize pool */}
          <LotteryInfoCard>
            <CardBgImg src="images/gradient-green.png" />
            <CardTop>
              <CardTitle>Lottery Prize Pool</CardTitle>
              <CardIcon>
                <i className="uil uil-trophy icon"></i>
              </CardIcon>
            </CardTop>
            <CardBottom>{`${currentAmountInPrizePool} / ${maxAmountInPrizePool} ZEUS 💰`}</CardBottom>
          </LotteryInfoCard>
        </LotteryInfoCards>

        {/* lottery participants table */}
        {/* {getLotteryStatus[currrentLotteryStatus] === 'Active' && (
          <LotteryParticipantTableContainer>
            <LotteryParticipantTableTop>
              <LotteryParticipantTableTitle>{`Participants [ ${currentLottery?.players.length} / ${currentLottery?.maxTicketCnt} ]`}</LotteryParticipantTableTitle>
              <LotteryParticipantTableAction>
                {!isOwner && account && getLotteryStatus[currrentLotteryStatus] === 'Active' && (
                  <StyledButton
                    disabled={!account || getLotteryStatus[currrentLotteryStatus] !== 'Active'}
                    onClick={onToggleJoinLotteryModal}
                  >
                    {`Join`}
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

                {currentLotteryId !== undefined &&
                  currentLotteryId > 0 &&
                  getLotteryStatus[currrentLotteryStatus] !== 'Active' && <LotteryStatus>Closed</LotteryStatus>}
              </LotteryParticipantTableAction>
            </LotteryParticipantTableTop>
            <LotteryParticipantTableWrapper>
              <LotteryParticipantTable>
                <thead>
                  <tr>
                    <th>S/No</th>
                    <th>Wallet</th>
                    <th>Joined On</th>
                    <th>Status</th>
                    <th>Reward</th>
                  </tr>
                </thead>

                <tbody>
                  {participantsWithWinnerOrder.map((player, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{player.address}</td>
                        <td>{player.joinedTime}</td>
                        <td>
                          <ParticipantStatus isWinner={player.isWinner === 1 ? true : false}>
                            {player.isWinner ? 'Winner' : 'Prticipated'}
                          </ParticipantStatus>
                        </td>
                        <td>{`--`}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </LotteryParticipantTable>
            </LotteryParticipantTableWrapper>
          </LotteryParticipantTableContainer>
        )} */}

        {/* lottery winner table */}
        <LotteryWinnerTableContainer>
          <LotteryWinnerTableTop>
            <LotteryWinnerTableTitle>{`WINNERS [ ${currentLottery?.winners.length} / ${numberOfWinners} ]`}</LotteryWinnerTableTitle>
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
          </LotteryWinnerTableTop>
          {
            <LotteryWinnerTableWrapper>
              <LotteryWinnerTable>
                <thead>
                  <tr>
                    <th>{`RANGKINGS`}</th>
                    <th>{`WINNERS 🏆`}</th>
                    <th>{`PERCENRTAGE`}</th>
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
                      if (index === 3) winnerAddress = `${winnerAddress} 🏅`
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
              </LotteryWinnerTable>
            </LotteryWinnerTableWrapper>
          }
        </LotteryWinnerTableContainer>

        <Box p={3}>
          <Box
            sx={{
              marginTop: 0,
              marginBottom: 90,
            }}
          ></Box>
        </Box>

        {isJoinModalOpened && <JoinModal modalIsOpen={isJoinModalOpened} closeModal={onToggleJoinLotteryModal} />}
      </LotteryContent>
    </LotteryContainer>
  )
}

// container
const LotteryContainer = styled.div`
  padding: 2rem 0;
  background: #1f224a;
  min-height: calc(100vh - 90px);
`

// content
const LotteryContent = styled.div`
  padding: 0 36px;
  max-width: 1200px;
  margin: 0 auto;
`

// title
const LotteryTitle = styled.div`
  font-size: 32px;
  font-family: 'Work Sans', sans-serif;
  font-weight: 600;
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
`

// general info card
const LotteryInfoCards = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 30px;
  margin-bottom: 30px;

  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (min-width: 560px) and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  @media only screen and (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`

const LotteryInfoCard = styled.div`
  background-color: #0c0f38;
  padding: 16px;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  margin-bottom: 16px;
`

const CardBgImg = styled.img`
  position: absolute;
  width: 315px;
  height: 315px;
  right: -155px;
  top: -155px;
  opacity: 0.4;
`

const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`

const CardTitle = styled.div`
  font-family: 'Work Sans', sans-serif;
  color: #8eb7f5;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
`

const CardIcon = styled.div`
  background: #8eb7f5;
  padding: 7px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  margin-right: 12px;
`

const CardBottom = styled.div`
  font-size: 20px;
  color: #fff;
  font-weight: 600;
  font-family: 'Work Sans', sans-serif;
`

// lottery participants table
const LotteryParticipantTableContainer = styled.div``

const LotteryParticipantTableTop = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`

const LotteryParticipantTableTitle = styled.div`
  font-size: 24px;
  color: #fff;
  font-weight: 600;
  margin-top: 10px;
  font-family: 'Work Sans', sans-serif;
`

const LotteryParticipantTableAction = styled.div`
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

const LotteryParticipantTableWrapper = styled.div`
  overflow-y: auto;
  margin: 5px 0 !important;
  max-height: 500px;
`

const LotteryParticipantTable = styled.table`
  width: 100%;
  border: 1px solid #0c0f38;
  border-radius: 8px;
  color: #bebebe;
  text-align: start;

  th,
  tr,
  td {
    padding: 0.75rem 0.5rem;
    text-align: start;
  }

  thead {
    vertical-align: bottom;
    background-color: #2e3c67;
  }

  tbody tr td {
    border-bottom: 1px solid #8eb7f5;
  }
`

const ParticipantStatus = styled.div<{ isWinner?: boolean }>`
  padding: 5px 12px;
  border-radius: 20px;
  color: #fff;
  width: max-content;
  font-weight: 600;
  font-size: 12px;
  background-color: ${({ isWinner }) => (isWinner ? '#219A8B' : '#989A21')};
`

// lottery winner table

// lottery participants table
const LotteryWinnerTableContainer = styled.div``

const LotteryWinnerTableTop = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`

const LotteryWinnerTableTitle = styled.div`
  font-size: 24px;
  color: #fff;
  font-weight: 600;
  margin-top: 10px;
  font-family: 'Work Sans', sans-serif;
`

const LotteryTableAction = styled.div`
  display: flex;
`

const LotteryWinnerTableWrapper = styled.div`
  overflow-y: auto;
  margin: 5px 0 !important;
  max-height: 565px;
`

const LotteryWinnerTable = styled.table`
  width: 100%;
  border: 1px solid #0c0f38;
  border-radius: 8px;
  color: #bebebe;
  text-align: start;

  th,
  tr,
  td {
    padding: 0.75rem 0.5rem;
    text-align: start;
  }

  thead {
    vertical-align: bottom;
    background-color: #2e3c67;
  }

  tbody tr td {
    border-bottom: 1px solid #8eb7f5;
  }
`

const WinnerStatus = styled.div<{ isWinner?: boolean }>`
  padding: 5px 12px;
  border-radius: 20px;
  color: #fff;
  width: max-content;
  font-weight: 600;
  font-size: 12px;
  background-color: ${({ isWinner }) => (isWinner ? '#219A8B' : '#989A21')};
`
export default Lottery
