"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[224],{76626:function(e,t,n){n.d(t,{h:function(){return O}});var a=n(53918),i=n(59499),u=n(67294),r=n(17042),s=n(69795),p=n(34271),o=n(50029),y=n(87794),l=n.n(y),d=n(30950),c=n(83929),m=n(47620),f=n(69558),b=n(22476),w=function(){var e=(0,o.Z)(l().mark((function e(){var t,n;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t=window.ethereum)){e.next=27;break}if(43113!==(n=parseInt("43114",10))){e.next=14;break}return e.prev=4,e.next=7,t.request({method:"wallet_addEthereumChain",params:[{chainId:"0xA869",chainName:"Avalanche Testnet",nativeCurrency:{name:"Avalanche testnet",symbol:"AVAX",decimals:18},rpcUrls:b.tc,blockExplorerUrls:["https://testnet.snowtrace.io"]}]});case 7:case 18:return e.abrupt("return",!0);case 10:return e.prev=10,e.t0=e.catch(4),console.error(e.t0),e.abrupt("return",!1);case 14:if(43114!==n){e.next=25;break}return e.prev=15,e.next=18,t.request({method:"wallet_addEthereumChain",params:[{chainId:"0xA86A",chainName:"Avalanche Mainnet",nativeCurrency:{name:"Avalanche mainnet",symbol:"AVAX",decimals:18},rpcUrls:b.j$,blockExplorerUrls:["https://snowtrace.io"]}]});case 21:return e.prev=21,e.t1=e.catch(15),console.error(e.t1),e.abrupt("return",!1);case 25:e.next=29;break;case 27:return console.error("Can't setup the Avalanche network on metamask because window.ethereum is undefined"),e.abrupt("return",!1);case 29:case"end":return e.stop()}}),e,null,[[4,10],[15,21]])})));return function(){return e.apply(this,arguments)}}(),T=n(27558),v=function(){var e=(0,T.T)(),t=(0,s.Ge)(),n=t.activate,a=t.deactivate,i=(0,u.useCallback)((function(e){var t=f.B[e];t?n(t,function(){var e=(0,o.Z)(l().mark((function e(a){return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(a instanceof s.Uu)){e.next=7;break}return e.next=3,w();case 3:e.sent&&n(t),e.next=9;break;case 7:window.localStorage.removeItem(m.OM),a instanceof d.A5?console.log("Provider Error","No provider was found"):a instanceof d.ab||a instanceof c.ab?(t instanceof c.zw&&(t.walletConnectProvider=void 0),console.log("Authorization Error","Please authorize to access your account")):console.log(a.name,a.message);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()):console.log("Can't find connector","The connector config is wrong")}),[]);return{login:i,logout:(0,u.useCallback)((function(){a()}),[a,e])}},h=n(85893);function x(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function g(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?x(Object(n),!0).forEach((function(t){(0,i.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):x(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var M=function(e){var t=e.isHeaderBtn,n=v(),a=n.login,i=n.logout,u=(0,s.Ge)().account,o=(0,p.Z)(a,i).onPresentConnectModal,y=u?"".concat(u.substring(0,4),"...").concat(u.substring(u.length-4)):null;return(0,h.jsx)(h.Fragment,{children:t?(0,h.jsx)(r.zx,g(g({sx:{background:"#1799DE",borderRadius:"50px",padding:"0px 24px",cursor:"pointer"},onClick:function(){u||o()}},e),{},{children:u?(0,h.jsx)(h.Fragment,{children:y}):(0,h.jsx)(h.Fragment,{children:(0,h.jsx)(r.xu,{children:"Connect Wallet"})})})):(0,h.jsx)(r.zx,g(g({sx:{background:"#1799DE",borderRadius:"50px",padding:"0px 48.5px",cursor:"pointer"},onClick:o},e),{},{children:"Connect Wallet"}))})},k=a.ZP.div.withConfig({displayName:"Header__StyledHeader",componentId:"sc-16ouk9e-0"})(["padding:22px 8px;boxshadow:2px 2px 5px rgb(0 0 0 / 20%);background:#2e3c67;"]),C=a.ZP.div.withConfig({displayName:"Header__StyledHeaderContent",componentId:"sc-16ouk9e-1"})(["display:flex;justify-content:space-between;width:100%;padding:0 36px;max-width:1200px;margin:0 auto;"]),R=a.ZP.div.withConfig({displayName:"Header__HeaderLeft",componentId:"sc-16ouk9e-2"})(["display:flex;"]),P=a.ZP.div.withConfig({displayName:"Header__HeaderLogo",componentId:"sc-16ouk9e-3"})(["display:flex;align-items:center;height:100%;img{width:64px;}color:#fff;font-size:18px;font-weight:600;"]),A=a.ZP.div.withConfig({displayName:"Header__HeaderRight",componentId:"sc-16ouk9e-4"})(["display:flex;align-items:center;"]),j=a.ZP.div.withConfig({displayName:"Header__HeaderMenu",componentId:"sc-16ouk9e-5"})(["margin-left:50px;display:flex;align-items:center;a{color:#fff;margin-right:20px;&:hover{color:#c4c4c4;}}"]),N=a.ZP.div.withConfig({displayName:"Header__HeaderAction",componentId:"sc-16ouk9e-6"})(["height:48px;button{height:100%;}"]),O=function(e){return(0,h.jsx)(k,{children:(0,h.jsxs)(C,{children:[(0,h.jsx)(R,{children:(0,h.jsxs)(P,{children:[(0,h.jsx)("a",{href:"/",children:(0,h.jsx)("img",{src:"images/logo.png",alt:"logo"})}),"ZEUS Node"]})}),(0,h.jsxs)(A,{children:[(0,h.jsxs)(j,{children:[(0,h.jsx)("a",{href:"/lottery",children:"Lottery"}),(0,h.jsx)("a",{href:"/lottery-admin",children:"Lottery Admin"})]}),(0,h.jsx)(N,{children:(0,h.jsx)(M,{isHeaderBtn:!0})})]})]})})}},77837:function(e,t,n){n.d(t,{Q:function(){return k}});var a=n(50029),i=n(87794),u=n.n(i),r=n(67294),s=n(69795),p=n(25617),o=n(3283),y=n.n(o),l=n(96032),d=function(){var e=(0,s.Ge)().library,t=(0,r.useRef)(e),n=(0,r.useState)(e?new(y())(e):(0,l.lt)()),a=n[0],i=n[1];return(0,r.useEffect)((function(){e!==t.current&&(i(e?new(y())(e):(0,l.lt)()),t.current=e)}),[e]),a},c=n(27302),m=(n(26181),n(18995)),f=JSON.parse('[{"inputs":[{"internalType":"address[]","name":"payees","type":"address[]"},{"internalType":"uint256[]","name":"shares","type":"uint256[]"},{"internalType":"address[]","name":"addresses","type":"address[]"},{"internalType":"uint256[]","name":"balances","type":"uint256[]"},{"internalType":"uint256[]","name":"fees","type":"uint256[]"},{"internalType":"uint256","name":"swapAmount","type":"uint256"},{"internalType":"address","name":"uniV2Router","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract IERC20","name":"token","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ERC20PaymentReleased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newLiquidityWallet","type":"address"},{"indexed":true,"internalType":"address","name":"oldLiquidityWallet","type":"address"}],"name":"LiquidityWalletUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"}],"name":"PayeeAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"PaymentReceived","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"PaymentReleased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"pair","type":"address"},{"indexed":true,"internalType":"bool","name":"value","type":"bool"}],"name":"SetAutomatedMarketMakerPair","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokensSwapped","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ethReceived","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensIntoLiqudity","type":"uint256"}],"name":"SwapAndLiquify","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newAddress","type":"address"},{"indexed":true,"internalType":"address","name":"oldAddress","type":"address"}],"name":"UpdateUniswapV2Router","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_isBlacklisted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"automatedMarketMakerPairs","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"bool","name":"value","type":"bool"}],"name":"blacklistMalicious","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"boostReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"cashoutAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"cashoutFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"blocktime","type":"uint256"}],"name":"cashoutReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"newMode","type":"bool"}],"name":"changeAutoDistri","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newTime","type":"uint256"}],"name":"changeClaimTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newGasDistri","type":"uint256"}],"name":"changeGasDistri","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newNodePrice","type":"uint256"}],"name":"changeNodePrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"changeRewardPerNode","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"newVal","type":"bool"}],"name":"changeSwapLiquify","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"createNodeWithTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deadWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"distributeRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"distributionPool","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"futurFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"futurUsePool","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAutoDistri","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getClaimTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDistriCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getGasDistri","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getNodeNumberOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNodePrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNodesCreatime","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNodesLastClaims","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNodesNames","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNodesRewards","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRewardAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getRewardAmountOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRewardPerNode","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalCreatedNodes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalStakedReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"liquidityPoolFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nodeRewardManager","outputs":[{"internalType":"contract NODERewardManagement","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"payee","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"publiDistriRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"account","type":"address"}],"name":"release","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"address","name":"account","type":"address"}],"name":"release","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"address","name":"account","type":"address"}],"name":"released","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"released","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardsFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pair","type":"address"},{"internalType":"bool","name":"value","type":"bool"}],"name":"setAutomatedMarketMakerPair","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"nodeManagement","type":"address"}],"name":"setNodeManagement","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"shares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"swapTokensAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"}],"name":"totalReleased","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalReleased","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uniswapV2Pair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniswapV2Router","outputs":[{"internalType":"contract IJoeRouter02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"updateCashoutFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"updateFuturFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"wall","type":"address"}],"name":"updateFuturWall","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"updateLiquiditFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"updateRewardsFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"wall","type":"address"}],"name":"updateRewardsWall","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"updateRwSwapFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newVal","type":"uint256"}],"name":"updateSwapTokensAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAddress","type":"address"}],"name":"updateUniswapV2Router","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]'),b=function(e,t,n){var a=d(),i=(0,r.useState)(new a.eth.Contract(e,t,n)),u=i[0],s=i[1];return(0,r.useEffect)((function(){s(new a.eth.Contract(e,t,n))}),[e,t,n,a]),u},w=n(79839),T=n(21046),v=function(){var e=(0,a.Z)(u().mark((function e(t,n,a){return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.methods.approve(n.options.address,T.Bz).send({from:a}));case 1:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),h=function(){var e=(0,a.Z)(u().mark((function e(t,n,a,i){return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.methods.createLottery(a,i).send({from:n}).on("transactionHash",(function(e){return e.transactionHash})));case 1:case"end":return e.stop()}}),e)})));return function(t,n,a,i){return e.apply(this,arguments)}}(),x=function(){var e=(0,a.Z)(u().mark((function e(t,n,a,i){return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.methods.enterLottery(n,a).send({from:i}).on("transactionHash",(function(e){return e.transactionHash})));case 1:case"end":return e.stop()}}),e)})));return function(t,n,a,i){return e.apply(this,arguments)}}(),g=function(){var e=(0,a.Z)(u().mark((function e(t,n,a){return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.methods.endLottery(n).send({from:a}).on("transactionHash",(function(e){return e.transactionHash})));case 1:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),M=function(){var e=(0,a.Z)(u().mark((function e(t,n,a){return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.methods.claimReward(n).send({from:a}).on("transactionHash",(function(e){return e.transactionHash})));case 1:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),k=function(){var e=(0,p.I0)(),t=(0,s.Ge)().account,n=b(m,(0,c.tj)()),i=b(f,(0,c.ej)()),o=(0,r.useCallback)((0,a.Z)(u().mark((function a(){var r;return u().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,v(i,n,t);case 2:r=a.sent,e((0,w.i7)(t)),e((0,w.RS)()),console.info(r);case 6:case"end":return a.stop()}}),a)}))),[t,e,n]),y=(0,r.useCallback)(function(){var i=(0,a.Z)(u().mark((function a(i,r){var s;return u().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,h(n,t,i,r);case 2:s=a.sent,e((0,w.i7)(t)),e((0,w.RS)()),console.info(s);case 6:case"end":return a.stop()}}),a)})));return function(e,t){return i.apply(this,arguments)}}(),[t,e,n]),l=(0,r.useCallback)(function(){var i=(0,a.Z)(u().mark((function a(i,r){var s;return u().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,x(n,i,r,t);case 2:s=a.sent,e((0,w.i7)(t)),e((0,w.RS)()),console.info(s);case 6:case"end":return a.stop()}}),a)})));return function(e,t){return i.apply(this,arguments)}}(),[t,e,n]),d=(0,r.useCallback)(function(){var i=(0,a.Z)(u().mark((function a(i){var r;return u().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,g(n,i,t);case 2:r=a.sent,e((0,w.i7)(t)),e((0,w.RS)()),console.info(r);case 6:case"end":return a.stop()}}),a)})));return function(e){return i.apply(this,arguments)}}(),[t,e,n]),T=(0,r.useCallback)(function(){var i=(0,a.Z)(u().mark((function a(i){var r;return u().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,M(n,i,t);case 2:r=a.sent,e((0,w.i7)(t)),e((0,w.RS)()),console.info(r);case 6:case"end":return a.stop()}}),a)})));return function(e){return i.apply(this,arguments)}}(),[t,e,n]);return{onApprove:o,onCreateLottery:y,onEnterLottery:l,onEndLottery:d,onClaimLotteryReward:T}}},79839:function(e,t,n){n.d(t,{i7:function(){return a.i7},RS:function(){return a.RS}});var a=n(90015)},79613:function(e,t,n){n.d(t,{J:function(){return r},y:function(){return s}});var a=n(67294),i=n(25617),u=n(79839),r=function(){var e=(0,i.I0)();(0,a.useEffect)((function(){e((0,u.RS)())}),[e])},s=function(){return(0,i.v9)((function(e){return e.lottery}))}}}]);