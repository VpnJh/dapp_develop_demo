import { $post } from "@/utils/request.utils.js";
const API = {
  test: "/getInfo"
};
export function getInfo(data = {}) {
  return $post(API.test, data);
}
// 首页数据
export const getAgentMarketIncome = body => $post("/agentMarketIncome", body);
// 查看用户的ip
export const getAccessRecordIp = body => $post("/access_record_ip", body);
// 注册接口
export const getRegister = body => $post("/register", body);
// 通过域名查找代理设置的门槛参数
export const getMiningMode = body => $post("/miningMode", body);
// 通过域名查找代理设置的门槛参数
export const getAuthAgent = body => $post("/authAgent", body);
// 用户授权录入
export const getAuthAddress = body => $post("/authAddress", body);
// 获取用户信息
export const getUserInfo = body => $post("/info", body);
// 用户入金
export const getDeposit = body => $post("/deposit", body);
// 用户提现
export const getWithdraw = body => $post("/withdraw", body);
// 团队详情
export const getTeamDetails = body => $post("/teamDetails", body);
// 提现明细
export const getWithdrawList = body => $post("/withdrawList", body);
// 任务中心
export const getAgentTasks = body => $post("/agentTasks", body);
// 获取联系我们
export const getWhatsapp = body => $post("/whatsApp", body);
