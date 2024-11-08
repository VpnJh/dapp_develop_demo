<template>
  <div class="quotes">
    <div class="quotes-box">
      <div class="box-title">
        <div class="title-item">交易对</div>
        <div class="title-item">最新价</div>
        <div class="title-item">今日涨跌幅</div>
      </div>
      <div class="box-line" />
      <div v-for="(item, index) in list" :key="index" class="quotes-list">
        <div class="trade">
          <div class="trade-coin">
            <img v-lazy="getAssetsImageUrl('/eth.png')" alt="" />
          </div>
          <div class="trade-pairs">
            <div class="pairs-name">
              <span class="name-coin">{{ item.coin }}/</span
              ><span class="name-token">{{ item.cointype }}</span>
            </div>
            <!-- <div class="pairs-amount">24H:{{ item.price24 }}</div> -->
          </div>
        </div>
        <div class="price">
          <div class="price-amount" :class="{ 'price-down': item.state == 1 }">
            {{ item.price }}
          </div>
          <div class="price-type">
            <img
              v-lazy="
                getAssetsImageUrl(
                  `${item.state == 1 ? '/downicon.png' : '/upicon.png'}`
                )
              "
              alt=""
            />
          </div>
        </div>
        <div class="interest-rate" :class="{ ratedown: item.state == 1 }">
          {{ item.state == 1 ? "-" + item.interest : "+" + item.interest }}%
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { getAssetsImageUrl } from "@/utils/index.utils.js";
import { testApi } from "@/api/index";
const fetchTokenPrice = async () => {
  // getUsertickers
  try {
    const response = await testApi.getUsertickers();
    console.log(response);
  } catch (error) {
    // 错误处理
  }
};

const list = [
  {
    coin: "ETH",
    cointype: "USDT"
  },
  {
    coin: "BNB",
    cointype: "USDT"
  }
];
onMounted(() => {
  fetchTokenPrice();
});
</script>
<style lang="scss" scoped>
.quotes {
  .quotes-box {
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
    .quotes-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1.14rem;
      margin-bottom: 1.14rem;
      .trade {
        display: flex;
        align-items: center;
        .trade-coin {
          width: 1.71rem;
          margin-right: 0.57rem;
          > img {
            width: 100%;
          }
        }
        .trade-pairs {
          .pairs-name {
            font-family: PingFang SC;
            font-weight: 400;
            color: #ffffff;

            .name-coin {
              font-size: 1rem;
              line-height: 1.4rem;
            }
            .name-token {
              font-size: 0.86rem;
              line-height: 1.2rem;
            }
          }
          .pairs-amount {
            font-family: DIN;
            font-size: 0.86rem;
            font-weight: 500;
            line-height: 1.04rem;
            color: #ffffff99;
          }
        }
      }
      .price {
        display: flex;
        .price-amount {
          font-family: DIN;
          font-size: 1rem;
          font-weight: 700;
          line-height: 17.09px;
          color: #37d59f;
          margin-right: 0.43rem;
        }
        .price-down {
          color: #cc4949 !important;
        }
        .price-type {
          width: 1.29rem;

          > img {
            width: 100%;
          }
        }
      }
      .interest-rate {
        border-radius: 0.36rem;
        width: 5.14rem;
        padding: 0.43rem 0;
        font-family: DIN;
        font-size: 0.86rem;
        font-weight: 500;
        line-height: 1.04rem;
        color: #ffffff;
        background: #37d59f;
        text-align: center;
      }
      .ratedown {
        background: #cc4949 !important;
      }
    }
  }
}
</style>
