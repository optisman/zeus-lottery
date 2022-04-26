import React, { useState } from 'react'
import { Button, Input } from 'theme-ui'
import Modal from 'react-modal'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { useLotteryState } from 'state/hooks'
import { getBalanceInEther } from 'utils/formatBalance'
import { useLottery } from 'hooks/useLottery'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    width: '100%',
    maxWidth: '500px',
    borderRadius: '10px',
  },
}

const getLotteryStatus = {
  0: 'Not Started',
  1: 'Active',
  2: 'Closed',
}

const JoinModal = (props) => {
  const { modalIsOpen, closeModal } = props

  const [ticketQuantity, setTicketQuantity] = useState(20)
  const [isJoinPending, setIsJoinPending] = useState(false)
  const lotteryState = useLotteryState()
  const { currentLotteryId, currentLottery, userData, owner, maxTicketQuantityPerJoin } = lotteryState
  const { account } = useWeb3React()
  const { onApprove, onEnterLottery } = useLottery()

  const currrentLotteryStatus = currentLottery && currentLottery.status ? currentLottery.status : 0
  const isApproved = userData && userData.allowance && getBalanceInEther(userData.allowance) > 0
  const isOwner = account && account.toLowerCase() === owner?.toLowerCase()

  // set value of ticket quantity
  const onSetTicketQuantity = (e) => {
    const { value } = e.target
    setTicketQuantity(value)
  }

  // get name of "Join/Approve" button
  const getBtnName = () => {
    if (isJoinPending) return 'Pending...'
    return isApproved ? 'Join Lottery' : 'Approve'
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
        await onEnterLottery(lotteryId, ticketQuantity)
      } catch (err) {
        console.log('Joining lottery error:', err)
      }
      setIsJoinPending(false)

      setTicketQuantity(0)

      closeModal()
    }
  }

  return (
    <StyledModalContainer>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
        <LotteryJoinContent>
          <InputContainer>
            <StyledInputWrapper>
              <StyledInputLabel>Ticket Quantity:</StyledInputLabel>
              <StyledInput>
                <Input value={ticketQuantity} onChange={onSetTicketQuantity} />
              </StyledInput>
              <StyledInputInfo>{`Users can buy upto ${maxTicketQuantityPerJoin} tickets per wallet.`}</StyledInputInfo>
            </StyledInputWrapper>
          </InputContainer>
          <ActionContainer>
            {!isOwner && account && getLotteryStatus[currrentLotteryStatus] === 'Active' && (
              <StyledButton
                isApproveBtn={isApproved}
                disabled={isJoinPending || !account || getLotteryStatus[currrentLotteryStatus] !== 'Active'}
                onClick={() => onJoin(currentLotteryId)}
              >
                {getBtnName()}
              </StyledButton>
            )}
          </ActionContainer>
        </LotteryJoinContent>
      </Modal>
    </StyledModalContainer>
  )
}

//
const StyledModalContainer = styled.div``

// content
const LotteryJoinContent = styled.div`
  padding: 0 36px;
  max-width: 500px;
  margin: 0 auto;
  background: #1f224a;
  padding: 20px;
  width: 100%;
`

// input container
const InputContainer = styled.div``

const StyledInputWrapper = styled.div`
  margin-bottom: 20px;
`

const StyledInputLabel = styled.div`
  font-size: 16px;
  color: #fff;
  margin-bottom: 8px;
  font-family: 'Work Sans', sans-serif;
`

const StyledInputInfo = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #ff0000;
  margin-bottom: 8px;
  font-family: 'Work Sans', sans-serif;
`

const StyledInput = styled.div`
  input {
    color: white;
  }
`

// action container
const ActionContainer = styled.div`
  display: flex;
`

const StyledButton = styled(Button)<{ isApproveBtn?: boolean }>`
  background: ${({ isApproveBtn }) =>
    isApproveBtn ? 'linear-gradient(107.61deg, #3282f3 -4.47%, #203f99 103.79%)' : '#E3E9F8'};
  color: ${({ isApproveBtn }) => (isApproveBtn ? '#fff' : '#214099')};
  cursor: pointer;
`

export { JoinModal }
