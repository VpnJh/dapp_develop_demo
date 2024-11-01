<template>
  <div class="advancedMining-page">
    <div class="advancedMining-title">
      <div class="goback" @click="router.go(-1)">
        <img v-lazy="getAssetsImageUrl('/goback.png')" alt="" />
      </div>
      <div class="title-text">{{ t("Detailed.advancedMining") }}</div>
    </div>
    <div class="advanced-box">
      <div class="advanced-options">
        <div
          v-for="(item, index) in configStore.$state.liquidityList"
          :key="index"
          class="options-list"
          :class="{ 'list-active': optionsActive == index }"
          @click="onClickTab(item, index)"
        >
          <div class="list-days">{{ item.days }}{{ t("HeightPool.days") }}</div>
          <div class="list-scope">
            <span>{{ item.join_min }}U</span>
            ~
            <span>{{ item.join_max }}U</span>
          </div>
        </div>
      </div>
      <div class="proportion">
        <div class="proportion0-title">
          {{ t("HeightPool.commissionRate") }}
        </div>
        <div class="proportion0-value">
          {{ refActive ? refActive.ratio : 0 }}%
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
          @click="joinMining()"
          >{{ t("HeightPool.apply") }}</van-button
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
import { useWeb3ModalAccount } from "@web3modal/ethers/vue";
const { address, chainId } = useWeb3ModalAccount();
import { testApi } from "@/api/index";
const optionsActive = ref(0);
const refActive = ref(null);
const miniVal = ref("");
const onClickTab = (item, index) => {
  optionsActive.value = index;
  refActive.value = item;
};
const loadingBtv = ref(false);
const joinMining = () => {
  if (!address.value) return modal.open();
  if (!miniVal.value) return showFailToast(t("ApplyMiniPool.inputAmount"));
  if (![56, 1].includes(chainId.value)) return modal.open({ view: "Networks" });
  if (
    refActive.value.join_min <= Number(miniVal.value) &&
    Number(miniVal.value) >= refActive.value.join_max
  ) {
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
  }
};
/**
 * 用户入金。
 *
 * @function getDeposit
 * @param {String} address - 使用当前浏览器地址。
 * @param {String} chainType - 链类型1以太 56bsc
 * @param {String} balance - 入金金额
 * @param {String} mineType - 入金类型 1=>流动性 2=>高级
 * @param {String} days - 质押时长
 * @returns {Object} - 返回成功或者失败。
 */
const queryDeposit = () => {
  loadingBtv.value = true;
  testApi
    .getDeposit({
      address: address.value,
      chainType: chainId.value,
      balance: miniVal.value,
      mineType: "2",
      days: refActive.value.days
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
  refActive.value = configStore.$state.liquidityList[0];
});
</script>
<style lang="scss" scoped>
.advancedMining-page {
  padding-top: 1.29rem;
  border-top: 0.04rem solid #ffffff1a;
  .advancedMining-title {
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
  .advanced-box {
    padding: 1.14rem;
    .advanced-options {
      background: #ffffff0d;
      border: 0.07rem solid #ffffff0d;
      border-radius: 1.14rem;
      display: grid;
      grid-gap: 0.71rem;
      grid-template-columns: repeat(3, 1fr);
      padding: 1rem 0.86rem;
      .options-list {
        background: #ffffff0d;
        border-radius: 0.71rem;
        height: 8.71rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 0.07rem solid #ffffff1a;
        .list-days {
          font-family: PingFang SC;
          font-size: 1.29rem;
          font-weight: 400;
          line-height: 1.8rem;
          color: #ffffff;
        }
        .list-scope {
          margin-top: 0.86rem;
          font-family: DIN;
          font-size: 1rem;
          font-weight: 700;
          line-height: 1.22rem;
          color: #ffffff;
          text-align: center;
        }
      }
      .list-active {
        border: 0.07rem solid transparent;
        border-radius: 0.71rem;
        background-clip: padding-box, border-box;
        background-origin: padding-box, border-box;
        background-image: linear-gradient(to right, #222222aa, #222222aa),
          linear-gradient(180deg, #ff693e 0%, #ffe344 100%);
      }
    }
    .proportion {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1.29rem;
      .proportion0-title {
        font-family: PingFang SC;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.4rem;
        color: #ffffff;
      }
      .proportion0-value {
        font-family: DIN;
        font-size: 1rem;
        font-weight: 700;
        line-height: 1.22rem;
        color: #93f504;
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
