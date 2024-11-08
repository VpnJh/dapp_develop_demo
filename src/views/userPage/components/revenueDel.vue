<template>
  <div class="with-del">
    <div class="del-title">
      <div class="goback" @click="router.go(-1)">
        <img v-lazy="getAssetsImageUrl('/goback.png')" alt="" />
      </div>
      <div class="title-text">{{ t("revenuedetails") }}</div>
    </div>
    <div class="del-box">
      <div class="box-title">
        <div class="title-item">{{ t("Detailed.date") }}</div>
        <div class="title-item">{{ t("Detailed.amount") }} (USDT)</div>
      </div>
      <div class="box-line" />
      <div v-if="incomeList" class="del-list">
        <div v-for="(item, index) in incomeList" :key="index" class="list-item">
          <div>{{ convertDateTimeToDate(item.time) }}</div>
          <div class="list-balance">{{ item.amount }} (USDT)</div>
        </div>
      </div>
      <div v-else class="del-nodata">{{t('nodata')}}</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import {
  getAssetsImageUrl,
  convertDateTimeToDate
} from "@/utils/index.utils.js";
import { useI18n } from "vue3-i18n";
const { t } = useI18n();
import { useRouter } from "vue-router";
const router = useRouter();
import { testApi } from "@/api/index";
import { useWeb3ModalAccount } from "@web3modal/ethers/vue";
const { address, chainId, isConnected } = useWeb3ModalAccount();
import useStatusPup from "@/hooks/index";
const { loadStatus } = useStatusPup();
const incomeList = ref(null);

/**
 * 获取提现明细。
 *
 * @function getMiningMode
 * @param {String} address - 使用钱包地址。
 * @param {String} chainType - 链类型1以太 56bsc。
 * @returns {Object} - 返回提现明细列表。
 */
const queryUserIncomeList = () => {
  loadStatus.value = true;
  testApi
    .getUserIncomeList({
      address: address.value,
      // chainType: '1'
      chainType: chainId.value
    })
    .then(res => {
      if (res.code === 200) {
        incomeList.value = res.data;
        loadStatus.value = false;
      } else {
        showFailToast(res.msg);
        loadStatus.value = false;
      }
    })
    .catch(() => {
      loadStatus.value = false;
    });
};
onMounted(() => {
  queryUserIncomeList();
});
</script>

<style lang="scss" scoped>
.with-del {
  padding-top: 1.29rem;
  border-top: 0.04rem solid #ffffff1a;
  .del-title {
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
  .del-box {
    margin-top: 1.43rem;
    .box-title {
      display: flex;
      justify-content: space-between;
      padding: 0 1.14rem;
      .title-item {
        font-family: PingFang SC;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.4rem;
        color: #ffffff99;
      }
    }
    .box-line {
      height: 0.07rem;
      margin-top: 1rem;
      background: linear-gradient(
        90deg,
        rgba(255, 105, 62, 0) 0%,
        rgba(255, 105, 62, 0.2) 44.13%,
        rgba(255, 105, 62, 0) 100%
      );
    }
    .del-list {
      padding: 0 1.14rem;
      height: 73vh;
      overflow-y: auto;
      .list-item {
        display: flex;
        justify-content: space-between;
        font-family: DIN;
        font-size: 0.86rem;
        font-weight: 500;
        line-height: 1.04rem;
        color: #ffffff;
        border-bottom: 0.07rem solid #ffffff0a;
        padding: 0.86rem 0;
        .list-balance {
          text-align: center;
        }
        .list-status {
          text-align: right;
        }
      }
    }
  }
  .del-nodata {
    font-size: 1.14rem;
    color: #ffffff;
    font-weight: 600;
    text-align: center;
  }
}
</style>
