<template>
  <div class="pool-del">
    <div class="pool-title">
      <div class="goback" @click="router.go(-1)">
        <img v-lazy="getAssetsImageUrl('/goback.png')" alt="" />
      </div>
      <div class="title-text">{{ t("myminingpool.label") }}</div>
    </div>
    <div v-if="miningDelList" class="pool-box">
      <div
        v-for="(item, index) in miningDelList"
        :key="index"
        class="pool-item"
      >
        <div class="item-title">
          <div
            class="title-state"
            :style="{ color: getStatusColor(item.state) }"
          >
            {{ getStatusMessage(item.state) }}
          </div>
          <div class="title-type">
            {{
              item.ontype == 1
                ? t("myminingpool.liquidityPool")
                : t("myminingpool.stakingPool")
            }}
          </div>
          <div class="title-time">{{ convertDateTimeToDate(item.time) }}</div>
        </div>
        <div class="pool-line" />
        <div class="item-contant">
          <div v-if="item.ontype == 1" class="contant-list">
            <div class="list-title">{{ t("myminingpool.days") }}</div>
            <div class="list-contant">{{ item.days }}</div>
          </div>
          <div class="contant-list">
            <div class="list-title">{{ t("myminingpool.amount") }}</div>
            <div class="list-contant">{{ item.amount }}U</div>
          </div>
          <div class="contant-list">
            <div class="list-title">{{ t("myminingpool.dailyEarnings") }}</div>
            <div class="list-contant">{{ item.dayamount }}</div>
          </div>
          <div class="contant-list tr">
            <div class="list-title">{{ t("myminingpool.totalEarnings") }}</div>
            <div class="list-contant">{{ item.total }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="del-nodata">{{ t("nodata") }}</div>
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
const miningDelList = ref(null);

const getStatusMessage = status =>
  ({
    0: t("disabled"),
    1: t("enabled"),
    2: t("settled")
  })[status];
const getStatusColor = status => {
  // #E23B3B   #FF693E
  switch (status) {
    case 0:
      return "#E23B3B";
    case 1:
      return "#5BCF50";
    case 2:
      return "#FF693E";
    default:
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
const queryUserMiningList = () => {
  loadStatus.value = true;
  testApi
    .getUserMiningList({
      address: address.value,
      chainType: chainId.value
    })
    .then(res => {
      if (res.code === 200) {
        miningDelList.value = res.data;
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
  queryUserMiningList();
});
</script>

<style lang="scss" scoped>
.pool-del {
  padding-top: 1.29rem;
  border-top: 0.04rem solid #ffffff1a;
  .pool-title {
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
  .pool-box {
    margin-top: 1.43rem;
    padding: 0 1.14rem;
    height: 80vh;
    overflow-y: auto;
    .pool-item {
      border: 0.04rem solid #ffffff1a;
      background: #ffffff1a;
      border-radius: 0.71rem;
      padding: 1.14rem 0.86rem;
      margin-bottom: 1.14rem;
      .item-title {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        align-items: baseline;
        .title-state {
          font-family: PingFang SC;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.4rem;
          text-align: left;
          color: #ffffff;
        }
        .title-color {
          color: #2eb86c;
        }
        .title-type {
          font-family: PingFang SC;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.4rem;
          text-align: center;
          color: #ffffff;
        }
        .title-time {
          font-family: DIN;
          font-size: 0.86rem;
          font-weight: 500;
          line-height: 1.04rem;
          text-align: right;
          color: #ffffffcc;
        }
      }
      .pool-line {
        height: 0.07rem;
        background: #ffffff0a;
        margin: 0.86rem 0;
      }
      .item-contant {
        display: flex;
        justify-content: space-between;
        .contant-list {
          .list-title {
            font-family: PingFang SC;
            font-size: 0.86rem;
            font-weight: 400;
            line-height: 1.2rem;
            color: #ffffff99;
          }
          .list-contant {
            margin-top: 0.86rem;
            font-family: DIN;
            font-size: 1rem;
            font-weight: 500;
            line-height: 1.21rem;
            color: #ffffff;
          }
        }
        .tr {
          text-align: right;
        }
      }
    }
  }
  .del-nodata {
    height: 80vh;
    font-size: 1.14rem;
    color: #ffffff;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
