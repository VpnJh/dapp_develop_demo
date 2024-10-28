<template>
  <div class="home-page">
    <div class="banner-img">
      <img
        v-lazy="getAssetsImageUrl('/bannerimg.png')"
        class="img-ban"
        alt=""
      />
      <van-notice-bar
        class="home-notice"
        :left-icon="getAssetsImageUrl('/notices.png')"
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
      <van-button v-if="!isConnected" class="join-btv" type="warning">{{
        t("HeightPool.approvetext")
      }}</van-button>
    </div>
    <div class="user-mining">
      <div class="mining-titles">User Mining Revenue</div>
      <div class="mining-box">
        <div class="box-titles">
          <div>address</div>
          <div>value</div>
        </div>
        <div class="box-line" />
        <div class="box-contant">
          <div v-for="item in testData" :key="item.addr" class="contant-item">
            <div class="item-addr">
              {{ item.a.substring(0, 4) + "******" + item.a.substring(13, 17) }}
            </div>
            <!-- <div class="hrl_usdt">1,15241478.00</div> -->
            <div class="item-usdt">{{ item.v }}</div>
          </div>
        </div>
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
onMounted(() => {
  console.log(configStore, "configStore");
  configStore.queryAgentMarketIncome();
});
</script>
<style lang="scss" scoped>
.home-page {
  .banner-img {
    width: 100%;
    // height: 11.43rem;
    position: relative;

    .home-notice {
      background: #00000033;
      backdrop-filter: blur(10.36px);
      color: #ffffff;
      font-family: PingFang SC;
      font-size: 12.04px;
      font-weight: 400;

      width: 100%;
      position: absolute;
      bottom: 0;
    }
  }
  .home-functional {
    margin-top: 20.02px;
    padding: 0 15.96px;

    .functionals {
      display: grid;
      grid-gap: 14px 15.96px;
      grid-template-columns: repeat(2, 1fr);
      .functional-box {
        background: #ffffff14;
        border-radius: 9.94px;
        border-top: 0.98px solid #ffffff1a;
        padding: 12.04px;
        .box-text {
          font-family: PingFang SC;
          font-size: 12.04px;
          font-weight: 400;
          color: #ffffff99;
        }
        .box-item {
          margin-top: 10px;
          font-family: DIN;
          font-size: 18.06px;
          font-weight: 700;
          color: #93f504;
        }
      }
      .functional-area {
        border-radius: 9.94px;
        height: 93.94px;
        border: 0.56px solid #ff693e33;
      }
      .backminning {
        background: url("@/assets/images/mining.png") no-repeat center/100%;
      }
      .backheight {
        background: url("@/assets/images/heightpool.png") no-repeat center/100%;
      }
    }
    .join-btv {
      margin-top: 20.02px;
      background: #ff693e;
      width: 100%;
      height: 40.04px;
      border: none;
      font-family: PingFang SC;
      font-size: 14px;
      font-weight: 400;
      color: #ffffff;
    }
  }
  .user-mining {
    margin-top: 20px;
    padding: 0 16px;
    width: 100%;
    .mining-titles {
      font-family: PingFang SC;
      font-size: 16px;
      font-weight: 400;
      line-height: 22.4px;
      color: #ffffff;
    }
    .mining-box {
      margin-top: 16px;
      height: 308px;
      border-radius: 10px;
      border: 0.5px solid #ffffff14;
      background: #ffffff1a;
      padding: 12px 10px;
      .box-titles {
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        font-family: PingFang SC;
        font-size: 14px;
        font-weight: 400;
        line-height: 19.6px;
      }
      .box-line {
        margin-top: 10px;
        width: 100%;
        height: 1px;
        background: linear-gradient(
          90deg,
          rgba(255, 105, 62, 0) 0%,
          rgba(255, 105, 62, 0.4) 44.13%,
          rgba(255, 105, 62, 0) 100%
        );
      }
      .box-contant {
        .contant-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          .item-addr {
            font-family: PingFang SC;
            font-size: 14px;
            font-weight: 400;
            line-height: 19.6px;
            color: #ffffffcc;
          }
          .item-usdt {
            font-family: DIN;
            font-size: 14px;
            font-weight: 500;
            line-height: 16.95px;
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>
