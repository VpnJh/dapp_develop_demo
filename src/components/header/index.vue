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
        @click="handleOpen()"
        >{{ t("Connect") }}</van-button
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
      <div class="language" @click="languageShow = true">
        <img
          v-lazy="
            currentLang
              ? getAssetsImageUrl(`/languageIcon/${currentLang}.png`)
              : getAssetsImageUrl('/language.png')
          "
          alt=""
        />
      </div>
    </div>
    <van-popup v-model:show="languageShow" round class="language-popup">
      <div class="language-title">
        <div class="title-text">Select Chain</div>
        <div class="title-off" @click="languageShow = false">
          <img v-lazy="getAssetsImageUrl('/languageIcon/officon.png')" alt="" />
        </div>
      </div>
      <div class="box-lines" />
      <div class="language-box">
        <div
          v-for="(item, index) in actions"
          :key="index"
          class="language-item"
          @click="onSelect(item)"
        >
          <div class="language-select">
            <div class="img-lang">
              <img
                v-lazy="getAssetsImageUrl(`/languageIcon/${item.value}.png`)"
                alt=""
              />
            </div>
            <div class="langs-text">{{ item.text }}</div>
          </div>
          <div v-if="item.value == currentLang" class="on-right">
            <img v-lazy="getAssetsImageUrl('/onright.png')" alt="" />
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import {
  useDisconnect,
  useSwitchNetwork,
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
  useWalletInfo
} from "@web3modal/ethers/vue";
import { BrowserProvider, Contract } from "ethers";
import { ref, onMounted, watch, computed, onBeforeMount } from "vue";
import BigNumber from "bignumber.js";
import erc20Abi from "@/assets/abi/erc20.abi.json";
import {
  getAssetsImageUrl,
  truncateString,
  goToPage
} from "@/utils/index.utils.js";
import { setI18nLanguage } from "@/locales/index.js";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
import { testApi } from "@/api/index";
import { useConfigStore } from "@/stores/index";
const configStore = useConfigStore();
import { useI18n } from "vue3-i18n";
const { t, getLocale } = useI18n();
const currentLang = computed(() => getLocale() || "");
const { disconnect } = useDisconnect();
const { switchNetwork } = useSwitchNetwork();
const { walletProvider } = useWeb3ModalProvider();
const { address, chainId, isConnected, status } = useWeb3ModalAccount();
const modal = useWeb3Modal();
const handleOpen = () => {
  modal.open();
};
const languageShow = ref(false);
const onSelect = selectedValues => {
  setI18nLanguage(selectedValues.value);
  languageShow.value = false;
  // imageSource.value = imageSources[selectedValues.value];
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
//  查询授权 列表
const handleAuthTransaction = function () {
  modal.open({ view: "ApproveTransaction" });
};
const actions = [
  { text: "简体中文", value: "zh-CN" },
  { text: "English", value: "en-US" },
  { text: "繁体中文", value: "zh-TW" },
  { text: "Português", value: "pt-PT" },
  { text: "Polski", value: "pl-PL" },
  { text: "Français", value: "fr-FR" },
  { text: "español", value: "es-ES" },
  { text: "Deutsch", value: "de-DE" },
  { text: "عربي", value: "ar-SA" }
];
// 断开链接
const loginOut = function () {
  disconnect();
};
watch(address, (newValue, oldValue) => {
  if (address.value == void 0) {
    goToPage("homePage");
  }
  if (newValue !== oldValue && newValue) {
    configStore.queryUserInfo(address.value, chainId.value);
    queryRegister();
  }
  queryBlances();
});
watch(chainId, (newValue, oldValue) => {
  if (newValue !== oldValue && newValue && oldValue) {
    configStore.getCoinAddress(chainId.value);
    queryRegister();
  }
});
watch(route, (to, from) => {
  if (address.value !== void 0) {
    configStore.getCoinAddress(chainId.value);
  }
});
const initAccount = async function () {
  try {
    if (!address.value) {
      modal.open({ view: "Connect" }).then(value => {
        console.log(document.getElementsByTagName("w3m-modal"));
        setTimeout(() => {}, 1000);
      });
    }
  } catch (err) {
    console.log("error", JSON.stringify(err));
  }
};
const queryBlances = async () => {
  try {
    const provider = new BrowserProvider(walletProvider.value);
    const tokenContract = new Contract(
      configStore.$state.coinadress,
      erc20Abi,
      provider
    );
    const balance = await tokenContract.balanceOf(address.value);
    const decimals = await tokenContract.decimals();
    const balanceCoin = await provider.getBalance(address.value);
    let bnbBalances = new BigNumber(balanceCoin)
      .dividedBy(Math.pow(10, 18))
      .toString();
    let usdtBalances = new BigNumber(balance)
      .dividedBy(new BigNumber(10).exponentiatedBy(decimals))
      .toString();

    configStore.$state.usdtbalance = usdtBalances;
    configStore.$state.coinbalance = bnbBalances;
  } catch (e) {
    console.log(e);
  }
};

/**
 * 注册接口。
 *
 * @function getRegister
 * @param {String} address - 使用当前浏览器地址。
 * @param {String} invitationCode - 邀请码，邀请码可为空
 * @param {String} chainType - 链类型1以太 56bsc。
 * @param {String} domains - 使用当前浏览器地址。
 * @returns {Object} - 返回首页数据对象。
 */
const shareCode = ref("");
const queryRegister = () => {
  shareCode.value = route.query.share_code ? route.query.share_code : "";
  testApi
    .getRegister({
      address: address.value,
      invitationCode: shareCode.value, //邀请码可为空
      chainType: chainId.value, //1以太 56bsc
      domains: configStore.$state.domainsUrl //代理域名
    })
    .then(() => {})
    .catch(() => {});
};
onMounted(() => {
  queryBlances();
  console.log(isConnected, "isConnected");
  console.log(status, "status");
  // initAccount();
});
onBeforeMount(() => {
  // localStorage.clear();
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
      // width: 5.71rem;
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
  .language-popup {
    background: linear-gradient(
      143.14deg,
      #322827 2.04%,
      #16261f 54.45%,
      #302135 98.21%
    );
    border-radius: 0.71rem;
    padding: 1.14rem;
    border: 1px solid #ff693e66;
  }
  .language-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title-text {
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.4rem;
      color: #ff693e;
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
    margin: 1rem 0 0.71rem;
    background: linear-gradient(
      90deg,
      rgba(255, 105, 62, 0) 0%,
      rgba(255, 105, 62, 0.2) 44.13%,
      rgba(255, 105, 62, 0) 100%
    );
  }
  .language-box {
    display: grid;
    grid-gap: 1rem 1rem;
    grid-template-columns: repeat(2, 1fr);
    .language-item {
      min-width: 124.04px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #ffffff1a;
      border: 0.07rem solid #ffffff33;
      border-radius: 0.71rem;
      padding: 0.57rem;
      .language-select {
        display: flex;
        align-items: center;

        .img-lang {
          width: 1.43rem;
          > img {
            width: 100%;
          }
        }
        .langs-text {
          margin-left: 0.71rem;
          font-family: PingFang SC;
          font-size: 0.86rem;
          font-weight: 400;
          line-height: 1.2rem;
          color: #ffffff;
        }
      }
      .on-right {
        width: 1.14rem;
        > img {
          width: 100%;
        }
      }
    }
  }
}
</style>
