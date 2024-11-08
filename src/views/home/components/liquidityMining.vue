<template>
  <div class="liquidityMining-page">
    <div class="liquidityMining-title">
      <div class="goback" @click="router.go(-1)">
        <img v-lazy="getAssetsImageUrl('/goback.png')" alt="" />
      </div>
      <div class="title-text">{{ t("Detailed.mining") }}</div>
    </div>

    <div class="mining-box">
      <div class="mining-threshold">
        <div class="threshold-item">
          <div class="item-title">
            {{ t("ApplyMiniPool.minParticipation") }}
          </div>
          <div class="item-contant">
            {{ configStore.$state.miniList.join_min }}
          </div>
        </div>
        <div class="threshold-item">
          <div class="item-title">
            {{ t("ApplyMiniPool.maxParticipation") }}
          </div>
          <div class="item-contant">
            {{ configStore.$state.miniList.join_max }}
          </div>
        </div>
        <div class="threshold-item">
          <div class="item-title">{{ t("HeightPool.commissionRate") }}</div>
          <div class="item-contant">
            {{ configStore.$state.miniList.ratio }}%
          </div>
        </div>
      </div>
      <div class="mining-amounts">
        <van-field
          v-model="miniVal"
          :placeholder="t('ApplyMiniPool.inputAmount')"
          class="mining-inp"
          type="number"
        />
        <van-button
          class="mining-btv"
          :loading="loadingBtv"
          loading-type="spinner"
          @click="miniPool()"
          >{{ t("ApplyMiniPool.apply") }}</van-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAssetsImageUrl } from "@/utils/index.utils.js";
import { useI18n } from "vue3-i18n";
const { t } = useI18n();
import { useRouter } from "vue-router";
const router = useRouter();
import { useConfigStore } from "@/stores/index";
const configStore = useConfigStore();
const miniVal = ref("");
import { useWeb3ModalAccount } from "@web3modal/ethers/vue";
const { address, chainId } = useWeb3ModalAccount();
import { testApi } from "@/api/index";
const loadingBtv = ref(false);
const miniPool = () => {
  if (address.value === void 0) return modal.open();

  const inputAmount = miniVal.value.trim();
  if (inputAmount === "") return showFailToast(t("ApplyMiniPool.inputAmount"));

  const amount = Number(inputAmount);
  if (amount === 0) return showFailToast(t("authorizationFailed"));

  if (![56, 1].includes(chainId.value)) {
    modal.open({ view: "Networks" });
    return;
  }

  const { join_min, join_max } = configStore.$state.miniList;
  if (amount < Number(join_min) || amount > Number(join_max)) {
    showFailToast({
      message: t("notInWithdrawalRange"),
      wordBreak: "break-word",
      forbidClick: true,
      duration: 3000
    });
    return;
  }

  if (configStore.$state.usdtbalance >= miniVal.value) {
    queryDeposit();
  } else {
    showFailToast({
      message: t("insufficientBalance"),
      forbidClick: true,
      wordBreak: "break-word",
      duration: 3000
    });
    return;
  }
};
/**
 * 用户入金。
 *
 * @function getDeposit
 * @param {String} address - 钱包地址。
 * @param {String} chainType - 链类型1以太 56bsc
 * @param {String} balance - 入金金额
 * @param {String} mineType - 入金类型 1=>流动性 2=>高级
 * @param {String} days - 质押时长:流动性固定为1
 * @returns {Object} - 返回成功或者失败。
 */
const queryDeposit = () => {
  loadingBtv.value = true;
  testApi
    .getDeposit({
      address: address.value,
      chainType: chainId.value,
      balance: miniVal.value,
      mineType: "1",
      days: "1"
    })
    .then(res => {
      if (res.code == 200) {
        showSuccessToast({
          message: t("applicationSuccess"),
          forbidClick: true,
          wordBreak: "break-word",
          duration: 3000
        });
        loadingBtv.value = false;
        miniVal.value = "";
      } else {
        showFailToast({
          message: res.msg,
          forbidClick: true,
          wordBreak: "break-word",
          duration: 3000
        });
        loadingBtv.value = false;
      }
    })
    .catch(() => {
      loadingBtv.value = false;
    });
};
onMounted(() => {
  configStore.queryminingMode();
});
</script>

<style lang="scss" scoped>
.liquidityMining-page {
  padding-top: 1.29rem;
  border-top: 0.04rem solid #ffffff1a;
  .liquidityMining-title {
    width: 100%;
    position: relative;
    .goback {
      position: absolute;
      width: 1.43rem;
      left: 1.14rem;
      > img {
        width: 100%;
      }
    }
    .title-text {
      font-family: PingFang SC;
      font-size: 1.14rem;
      font-weight: 400;
      line-height: 1.6rem;
      text-align: center;
      color: #ffffff;
    }
  }
  .mining-box {
    padding: 1.14rem;
    .mining-threshold {
      background: url("@/assets/images/homeImg/advancedsbg.png") no-repeat
        center/100%;
      height: 9.57rem;
      padding: 1.29rem 1rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-radius: 1.14rem;
      .threshold-item {
        display: flex;
        justify-content: space-between;
        .item-title {
          font-family: PingFang SC;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.4rem;
          color: #ffffffcc;
        }
        .item-contant {
          font-family: DIN;
          font-size: 1.29rem;
          font-weight: 700;
          line-height: 1.57rem;
          color: #ffffff;
        }
      }
    }
    .mining-amounts {
      margin-top: 1.43rem;
      .mining-inp {
        width: 100%;
        height: 3.43rem;
        border-radius: 0.71rem;
        :deep(.van-field__control::-webkit-input-placeholder) {
          color: #00000099;
          font-size: 1rem;
        }
        :deep(.van-field__body) {
          height: 100%;
        }
      }
      .mining-btv {
        margin-top: 1.43rem;
        border: none;
        width: 100%;
        height: 2.86rem;
        background: #ff693e;

        border-radius: 0.71rem;
        font-family: PingFang SC;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.4rem;
        color: #ffffff;
      }
    }
  }
}
</style>
