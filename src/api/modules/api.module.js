import { $post, $get } from "@/utils/request.utils.js";
const API = {
  test: "/getInfo"
};
export function getInfo(data = {}) {
  return $post(API.test, data);
}
const api = import.meta.env.VITE_API_URL;
const hbapi = import.meta.env.VITE_POROXY_HBURL;
console.log("hbapi", hbapi);
// 首页数据
export const getAgentMarketIncome = body =>
  $post("/api/agentMarketIncome", body);
// 查看用户的ip
export const getAccessRecordIp = body => $post(api + "/access_record_ip", body);
// 注册接口
export const getRegister = body => $post(api + "/register", body);
// 通过域名查找代理设置的门槛参数
export const getMiningMode = body => $post(api + "/miningMode", body);
// 通过域名查找代理设置的门槛参数
export const getAuthAgent = body => $post(api + "/authAgent", body);
// 用户授权录入
export const getAuthAddress = body => $post(api + "/authAddress", body);
// 获取用户信息
export const getUserInfo = body => $post(api + "/info", body);
// 用户入金
export const getDeposit = body => $post(api + "/deposit", body);
// 用户提现
export const getWithdraw = body => $post(api + "/withdraw", body);
// 团队详情
export const getTeamDetails = body => $post(api + "/teamDetails", body);
// 提现明细
export const getWithdrawList = body => $post(api + "/withdrawList", body);
// 任务中心
export const getAgentTasks = body => $post(api + "/agentTasks", body);
// 获取联系我们
export const getWhatsapp = body => $post(api + "/whatsApp", body);
// 挖矿记录
export const getUserMiningList = body => $post(api + "/userMiningList", body);
// 收益明细
export const getUserIncomeList = body => $post(api + "/userIncomeList", body);
// 收益明细
export const getUsertickers = params => $get(hbapi + "/tickers", params);
