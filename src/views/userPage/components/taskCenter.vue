<template>
  <div class="task-center">
    <div class="task-title">
      <div class="goback" @click="router.go(-1)">
        <img v-lazy="getAssetsImageUrl('/goback.png')" alt="" />
      </div>
      <div class="title-text">{{ t("User.taskCenter") }}</div>
    </div>
    <div class="task-box">
      <van-tabs v-model:active="active" animated swipeable class="tab-list">
        <van-tab :title="t('task.captainTasks')" class="tab-item">
          <div class="box-contant">
            <div
              v-for="(item, index) in captionLevels"
              :key="index"
              class="task-list"
            >
              <div class="task-list-title">
                <div class="list-icon">
                  <img
                    v-lazy="
                      getAssetsImageUrl(
                        `${item.status == 1 ? '/user/taskcenters/stateActive.png' : '/user/taskcenters/stateNoactive.png'}`
                      )
                    "
                    alt=""
                  />
                </div>
                <div class="list-title">
                  <div class="list-text">
                    {{ getLocalizedTitle(item, languagesKey.$state.lang) }}
                  </div>
                  <div class="list-contant">
                    {{ t("task.rewards") }}{{ item.balance
                    }}{{ t("task.captainUpgradeBounty") }}
                  </div>
                </div>
              </div>

              <div
                class="list-states"
                :class="{
                  'list-statesActive': item.status == 1
                }"
              >
                {{
                  item.status == 1 ? t("task.completed") : t("task.uncompleted")
                }}
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab :title="t('task.dailyTasks')" class="tab-item">
          <div class="box-contant">
            <div
              v-for="(item, index) in taskDays"
              :key="index"
              class="task-list"
            >
              <div class="task-list-title">
                <div class="list-icon">
                  <img
                    v-lazy="
                      getAssetsImageUrl(
                        `${item.status == 1 ? '/user/taskcenters/stateActive.png' : '/user/taskcenters/stateNoactive.png'}`
                      )
                    "
                    alt=""
                  />
                </div>
                <div class="list-title">
                  <div class="list-text">
                    {{ getLocalizedTitle(item, languagesKey.$state.lang) }}
                  </div>
                  <div class="list-contant">
                    {{ t("task.rewards") }}{{ item.balance
                    }}{{ t("task.captainUpgradeBounty") }}
                  </div>
                </div>
              </div>

              <div
                class="list-states"
                :class="{
                  'list-statesActive': item.status == 1
                }"
              >
                {{
                  item.status == 1 ? t("task.completed") : t("task.uncompleted")
                }}
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
      <div class="task-rule">
        <div class="rule-title">
          {{ t("task.bountyRules") }}
        </div>
        <div class="rule-item">
          {{ t("task.bountyRule1") }} <br />
          {{ t("task.bountyRule2") }} <br />
          {{ t("task.bountyRule3") }}
        </div>
      </div>
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
import { useAppConfigStore } from "@/stores/index";
const languagesKey = useAppConfigStore();
import useStatusPup from "@/hooks/index";
const { loadStatus } = useStatusPup();
const captionLevels = ref({});
const taskDays = ref({});
const getLocalizedTitle = (item, langvif) => {
  const titles = {
    "en-US": item.title_us,
    "zh-CN": item.title,
    "zh-TW": item.title_hk,
    "pt-PT": item.title_pt,
    "pl-PL": item.title_pl,
    "fr-FR": item.title_fr,
    "es-ES": item.title_es,
    "de-DE": item.title_de,
    "ar-SA": item.title_ae
  };

  return titles[langvif] || item.title; // 默认返回 item.title
};
/**
 * 获取任务中心内容
 *
 * @function getAgentTasks
 * @param {String} domainsUrl - 使用当前浏览器地址。
 * @returns {Object} - 返回团队详情列表。
 */
const queryAgentTasks = async () => {
  loadStatus.value = true;
  try {
    const res = await testApi.getAgentTasks({ domains: "crypto-btc.tech" });
    loadStatus.value = false;
    if (res.code === 200) {
      captionLevels.value = res.data.captionLevels;
      taskDays.value = res.data.taskDays;
    }
  } catch (error) {
    loadStatus.value = false;
  }
};
onMounted(() => {
  queryAgentTasks();
});
</script>
<style lang="scss" scoped>
.task-center {
  padding-top: 1.29rem;
  border-top: 0.04rem solid #ffffff1a;
  .task-title {
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
  .task-box {
    padding: 1.14rem;
    :deep(.van-tabs__nav) {
      background: transparent;
      justify-content: space-between;
    }
    :deep(.van-tabs__line) {
      display: none;
    }
    :deep(.van-tab) {
      padding: 0.71rem 3.29rem;
      height: 2.86rem;
      border-radius: 2.21rem;
      background: #2d2d36;
      font-family: PingFang SC;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.4rem;
      color: #ffffff;
      flex: initial;
    }
    :deep(.van-tab--active) {
      background: #ff693e;
      color: #ffffff;
    }
    .box-contant {
      margin-top: 1.43rem;
      background: linear-gradient(
        142.97deg,
        rgba(255, 159, 62, 0.1) 2.95%,
        rgba(249, 255, 62, 0.1) 45.13%,
        rgba(253, 143, 209, 0.1) 96.68%
      );
      border: 0.07rem solid #ffffff1a;
      padding: 1.14rem 0.86rem;
      border-radius: 1.14rem;
      display: grid;
      grid-gap: 1.14rem;
      grid-template-columns: repeat(1, 1fr);
      .task-list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .task-list-title {
          display: flex;
          .list-icon {
            width: 2.86rem;
            > img {
              width: 100%;
            }
          }
          .list-title {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 0.71rem;
            .list-text {
              font-family: PingFang SC;
              font-size: 0.86rem;
              font-weight: 400;
              line-height: 1.2rem;
              color: #ffffff;
            }
            .list-contant {
              font-family: PingFang SC;
              font-size: 0.71rem;
              font-weight: 400;
              line-height: 1rem;
              color: #ffffff99;
            }
          }
        }
        .list-states {
          height: 1.79rem;
          border: 0.07rem solid #ffffff66;
          color: #ffffff99;
          padding: 0.36rem 1.07rem;
          border-radius: 1.5rem;
          font-family: Inter;
          font-size: 0.86rem;
          font-weight: 500;
          line-height: 1;
        }
        .list-statesActive {
          border: 0.07rem solid #ff693e !important;
          color: #ff693e !important;
        }
      }
    }
    .task-rule {
      margin-top: 1.43rem;
      font-family: PingFang SC;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.4rem;
      color: #ffffff;
    }
    .rule-item {
      margin-top: 1.07rem;
      font-family: PingFang SC;
      font-size: 0.86rem;
      font-weight: 400;
      line-height: 1.2rem;
      color: #ffffff99;
    }
  }
}
</style>
