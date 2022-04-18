import styled from 'styled-components'
import { ConnectWallet } from 'components/ConnectWallet'

type Props = {}

const Header = (props: Props) => {
  return (
    <StyledHeader>
      <HeaderLeft>
        <StyledLogo>
          <a href="/">
            <img src="images/logo.png" alt="logo" />
          </a>
        </StyledLogo>
        <HeaderMenu>
          <a href="/lottery">Lottery</a>
          <a href="/lottery-admin">Lottery Admin</a>
        </HeaderMenu>
      </HeaderLeft>
      <ConnectWallet isHeaderBtn={true} />
    </StyledHeader>
  )
}

const HeaderLeft = styled.div`
  display: flex;
`

const StyledLogo = styled.div`
  height: 100%;
  img {
    height: 100%;
  }
`

const HeaderMenu = styled.div`
  margin-left: 50px;
  display: flex;
  align-items: center;
  a {
    margin-left: 30px;
  }
`

const StyledHeader = styled.div`
  padding: 8px;
  height: 56px;
  display: flex;
  justify-content: space-between;
  boxshadow: 2px 2px 5px rgb(0 0 0 / 20%);
  background: #2e3c67;
`

export default Header
