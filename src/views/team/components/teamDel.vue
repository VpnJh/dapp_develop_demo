<template>
  <div class="team-del">
    <div class="del-title">
      <div class="goback" @click="router.go(-1)">
        <img v-lazy="getAssetsImageUrl('/goback.png')" alt="" />
      </div>
      <div class="title-text">{{ t("TeamDetails.teamDetails") }}</div>
    </div>
    <div class="del-box">
      <van-tabs v-model:active="active" animated swipeable class="tab-list">
        <van-tab
          v-for="(item, index) in teamDetailList"
          :key="index"
          :title="$t('TeamDetails.level' + (index + 1))"
          class="tab-item"
        >
          <div v-for="(items, indexs) in item" :key="indexs" class="teamlist">
            <div class="list-address">
              <div class="address-chain">
                <img
                  v-lazy="
                    getAssetsImageUrl(
                      `${chainId == 56 ? '/bnb.png' : '/eth.png'}`
                    )
                  "
                  alt=""
                />
              </div>
              <div class="address-text">
                {{ truncateString(items.address) }}
              </div>
            </div>
            <div class="list-amount">{{ items.amount }}USDT</div>
          </div>
          <div v-if="item.length == 0">暂无数据</div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAssetsImageUrl, truncateString } from "@/utils/index.utils.js";
import { useI18n } from "vue3-i18n";
const { t } = useI18n();
import { useRouter } from "vue-router";
const router = useRouter();
import { testApi } from "@/api/index";
import { useWeb3ModalAccount } from "@web3modal/ethers/vue";
const { address, chainId, isConnected } = useWeb3ModalAccount();
import useStatusPup from "@/hooks/index";
const { loadStatus } = useStatusPup();
const teamDetailList = ref([]); //所有的团队详情列表
/**
 * 获取团队详情列表
 *
 * @function getTeamDetails
 * @param {String} address - 钱包地址。
 * @param {String} chainType - 链类型1以太 56bsc。
 *
 * @returns {Object} - 返回团队详情列表。
 */
const queryTeamDetails = () => {
  loadStatus.value = true;
  testApi
    .getTeamDetails({
      address: address.value,
      chainType: chainId.value
    })
    .then(res => {
      if (res.code === 200) {
        const inferiorValues = [1, 2, 3, 4].map(index => {
          const inferiorKey = `inferior${index}`;
          return Array.isArray(res.data[inferiorKey])
            ? res.data[inferiorKey]
            : [];
        });
        teamDetailList.value = inferiorValues;
        loadStatus.value = false;
      } else {
        loadStatus.value = false;
      }
    })
    .catch(() => {
      loadStatus.value = false;
    });
};
onMounted(() => {
  queryTeamDetails();
});
</script>

<style lang="scss" scoped>
.team-del {
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
    padding: 1.14rem;
    :deep(.van-tabs__nav) {
      background: transparent;
      justify-content: space-between;
    }
    :deep(.van-tabs__line) {
      display: none;
    }
    :deep(.van-tab) {
      padding: 0.71rem 1.43rem;
      height: 2.29rem;
      border-radius: 2.21rem;
      background: #2d2d36;
      font-family: PingFang SC;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.4rem;
      color: #ffffffcc;
      flex: initial;
    }
    :deep(.van-tab--active) {
      background: #ff693e;
      color: #ffffff;
    }
    .teamlist {
      display: flex;
      justify-content: space-between;
      align-items: center;

      border-bottom: 0.07rem solid #ffffff0a;
      .list-address {
        display: flex;
        align-items: center;
        .address-chain {
          width: 2.14rem;
          > img {
            width: 100%;
          }
        }
        .address-text {
          margin-left: 0.71rem;
          font-family: DIN;
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.21rem;
          color: #ffffffcc;
        }
      }
      .list-amount {
        font-family: DIN;
        font-size: 1rem;
        font-weight: 500;
        line-height: 1.21rem;
        color: #ffffff;
      }
    }
  }
}
</style>
