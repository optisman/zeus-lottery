import React, { useState, useEffect } from 'react'
import { Box, Button } from 'theme-ui'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { useLottery } from 'hooks/useLottery'
import { useLotteryState } from 'state/hooks'
import { fetchLotteryUserDataAsync } from 'state/actions'
import { getBalanceInWei, getBalanceInEther } from 'utils/formatBalance'

const getLotteryStatus = {
  0: 'Not Started',
  1: 'Active',
  2: 'Closed',
}

const Lottery = () => {
  const dispatch = useDispatch()

  const [isCreationPending, setCreationPending] = useState(false)
  const [isEndPending, setEndPending] = useState(false)
  const [isJoinPending, setIsJoinPending] = useState(false)
  const { account } = useWeb3React()

  const { onApprove, onCreateLottery, onEnterLottery, onEndLottery } = useLottery()
  const lotteryState = useLotteryState()
  const { currentLotteryId, currentLottery, userData } = lotteryState
  const currrentLotteryPlayers = currentLottery && currentLottery.players ? currentLottery.players : []
  const currrentLotteryWinners = currentLottery && currentLottery.winners ? currentLottery.winners : []
  const currrentLotteryStatus = currentLottery && currentLottery.status ? currentLottery.status : 0
  const isApproved = userData && userData.allowance && getBalanceInEther(userData.allowance) > 0

  useEffect(() => {
    if (account) {
      dispatch(fetchLotteryUserDataAsync(account))
    }
  }, [account, dispatch])

  // create lottery
  const onCreate = async () => {
    if (!account) return

    setCreationPending(true)

    try {
      await onCreateLottery()
    } catch (err) {
      console.log('Creating lottery error:', err)
    }
    setCreationPending(false)
  }

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
        await onEnterLottery(lotteryId, getBalanceInWei(lotteryState.minAmount || 0).toString())
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
    <Box p={3}>
      <Box
        sx={{
          marginTop: 0,
          marginBottom: 90,
        }}
      >
        {/* <AdminActionContainer>
          <Button
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 24px',
              cursor: 'pointer',
              color: 'white',
              height: '48px',
              background: '#1799DE',
              boarderRadius: '50%',
            }}
            disabled={isCreationPending || !account}
            onClick={onCreate}
          >
            {isCreationPending ? 'Pending...' : 'Create Lottery'}
          </Button>
        </AdminActionContainer> */}

        <LotteryContainer>
          <LotteryBox>
            <LotteryInfoSection>
              <LotteryInfoTitle>Current Lottery Info</LotteryInfoTitle>
              <LotteryInfoStatus>
                <LotteryLabel>Lottery Status:</LotteryLabel>
                <span>{getLotteryStatus[currrentLotteryStatus]}</span>
              </LotteryInfoStatus>
              <LotteryInfoId>
                <LotteryLabel>Lottery ID:</LotteryLabel>
                <span>{currentLotteryId || 0}</span>
              </LotteryInfoId>
              <LotteryInfoParticipants>
                <div style={{ display: 'flex' }}>
                  <LotteryLabel>Participants:</LotteryLabel>
                  <div>{currrentLotteryPlayers.length}</div>
                </div>
                <div>
                  {currrentLotteryPlayers.map((player, index) => {
                    return <LotteryPlayer key={index}>{player}</LotteryPlayer>
                  })}
                </div>
              </LotteryInfoParticipants>
              <LotteryInfoWinners>
                {currrentLotteryWinners.map((winner, index) => {
                  return <LotteryWinner key={index}>{winner}</LotteryWinner>
                })}
              </LotteryInfoWinners>
            </LotteryInfoSection>
            <LotteryActionSection>
              <LotteryAction>
                <Button
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 24px',
                    cursor: 'pointer',
                    color: 'white',
                    height: '48px',
                    background: '#1799DE',
                    boarderRadius: '50%',
                  }}
                  disabled={isJoinPending || !account}
                  onClick={() => onJoin(currentLotteryId)}
                >
                  {getBtnName()}
                </Button>
              </LotteryAction>
              <LotteryAction>
                <Button
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 24px',
                    cursor: 'pointer',
                    color: 'white',
                    height: '48px',
                    background: '#1799DE',
                    boarderRadius: '50%',
                  }}
                  disabled={isEndPending || !account}
                  onClick={onClose}
                >
                  {isEndPending ? 'Pending...' : 'End Lottery'}
                </Button>
              </LotteryAction>
            </LotteryActionSection>
          </LotteryBox>
        </LotteryContainer>
      </Box>
    </Box>
  )
}

const AdminActionContainer = styled.div`
  display: flex;
`

const LotteryContainer = styled.div`
  margin-top: 20px;
`

const LotteryBox = styled.div`
  width: 500px;
  // height: 300px;
  background: green;
  padding: 16px;
  border-radius: 8px;
`

// lottery info section
const LotteryInfoSection = styled.div``

const LotteryInfoTitle = styled.div`
  font-size: 32px;
`

const LotteryLabel = styled.div`
  font-weight: bold;
  width: 140px;
`

const LotteryInfoStatus = styled.div`
  display: flex;
`

const LotteryInfoId = styled.div`
  display: flex;
`

// lottery player
const LotteryInfoParticipants = styled.div``

const LotteryPlayer = styled.div``

// lottery winner
const LotteryInfoWinners = styled.div`
  display: flex;
`

const LotteryWinner = styled.div``

// lottery action section
const LotteryActionSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`

const LotteryAction = styled.div``

export default Lottery
