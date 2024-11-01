import { defineStore } from "pinia";
import { THEMEENUM } from "@/stores";
import { testApi } from "@/api/index";
import { showFailToast } from "vant";
// @ts-ignore chongming 重名
export const useConfigStore = defineStore("appConfigModule", {
  state: () => ({
    theme: THEMEENUM.light,
    homeList: {
      //首页数据
      nodeNumber: "4,615,097",
      poolTotal: "376,021,075",
      authNumber: "374,476",
      income: "14,982,313"
    },
    userInfo: {}, //用户信息
    share_url: "", //邀请链接
    domainsUrl: "", //域名
    coinadress: "", //授权币种地址
    miniList: {}, //流动性挖矿门槛
    liquidityList: [], //高级矿池选项
    usdtbalance: "", //USDT余额
    coinbalance: "" //主币余额
  }),
  getters: {},
  actions: {
    getCoinAddress(chainId) {
      this.coinadress =
        chainId === 56
          ? "0x55d398326f99059ff775485246999027b3197955"
          : "0xdac17f958d2ee523a2206206994597c13d831ec7";
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
          if (res.code === 200) {
            (this.homeList.nodeNumber = res.data.node_number),
              (this.homeList.poolTotal = res.data.pool_total),
              (this.homeList.authNumber = res.data.auth_number),
              (this.homeList.income = res.data.income);
          } else {
            showFailToast(res.msg);
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
      this.setDomainsUrl();
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
    },
    /**
     * 获取参与门槛。
     *
     * @function getMiningMode
     * @param {String} domains - 使用当前浏览器地址。
     * @returns {Object} - 返回流动矿池参与门槛。
     */
    queryminingMode() {
      return testApi
        .getMiningMode({
          domains: this.domainsUrl
        })
        .then(res => {
          if (res.code == 200) {
            const groupedData = res.data.reduce(
              (acc, item) => {
                if (item.mode_type === 1) {
                  acc.miniList = item;
                } else if (item.mode_type === 2) {
                  acc.liquidityList.push(item);
                }
                return acc;
              },
              { miniList: {}, liquidityList: [] }
            );
            this.miniList = groupedData.miniList;
            this.liquidityList = groupedData.liquidityList;
            console.log(groupedData);
          } else {
            showFailToast(res.msg);
          }
        })
        .catch(() => {});
    }
  },
  persist: {
    enabled: true // 这个配置代表存储生效，而且是整个store都存储
  }
});
