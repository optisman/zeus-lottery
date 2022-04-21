import React, { useState, useEffect } from 'react'
import { Box, Button, Input } from 'theme-ui'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { useLottery } from 'hooks/useLottery'
import { fetchLotteryUserDataAsync } from 'state/actions'
import { getBalanceInWei } from 'utils/formatBalance'

const LotteryAdmin = () => {
  const dispatch = useDispatch()

  const [isCreationPending, setCreationPending] = useState(false)
  const [ticketPrice, setTicketPrice] = useState(10)
  const [maxTicketCnt, setMaxTicketCnt] = useState(100)

  const { account } = useWeb3React()
  const { onCreateLottery } = useLottery()

  useEffect(() => {
    if (account) {
      dispatch(fetchLotteryUserDataAsync(account))
    }
  }, [account, dispatch])

  // set value of ticket price
  const onSetTicketPrice = (e) => {
    const { value } = e.target
    setTicketPrice(value)
  }

  // set value of max ticket count
  const onSetMaxTicketCnt = (e) => {
    const { value } = e.target
    setMaxTicketCnt(value)
  }

  // create lottery
  const onCreate = async () => {
    if (!account) return

    setCreationPending(true)

    try {
      await onCreateLottery(getBalanceInWei(Number(ticketPrice)), maxTicketCnt)

      setTicketPrice(0)
      setMaxTicketCnt(0)
    } catch (err) {
      console.log('Creating lottery error:', err)
    }
    setCreationPending(false)
  }

  return (
    <LotteryAdminContainer>
      <LotteryAdminContent>
        <InputContainer>
          <StyledInputWrapper>
            <StyledInputLabel>Ticket price:</StyledInputLabel>
            <StyledInput>
              <Input value={ticketPrice} onChange={onSetTicketPrice} />
            </StyledInput>
          </StyledInputWrapper>
          <StyledInputWrapper>
            <StyledInputLabel>Max Ticket Count:</StyledInputLabel>
            <StyledInput>
              <Input value={maxTicketCnt} onChange={onSetMaxTicketCnt} />
            </StyledInput>
          </StyledInputWrapper>
        </InputContainer>
        <ActionContainer>
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
        </ActionContainer>
      </LotteryAdminContent>
    </LotteryAdminContainer>
  )
}

// container
const LotteryAdminContainer = styled.div`
  padding: 2rem 0;
  background: #1f224a;
`

// content
const LotteryAdminContent = styled.div`
  padding: 0 36px;
  max-width: 1200px;
  margin: 0 auto;
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

const StyledInput = styled.div`
  input {
    color: white;
  }
`

// action container
const ActionContainer = styled.div`
  display: flex;
`

export default LotteryAdmin
