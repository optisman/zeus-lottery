import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { ConnectWallet } from 'components/ConnectWallet'
import { useLotteryState } from 'state/hooks'

type Props = {}

const Header = (props: Props) => {
  const { account } = useWeb3React()
  const lotteryState = useLotteryState()
  const { owner } = lotteryState
  const isOwner = account && account.toLowerCase() === owner?.toLowerCase()

  return (
    <StyledHeader>
      <StyledHeaderContent>
        <HeaderLeft>
          <HeaderLogo>
            <a href="/">
              <img src="images/logo.png" alt="logo" />
            </a>
            ZEUS Node
          </HeaderLogo>
        </HeaderLeft>
        <HeaderRight>
          <HeaderMenu>
            <a href="/lottery">Lottery</a>
            {isOwner && <a href="/lottery-admin">Lottery Admin</a>}
          </HeaderMenu>
          <HeaderAction>
            <ConnectWallet isHeaderBtn={true} />
          </HeaderAction>
        </HeaderRight>
      </StyledHeaderContent>
    </StyledHeader>
  )
}

const StyledHeader = styled.div`
  padding: 22px 8px;
  boxshadow: 2px 2px 5px rgb(0 0 0 / 20%);
  background: #2e3c67;
`

const StyledHeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 36px;
  max-width: 1200px;
  margin: 0 auto;
`

// left
const HeaderLeft = styled.div`
  display: flex;
`

const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  img {
    width: 64px;
  }
  color: #fff;
  font-size: 18px;
  font-weight: 600;
`

// right
const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`

const HeaderMenu = styled.div`
  margin-left: 50px;
  display: flex;
  align-items: center;
  a {
    color: #fff;
    margin-right: 20px;
    &:hover {
      color: #c4c4c4;
    }
  }
`

const HeaderAction = styled.div`
  height: 48px;
  button {
    height: 100%;
  }
`

export default Header
