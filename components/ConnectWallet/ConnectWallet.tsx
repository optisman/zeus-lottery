import React, { useState } from 'react'
import { Button, Box } from 'theme-ui'
import { useWeb3React } from '@web3-react/core'
import OutsideClickHandler from 'react-outside-click-handler'
import useWalletModal from 'widgets/WalletModal/useWalletModal'
import useAuth from 'hooks/useAuth'

const ConnectWallet = (props) => {
  const { isHeaderBtn } = props
  const { login, logout } = useAuth()
  const { account } = useWeb3React()
  const { onPresentConnectModal } = useWalletModal(login, logout)
  const [walletSelectExpanded, setWalletSelectExpanded] = useState(false)

  const onClickWalletSelect = () => {
    setWalletSelectExpanded(!walletSelectExpanded)
  }

  const onLogout = () => {
    logout()
    setWalletSelectExpanded(false)
  }

  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null

  return (
    <>
      {isHeaderBtn ? (
        <>
          <OutsideClickHandler
            onOutsideClick={(e) => {
              setWalletSelectExpanded(false)
            }}
          >
            <div>
              <Button
                className="add-wallet"
                onClick={() => {
                  if (!account) onPresentConnectModal()
                  if (account) onClickWalletSelect()
                }}
                {...props}
              >
                {account ? (
                  <>{accountEllipsis}</>
                ) : (
                  <>
                    <Box>{'Connect Wallet'}</Box>
                  </>
                )}
              </Button>
            </div>
            {walletSelectExpanded && (
              <div className="wallet-list">
                <div className="wallet-list-item" onClick={() => onLogout()}>
                  <img src="/images/metamask.png" className="wallet-icon" />
                  Logout
                </div>
              </div>
            )}
          </OutsideClickHandler>
        </>
      ) : (
        <Button className="add-wallet" onClick={onPresentConnectModal} {...props}>
          {'Connect Wallet'}
        </Button>
      )}
    </>
  )
}

export { ConnectWallet }
