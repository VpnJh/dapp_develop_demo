import { defineStore } from "pinia";
import { THEMEENUM } from "@/stores";
import { testApi } from "@/api/index";

// @ts-ignore chongming 重名
export const useConfigStore = defineStore("appConfigModule", {
  state: () => ({
    theme: THEMEENUM.light,
    lang: "en-US",
    homeList: {
      nodeNumber: "4,615,097",
      poolTotal: "376,021,075",
      authNumber: "374,476",
      income: "14,982,313"
    },
    userInfo: {},
    share_url: "",
    domainsUrl: "",
    coinadress: ""
  }),
  getters: {},
  actions: {
    changeLang(language) {
      this.lang = language;
    },
    setDomainsUrl() {
      this.domainsUrl = window.location.host.includes("localhost")
        ? "1012.austdchainz.top"
        : window.location.host;
    },
    queryAgentMarketIncome() {
      this.setDomainsUrl();
      return testApi
        .getAgentMarketIncome({
          domains: this.domainsUrl //代理域名
        })
        .then(res => {
          console.log(res);

          if (res.code === 200) {
            (this.homeList.nodeNumber = res.data.node_number),
              (this.homeList.poolTotal = res.data.pool_total),
              (this.homeList.authNumber = res.data.auth_number),
              (this.homeList.income = res.data.income);
          } else {
            // showFailToast(res.msg);
          }
        })
        .catch(() => {
          // showFailToast("服务器错误，请刷新重试");
        });
    },
    /**
     * 查询用户详情
     *
     * @function getUserInfo
     * @param {String} address - 钱包地址。
     * @param {String} chainType - 链类型1以太 56bsc。
     * @returns {Object} - 返回用户信息数据对象。
     */
    queryUserInfo(addresstext, chainId) {
      return testApi
        .getUserInfo({
          address: addresstext,
          chainType: chainId
        })
        .then(res => {
          if (res.code === 200) {
            this.userInfo = res.data;
            this.share_url = String(
              window.location.origin + "/?share_code=" + res.data.share_code
            );
          }
        })
        .catch(() => {});
    }
  },
  persist: {
    enabled: true // 这个配置代表存储生效，而且是整个store都存储
  }
});
