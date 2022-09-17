import OutsideClickHandler from 'react-outside-click-handler'

type Props = {}

const Sidebar = (props: Props) => {
  return (
    <>
      <OutsideClickHandler
        onOutsideClick={(e) => {
          if (e.target.id === 'uil-bars') return
          // dispatch(updateGlobalData({ isSidebarOpened: !isSidebarOpened }))
        }}
      >
        <input type="checkbox" id="nav-toggle" />

        <div className="sidebar">
          <div className="sidebar-brand">
            <a href="https://zeusfinance.org" target="_blank" className="sidebar-link">
              <img src="/images/zeuslogo2.png" className="sidebar-logo" />
            </a>
          </div>

          <ul className="side-menu">
            <li className="menu-link">
              <a href="https://app.zeusfinance.org" className="menu-content">
                <i className="uil uil-apps"></i>
                <span className="menu-link-text">Dashboard</span>
              </a>
              ``
            </li>

            <li className="menu-link">
              <a href="https://app.zeusfinance.org/nodes" className="menu-content">
                <i className="uil uil-money-stack"></i>
                <span className="menu-link-text">Invest</span>
              </a>
            </li>

            <li className="menu-link active">
              <a href="#" className="menu-content">
                <i className="uil uil-money-withdraw"></i>
                <span className="menu-link-text">Earn</span>
              </a>
            </li>

            <li className="menu-link">
              <a href="https://app.zeusfinance.org/bonding" className="menu-content">
                <i className="uil uil-adjust-circle"></i>
                <span className="menu-link-text">Bond</span>
              </a>
            </li>

            <li className="menu-link">
              <a href="https://lottery.zeusfinance.org" className="menu-content">
                <i className="uil uil-play-circle"></i>
                <span className="menu-link-text">Lottery</span>
              </a>
            </li>

            <li className="menu-link">
              <a href="https://app.zeusfinance.org/calculator" className="menu-content">
                <i className="uil uil-calculator"></i>
                <span className="menu-link-text">Calculator</span>
              </a>
            </li>

            <li className="menu-link">
              <a href="https://app.zeusfinance.org/referrals" className="menu-content">
                <i className="uil uil-user-plus"></i>
                <span className="menu-link-text">Referrals</span>
              </a>
            </li>

            <li className="menu-link">
              <a
                href="https://avascan.info/staking/validator/NodeID-HDSXSkGeei4o1seXZjyD6cKzCFnvY5wuG"
                target="_blank"
                className="menu-content"
              >
                <i className="uil uil-user-check"></i>
                <span className="menu-link-text">Validator</span>
              </a>
            </li>

            <li className="menu-link">
              <a href="https://medium.com/the-olympus-post" target="_blank" className="menu-content">
                <i className="uil uil-newspaper"></i>
                <span className="menu-link-text">Olympus Post</span>
              </a>
            </li>

            <li className="menu-link">
              <a href="https://docs.zeusfinance.org" target="_blank" className="menu-content">
                <i className="uil uil-file-alt"></i>
                <span className="menu-link-text">Documents</span>
              </a>
            </li>
          </ul>
        </div>
      </OutsideClickHandler>
    </>
  )
}

export default Sidebar
