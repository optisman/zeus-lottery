import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { ConnectWallet } from 'components/ConnectWallet'
import { useLotteryState } from 'state/hooks'

type Props = {}

const Footer = (props: Props) => {
  const { account } = useWeb3React()
  const lotteryState = useLotteryState()
  const { owner } = lotteryState
  const isOwner = account && account.toLowerCase() === owner?.toLowerCase()

  return (
    <StyledFooter>
      <StyledFooterContent>{`© Copyright 2022 Zeus Finance`}</StyledFooterContent>
    </StyledFooter>
  )
}

const StyledFooter = styled.div`
  padding: 22px 8px;
  boxshadow: 2px 2px 5px rgb(0 0 0 / 20%);
  background: #2e3c67;
`

const StyledFooterContent = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 36px;
  max-width: 1200px;
  margin: 0 auto;
  color: #ffffff;
`

export default Footer
