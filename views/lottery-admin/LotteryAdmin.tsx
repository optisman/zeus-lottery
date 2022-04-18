import React, { useState, useEffect } from 'react'
import { Box, Button } from 'theme-ui'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { useLottery } from 'hooks/useLottery'
import { fetchLotteryUserDataAsync } from 'state/actions'

const LotteryAdmin = () => {
  const dispatch = useDispatch()

  const [isCreationPending, setCreationPending] = useState(false)
  const { account } = useWeb3React()

  const { onCreateLottery } = useLottery()

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

  return (
    <Box p={3}>
      <Box
        sx={{
          marginTop: 0,
          marginBottom: 90,
        }}
      >
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
      </Box>
    </Box>
  )
}

const ActionContainer = styled.div`
  display: flex;
`

export default LotteryAdmin
