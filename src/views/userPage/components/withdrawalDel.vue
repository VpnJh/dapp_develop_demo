<template>
  <div class="with-del">
    <div class="del-title">
      <div class="goback" @click="router.go(-1)">
        <img v-lazy="getAssetsImageUrl('/goback.png')" alt="" />
      </div>
      <div class="title-text">{{ t("Detailed.withdrawals") }}</div>
    </div>
    <div class="del-box">
      <div class="box-title">
        <div class="title-item">{{ t("Detailed.date") }}</div>
        <div class="title-item">{{ t("Detailed.amount") }} (USDT)</div>
        <div class="title-item">{{ t("Detailed.status") }}</div>
      </div>
      <div class="box-line" />
      <div v-if="withdrawDelList" class="del-list">
        <div
          v-for="(item, index) in withdrawDelList"
          :key="index"
          class="list-item"
        >
          <div>{{ item.createTime.substring(0, 10) }}</div>
          <div class="list-balance">{{ item.balance }}</div>
          <div
            class="list-status"
            :style="{ color: getStatusColor(item.status) }"
          >
            {{ getStatusMessage(item.status) }}
          </div>
        </div>
      </div>
      <div v-else class="del-nodata">暂无数据</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAssetsImageUrl } from "@/utils/index.utils.js";
import { useI18n } from "vue3-i18n";
const { t } = useI18n();
import { useRouter } from "vue-router";
const router = useRouter();
import { testApi } from "@/api/index";
import { useWeb3ModalAccount } from "@web3modal/ethers/vue";
const { address, chainId, isConnected } = useWeb3ModalAccount();
import useStatusPup from "@/hooks/index";
const { loadStatus } = useStatusPup();
const withdrawDelList = ref(null);

const getStatusMessage = status =>
  ({
    1: t("Detailed.success"),
    2: t("Detailed.fail")
  })[status] || t("Detailed.unaudited");
const getStatusColor = status => {
  switch (status) {
    case 1:
      return "#5BCF50";
    case 2:
      return "#E23B3B";
    default:
      return "#FF693E";
  }
};
/**
 * 获取提现明细。
 *
 * @function getMiningMode
 * @param {String} address - 使用钱包地址。
 * @param {String} chainType - 链类型1以太 56bsc。
 * @returns {Object} - 返回提现明细列表。
 */
const queryWithdrawList = () => {
  loadStatus.value = true;
  testApi
    .getWithdrawList({
      address: address.value,
      chainType: chainId.value
    })
    .then(res => {
      if (res.code === 200) {
        withdrawDelList.value = res.data.data;
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
  queryWithdrawList();
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
        display: grid;
        grid-template-columns: repeat(3, 1fr);
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
}
</style>
