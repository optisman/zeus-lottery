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

const getLotteryStatus = {
  0: 'Not Started',
  1: 'Active',
  2: 'Closed',
}

const Lottery = () => {
  const dispatch = useDispatch()

  const [isEndPending, setEndPending] = useState(false)
  const [isJoinPending, setIsJoinPending] = useState(false)
  const { account } = useWeb3React()

  const { onApprove, onEnterLottery, onEndLottery } = useLottery()
  const lotteryState = useLotteryState()
  const { currentLotteryId, currentLottery, userData, owner } = lotteryState
  const currrentLotteryPlayers = currentLottery && currentLottery.players ? currentLottery.players : []
  const currrentLotteryWinners = currentLottery && currentLottery.winners ? currentLottery.winners : []
  const currrentLotteryStatus = currentLottery && currentLottery.status ? currentLottery.status : 0
  const isApproved = userData && userData.allowance && getBalanceInEther(userData.allowance) > 0

  const isOwner = account && account.toLowerCase() === owner?.toLowerCase()

  const participantsWithWinnerOrder = currrentLotteryPlayers
    .map((player) => {
      return {
        address: player.account,
        joinedTime: moment
          .utc(Number(player.joinedTimestamp) * 1000)
          .local()
          .format('YYYY-MM-DD HH:mm:ss'),
        isWinner: currrentLotteryWinners.includes(player.account) ? 1 : 0,
      }
    })
    .sort((player1, player2) => (player1.isWinner > player2.isWinner ? -1 : 1))

  useEffect(() => {
    if (account) {
      dispatch(fetchLotteryUserDataAsync(account))
    }
  }, [account, dispatch])

  // join lottery
  const onJoin = async (lotteryId) => {
    if (!account) return

    if (!isApproved) {
      setIsJoinPending(true)

      try {
        await onApprove()
      } catch (err) {
        console.log('Approve error:', err)
      }

      setIsJoinPending(false)
    } else {
      setIsJoinPending(true)

      try {
        await onEnterLottery(lotteryId)
      } catch (err) {
        console.log('Joining lottery error:', err)
      }
      setIsJoinPending(false)
    }
  }

  // end lottery
  const onClose = async () => {
    if (!account) return

    setEndPending(true)

    try {
      await onEndLottery(currentLotteryId)
    } catch (err) {
      console.log('Ending lottery error:', err)
    }
    setEndPending(false)
  }

  // get name of "Join/Approve" button
  const getBtnName = () => {
    if (isJoinPending) return 'Pending...'
    return isApproved ? 'Join Lottery' : 'Approve'
  }

  return (
    <LotteryContainer>
      <LotteryContent>
        <LotteryTitle>ZEUS Lottery</LotteryTitle>

        {/* lottery general info */}
        <LotteryInfoCards>
          {/* lottery id */}
          <LotteryInfoCard>
            <CardBgImg src="images/gradient-green.png" />
            <CardTop>
              <CardTitle>Current Lottery ID</CardTitle>
              <CardIcon>
                <i className="uil uil-list-ul icon"></i>
              </CardIcon>
            </CardTop>
            <CardBottom>{currentLotteryId || 0}</CardBottom>
          </LotteryInfoCard>

          {/* lottery participants */}
          <LotteryInfoCard>
            <CardBgImg src="images/gradient-blue.png" />
            <CardTop>
              <CardTitle>Lottery Participants</CardTitle>
              <CardIcon>
                <i className="uil uil-users-alt icon"></i>
              </CardIcon>
            </CardTop>
            <CardBottom>{currrentLotteryPlayers.length}</CardBottom>
          </LotteryInfoCard>

          {/* lottery winners */}
          <LotteryInfoCard>
            <CardBgImg src="images/gradient-pink.png" />
            <CardTop>
              <CardTitle>Lottery Winners</CardTitle>
              <CardIcon>
                <i className="uil uil-trophy icon"></i>
              </CardIcon>
            </CardTop>
            <CardBottom>{currrentLotteryWinners.length}</CardBottom>
          </LotteryInfoCard>
        </LotteryInfoCards>

        {/* lottery participants table */}
        <LotteryParticipantTableContainer>
          <LotteryParticipantTableTop>
            <LotteryParticipantTableTitle>Participants</LotteryParticipantTableTitle>
            <LotteryParticipantTableAction>
              {!isOwner && account && getLotteryStatus[currrentLotteryStatus] === 'Active' && (
                <StyledButton
                  isApproveBtn={isApproved}
                  disabled={isJoinPending || !account || getLotteryStatus[currrentLotteryStatus] !== 'Active'}
                  onClick={() => onJoin(currentLotteryId)}
                >
                  {getBtnName()}
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
        <Box p={3}>
          <Box
            sx={{
              marginTop: 0,
              marginBottom: 90,
            }}
          ></Box>
        </Box>
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
`

const LotteryStatus = styled.div`
  font-size: 24px;
  color: red;
  font-weight: 600;
  margin-top: 10px;
  font-family: 'Work Sans', sans-serif;
`

const LotteryParticipantTableWrapper = styled.div`
  overflow: scroll;
  margin: 5px 0 !important;
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

export default Lottery
