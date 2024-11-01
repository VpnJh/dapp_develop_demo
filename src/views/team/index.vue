<template>
  <div class="teamPage">
    <div class="team-title">
      <div class="title-icon">
        <div class="icon-img">
          <img v-lazy="getAssetsImageUrl('/team/teamUser.png')" alt="" />
        </div>
        <div class="icon-text">{{ t("MyTeam.inviteCode") }}</div>
      </div>

      <van-button
        class="team-del-btv"
        plain
        type="success"
        @click="goToPage('Team Details')"
        >{{ t("MyTeam.myTeam") }}</van-button
      >
    </div>
    <div class="my-team">
      <div class="myTeam-item">
        <div class="item-icon">
          <img v-lazy="getAssetsImageUrl('/team/iconLv1.png')" alt="" />
        </div>
        <div class="item-contant">
          <div class="item-text">{{ t("MyTeam.activeUsers") }}</div>
          <div class="item-number">{{ teamLv1?.userValid || 0 }}</div>
        </div>
        <div class="item-contant">
          <div class="item-text">{{ t("MyTeam.bonus") }}</div>
          <div class="item-number">{{ teamLv1?.profitAmount || 0 }}</div>
        </div>
      </div>
      <div class="box-line" />
      <div class="myTeam-item">
        <div class="item-icon">
          <img v-lazy="getAssetsImageUrl('/team/iconLv2.png')" alt="" />
        </div>
        <div class="item-contant">
          <div class="item-text">{{ t("MyTeam.activeUsers") }}</div>
          <div class="item-number">{{ teamLv2?.userValid || 0 }}</div>
        </div>
        <div class="item-contant">
          <div class="item-text">{{ t("MyTeam.bonus") }}</div>
          <div class="item-number">{{ teamLv2?.profitAmount || 0 }}</div>
        </div>
      </div>
      <div class="box-line" />
      <div class="myTeam-item">
        <div class="item-icon">
          <img v-lazy="getAssetsImageUrl('/team/iconLv3.png')" alt="" />
        </div>
        <div class="item-contant">
          <div class="item-text">{{ t("MyTeam.activeUsers") }}</div>
          <div class="item-number">{{ teamLv3?.userValid || 0 }}</div>
        </div>
        <div class="item-contant">
          <div class="item-text">{{ t("MyTeam.bonus") }}</div>
          <div class="item-number">{{ teamLv3?.profitAmount || 0 }}</div>
        </div>
      </div>
      <div class="box-line" />
      <div class="myTeam-item">
        <div class="item-icon">
          <img v-lazy="getAssetsImageUrl('/team/iconLv4.png')" alt="" />
        </div>
        <div class="item-contant">
          <div class="item-text">{{ t("MyTeam.activeUsers") }}</div>
          <div class="item-number">{{ teamLv4?.userValid || 0 }}</div>
        </div>
        <div class="item-contant">
          <div class="item-text">{{ t("MyTeam.bonus") }}</div>
          <div class="item-number">{{ teamLv4?.profitAmount || 0 }}</div>
        </div>
      </div>
    </div>
    <div class="copy-share">
      <div class="share-tiele">{{ t("MyTeam.myInviteCode") }}</div>
      <div class="share-inp">
        <span class="share-text">{{
          configStore.$state.userInfo.share_code
        }}</span>
        <span
          class="share-img"
          @click="copyText(configStore.$state.userInfo.share_code)"
          ><img v-lazy="getAssetsImageUrl('/team/copyIcon.png')" alt=""
        /></span>
      </div>
      <div class="share-tiele">{{ t("MyTeam.myLink") }}</div>
      <div class="share-inp">
        <span class="share-text">{{ configStore.$state.share_url }}</span>
        <span class="share-img" @click="copyText(configStore.$state.share_url)"
          ><img v-lazy="getAssetsImageUrl('/team/copyIcon.png')" alt=""
        /></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { testApi } from "@/api/index";
import { useConfigStore } from "@/stores/index";
const configStore = useConfigStore();
import { getAssetsImageUrl, goToPage } from "@/utils/index.utils.js";
import { useWeb3ModalAccount } from "@web3modal/ethers/vue";
const { address, chainId, isConnected } = useWeb3ModalAccount();
import { useI18n } from "vue3-i18n";
import useClipboard from "vue-clipboard3";
const { t } = useI18n();
watch(address, (newValue, oldValue) => {
  if (newValue !== oldValue && newValue) {
    queryTeamDetails();
  }
});
/**
 * 获取团队详情列表
 *
 * @function getTeamDetails
 * @param {String} address - 钱包地址。
 * @param {String} chainType - 链类型1以太 56bsc。
 * @returns {Object} - 返回团队详情列表。
 */
const teamLv1 = ref(null);
const teamLv2 = ref(null);
const teamLv3 = ref(null);
const teamLv4 = ref(null);
const queryTeamDetails = () => {
  testApi
    .getTeamDetails({
      address: address.value,
      chainType: chainId.value
    })
    .then(res => {
      if (res.code === 200) {
        teamLv1.value = res.data.caption_rebates1 || 0;
        teamLv2.value = res.data.caption_rebates2 || 0;
        teamLv3.value = res.data.caption_rebates3 || 0;
        teamLv4.value = res.data.caption_rebates4 || 0;
      }
    })
    .catch(() => {});
};
const { toClipboard } = useClipboard();
const copyText = async text => {
  try {
    if (!text) return;
    await toClipboard(text);
    showSuccessToast("copy-success");
  } catch (e) {
    /* empty */
  }
};
</script>
<style lang="scss" scoped>
.teamPage {
  padding: 1.29rem 1.14rem 6rem;
  border-top: 0.04rem solid #ffffff1a;
  .team-title {
    display: flex;
    justify-content: space-between;
    .title-icon {
      display: flex;
      align-items: center;
      .icon-img {
        width: 2.43rem;
        > img {
          width: 100%;
        }
      }
      .icon-text {
        font-family: PingFang SC;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.4rem;
        color: #ffffff;
        margin-left: 0.57rem;
      }
    }
    .team-del-btv {
      border: 0.07rem solid #ff693e;
      font-family: Inter;
      font-size: 0.86rem;
      font-weight: 500;
      line-height: 1.04rem;
      color: #ff693e;
      height: 1.93rem;

      border-radius: 1.5rem;
      padding: 0 1.07rem;
      background: transparent;
    }
  }
  .my-team {
    margin-top: 0.71rem;
    width: 100%;
    background: linear-gradient(
      142.97deg,
      rgba(255, 159, 62, 0.1) 2.95%,
      rgba(249, 255, 62, 0.1) 45.13%,
      rgba(253, 143, 209, 0.1) 96.68%
    );
    border: 0.07rem solid #ffffff1a;
    border-radius: 1.14rem;
    .myTeam-item {
      display: grid;
      grid-gap: 14px;
      grid-template-columns: repeat(3, 1fr);
      padding: 1.21rem 1.43rem 0.86rem;
      .item-icon {
        width: 3.57rem;
        > img {
          width: 100%;
        }
      }
      .item-contant {
        font-family: PingFang SC;
        font-size: 1rem;
        line-height: 1.4rem;
        text-align: center;
        color: #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .item-text {
          font-weight: 400;
        }
        .item-number {
          font-weight: 500;
        }
      }
    }
  }
  .box-line {
    height: 0.07rem;
    background: #ffffff0a;
  }
  .copy-share {
    .share-tiele {
      font-family: PingFang SC;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.4rem;
      margin: 1.43rem 0 1rem;
      color: #ffffff;
    }
    .share-inp {
      background: #d9d9d91a;
      border: 0.07rem solid #ffffff1a;
      border-radius: 0.57rem;
      padding: 0.86rem 1.14rem;
      display: flex;
      justify-content: space-between;

      .share-text {
        font-family: PingFang SC;
        font-size: 1.14rem;
        font-weight: 400;
        line-height: 1.6rem;
        color: #ffffff;
        overflow: hidden;
        white-space: nowrap; /* 防止文本换行 */
        overflow: hidden; /* 隐藏溢出的内容 */
      }
      .share-img {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 2.86rem;
        > img {
          display: block;
          width: 1.43rem;
        }
      }
    }
  }
}
</style>
