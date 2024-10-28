<template>
  <div class="header-pages">
    <div class="china-logo" @click="handleChangeChain()">
      <img
        v-if="chainId == '56' || !chainId"
        v-lazy="getAssetsImageUrl('/bnb.png')"
        alt=""
      />
      <img
        v-if="chainId == '1'"
        v-lazy="getAssetsImageUrl('/eth.png')"
        alt=""
      />
      <img
        v-lazy="getAssetsImageUrl('/downarrow.png')"
        class="wall-arrow"
        alt=""
      />
    </div>
    <div class="heards-right">
      <van-button
        v-if="!isConnected"
        class="wall-connect"
        type="warning"
        @click="handleSignUp('0')"
        >Connect</van-button
      >
      <div
        v-if="isConnected"
        class="wall-connect-text"
        type="warning"
        @click="handleOpen()"
      >
        <span class="text">{{ truncateString(address) }}</span>
        <span class="wall-img">
          <img
            v-lazy="getAssetsImageUrl('/usdt.png')"
            class="wall-icon"
            alt=""
          />
          <img
            v-lazy="getAssetsImageUrl('/downarrow.png')"
            class="wall-arrow"
            alt=""
          />
        </span>
      </div>
      <div class="language">
        <img v-lazy="getAssetsImageUrl('/language.png')" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  useDisconnect,
  useSwitchNetwork,
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider
} from "@web3modal/ethers/vue";
import {
  BrowserProvider,
  Contract,
  formatEther,
  formatUnits,
  parseEther
} from "ethers";
import { onMounted, reactive, toRef, watch, nextTick } from "vue";
import BigNumber from "bignumber.js";
import erc20Abi from "@/assets/abi/erc20.abi.json";
import { getAssetsImageUrl, truncateString } from "@/utils/index.utils.js";
const isLoading = toRef(false);
const baseInfo = reactive({
  userBalance: "0.00",
  signInfo: "",
  loginType: "0",
  usdtBalance: ""
});
const { disconnect } = useDisconnect();
const { switchNetwork } = useSwitchNetwork();
const { walletProvider } = useWeb3ModalProvider();
const { address, chainId, isConnected } = useWeb3ModalAccount();
const modal = useWeb3Modal();

// 登录唤起授权签名
const handleSignUp = function (type) {
  baseInfo.loginType = type;
  modal.open({ view: "Connect" });
};
const handleOpen = () => {
  modal.open();
};
// 切换 链
const handleChangeChain = async function (chainId) {
  if (chainId != null) {
    await switchNetwork(chainId);
    return false;
  }
  await modal.open({ view: "Networks" });
  return true;
};

// 签名信息
async function onSignMessage() {
  const provider = new BrowserProvider(walletProvider.value);
  const signer = await provider.getSigner();
  return await signer?.signMessage("Hello AppKit Ethers");
}
//  查询授权 列表
const handleAuthTransaction = function () {
  modal.open({ view: "ApproveTransaction" });
};
// 签名
const handleSignMessage = function () {
  if (isLoading.value) {
    return;
  }
  isLoading.value = true;
  onSignMessage()
    .then(value => {
      baseInfo.signInfo = value?.toString();
      isLoading.value = false;
    })
    .catch(() => {
      isLoading.value = false;
    });
};
// 转账
const handleTransfer = async function () {
  if (isLoading.value) {
    return;
  }
  isLoading.value = true;
  const provider = new BrowserProvider(walletProvider.value);
  const signer = await provider.getSigner();
  signer
    ?.sendTransaction({
      to: "0x49c17e58D3Fe208005dAA0eeD604c663A282EFF9",
      value: parseEther("0.001")
    })
    .then(value => {
      console.log("value", value);
      isLoading.value = false;
    })
    .catch(() => {
      isLoading.value = false;
    });
};
// 断开链接
const loginOut = function () {
  disconnect();
};
const getAddressBalance = async function () {
  try {
    if (!address) throw "Account not found.";
    const provider = new BrowserProvider(walletProvider.value);
    const balance = await provider.getBalance(address.value);
    baseInfo.userBalance = new BigNumber(formatEther(balance))
      .dividedBy(new BigNumber(10).exponentiatedBy(18))
      .toString();
  } catch (e) {
    console.log("error", JSON.stringify(e));
  }
};
async function getBNAuth() {
  try {
    if (!address) throw "Account not found.";
    if (chainId.value != 56) {
      await handleChangeChain(56);
    }
    const bnUsdt = "0x55d398326f99059ff775485246999027b3197955";
    const provider = new BrowserProvider(walletProvider.value);
    const tokenContract = new Contract(bnUsdt, erc20Abi, provider);
    const signer = await provider.getSigner();
    const dai = 0.01;
    const allowAmt = await tokenContract.allowance(
      address.value,
      tokenContract
    );
    const decimals = await tokenContract.decimals();
    const amount = new BigNumber(dai)
      .multipliedBy(new BigNumber(10).exponentiatedBy(new BigNumber(decimals)))
      .toString();
    // 先获取代币 精度
    if (
      parseFloat(formatUnits(allowAmt, decimals)) <= parseInt(String(dai), 10)
    ) {
      let singeContractConnect = tokenContract.connect(signer);
      //@ts-ignore
      const tx = await singeContractConnect.approve(address.value, amount);
      await tx.wait();
    }
    const singeContractConnect = tokenContract.connect(signer);
    //@ts-ignore
    const tx = await singeContractConnect.transfer(
      amount,
      "0x49c17e58D3Fe208005dAA0eeD604c663A282EFF9"
    );
    await tx.wait();
  } catch (e) {
    console.log("error", JSON.stringify(e));
  }
}

watch(address, (newValue, oldValue) => {
  if (newValue !== oldValue && newValue) {
    if (baseInfo.loginType === "1") {
      handleSignMessage();
    }
    if (baseInfo.loginType === "2") {
      handleTransfer();
    }
    if (baseInfo.loginType === "3") {
      getBNAuth();
    }
    getAddressBalance();
  }
});
const initAccount = async function () {
  try {
    if (!address.value) {
      modal.open({ view: "Connect" }).then(value => {
        console.log(document.getElementsByTagName("w3m-modal"));
        setTimeout(() => {}, 1000);
      });

      // if (!isConnected) {
      // await provider.ge
      // };
      // const ethersProvider = new BrowserProvider(walletProvider.value);
      // const result = await ethersProvider.connect();
      // console.log("result", result);
    }
  } catch (err) {
    console.log("error", JSON.stringify(err));
  }
};
onMounted(() => {
  // initAccount();
});
</script>

<style lang="scss" scoped>
.header-pages {
  padding: 0.72rem 1.14rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .china-logo {
    display: flex;
    align-items: center;
    .wall-arrow {
      margin-left: 0.43rem;
      width: 1.14rem;
      height: 1.14rem;
    }
    > img {
      width: 1.86rem;
      height: 1.86rem;
    }
  }
  .heards-right {
    display: flex;
    align-items: center;
    .wall-connect {
      width: 5.71rem;
      height: 2.15rem;
      border-radius: 1.5rem;
      font-family: Inter;
      font-size: 0.86rem;
      font-weight: 500;
    }
    .wall-connect-text {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.72rem;
      width: 13.93rem;
      height: 2.15rem;
      background: #ffffff1a;
      border-radius: 1.5rem;
      border: none;
      .text {
        font-family: Inter;
        font-size: 0.86rem;
        font-weight: 500;
        color: #ffffff;
      }
      .wall-img {
        display: flex;
        align-items: center;
        .wall-icon {
          width: 1.43rem;
          height: 1.43rem;
        }
        .wall-arrow {
          margin-left: 0.43rem;
          width: 1.14rem;
          height: 1.14rem;
        }
      }
    }
    .language {
      margin-left: 0.57rem;
      width: 1.86rem;
      height: 1.86rem;
      background: #ffffff26;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      > img {
        width: 1.14rem;
        height: 1.14rem;
      }
    }
  }
}
</style>
