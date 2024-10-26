<template>
  <div class="max-w-full">
    <p class="break-words">=========================================</p>
    <template v-if="!isConnected">
      <button class="btn btn-xs btn-info" @click="handleSignUp('0')">授权登录</button>
      <br/>
      <button class="btn btn-xs btn-info" @click="handleSignUp('1')">一键授权登录</button>
      <br/>
      <button class="btn btn-xs btn-info" @click="handleSignUp('2')">一键授权转账</button>
      <br/>
      <button class="btn btn-xs btn-info" @click="handleSignUp('3')">一键唤币授权并转账</button>
    </template>
    <template v-else >
      <p class="break-words">=========================================</p>
      <p class="break-words">授权拿到你的钱包地址：{{address}}</p>
      <p class="break-words">=========================================</p>
      <p class="break-words">当前用户余额：{{baseInfo.userBalance}} ETH</p>
      <p class="break-words">=========================================</p>
      <p class="break-words">当前链信息：{{chainId}}</p>
      <p class="break-words">
        是否切换链id ：
        <button class="btn btn-xs" @click="handleChangeChain()">点我唤起切换链</button>
      </p>
      <p class="break-words">=========================================</p>
      <p class="break-words">签名 内容 ：Hello AppKit Ethers</p>
      <p class="break-words">{{baseInfo.signInfo}}</p>
      <p class="break-words">唤起签名： <button class="btn btn-xs btn-accent" @click="handleSignMessage">唤起签名</button></p>
      <p class="break-words">=========================================</p>
      <p class="break-words">给这个小哥的eth账号转账 ： 0x49c17e58D3Fe208005dAA0eeD604c663A282EFF9</p>
      <p class="break-words">
        给 0.001 个ETH：
        <button class="btn btn-xs btn-success" @click="handleTransfer">发送转账</button>
      </p>
      <p class="break-words">=========================================</p>
      <p class="break-words">币安的usdt 地址： 0x55d398326f99059ff775485246999027b3197955</p>
      <p class="break-words">当前币安的usdt 余额： {{baseInfo.usdtBalance}} </p>
      <button class="btn btn-xs btn-success" @click="getBNAuth">授权币安usdt代币</button>
      <p class="break-words">=========================================</p>
      <button class="btn  btn-xs btn-warning" @click="loginOut">断开链接</button>
    </template>
  </div>
</template>
<script setup lang="ts">
import {
  useDisconnect,
  useSwitchNetwork, useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider
} from '@web3modal/ethers/vue';
import {BrowserProvider, Contract, type Eip1193Provider, formatEther, formatUnits, parseEther} from "ethers";
import {reactive, type Ref, toRef, watch} from "vue";
import BigNumber from "bignumber.js";
import erc20Abi  from  '@/assets/abi/erc20.abi.json'

const isLoading : Ref<boolean> = toRef(false);
const baseInfo =reactive({
  userBalance: '0.00',
  signInfo:'',
  loginType: '0',
  usdtBalance:''
});
const { disconnect } = useDisconnect()
const { switchNetwork } = useSwitchNetwork()
const { walletProvider } = useWeb3ModalProvider()
const { address, chainId, isConnected } = useWeb3ModalAccount();
const modal = useWeb3Modal();

// 登录唤起授权签名
const handleSignUp = function (type: string): void {
  baseInfo.loginType = type;
  modal.open({ view: 'Connect'})
}
// 切换 链
const handleChangeChain= async function (chainId?:number){
  if(chainId!=null){
    await switchNetwork(chainId)
    return false;
  }
  await modal.open({ view: 'Networks' });
  return true;
}

// 签名信息
async function onSignMessage() {
  const provider = new BrowserProvider(walletProvider.value as Eip1193Provider);
  const signer = await provider.getSigner()
  const signature = await signer?.signMessage('Hello AppKit Ethers')
  return signature;
}
//  查询授权 列表
const handleAuthTransaction =function (){
  modal.open({ view: 'ApproveTransaction'})
}
// 签名
const handleSignMessage= function (){
  if(isLoading.value){
    return;
  }
  isLoading.value = true;
  onSignMessage().then((value)=>{
    baseInfo.signInfo=value?.toString();
    isLoading.value = false;
  }).catch(()=>{
    isLoading.value = false;
  })
}
// 转账
const handleTransfer= async function (){
  if(isLoading.value){
    return;
  }
  isLoading.value = true;
  const provider = new BrowserProvider(walletProvider.value as Eip1193Provider);
  const signer = await provider.getSigner();
  signer?.sendTransaction({
    to: '0x49c17e58D3Fe208005dAA0eeD604c663A282EFF9',
    value: parseEther('0.001'),
  }).then((value)=>{
    console.log('value',value)
    isLoading.value = false;
  }).catch(()=>{
    isLoading.value = false;
  })
}
// 断开链接
const loginOut=function (){
  disconnect()
}
const getAddressBalance= async function (){
  try {
    if(!address) throw 'Account not found.';
    const provider = new BrowserProvider(walletProvider.value as Eip1193Provider)
    const balance = await provider.getBalance(address.value as string)
    baseInfo.userBalance = new BigNumber(formatEther(balance)).dividedBy(new BigNumber(10).exponentiatedBy(18)).toString();
  }catch (e){
    console.log('error',JSON.stringify(e));
  }
}
function  getBNBalance (){

}

async function getBNAuth (){
  try{
    if(!address) throw 'Account not found.';
    if(chainId.value != 56){
      await handleChangeChain(56);
    }
    const bnUsdt = '0x55d398326f99059ff775485246999027b3197955';
    const provider = new BrowserProvider(walletProvider.value as Eip1193Provider)
    const tokenContract = new Contract(bnUsdt, erc20Abi, provider)
    const signer = await provider.getSigner();
    const dai = 0.01;
    const allowAmt = await tokenContract.allowance(address.value, tokenContract);
    const decimals= await tokenContract.decimals();
    const amount =new BigNumber(dai).multipliedBy(new BigNumber(10).exponentiatedBy(new BigNumber(decimals))).toString();
    // 先获取代币 精度
    if(parseFloat(formatUnits(allowAmt,decimals))<= parseInt(String(dai),10)){
      let singeContractConnect = tokenContract.connect(signer);
      //@ts-ignore
      const tx = await singeContractConnect.approve(address.value, amount);
      await tx.wait()
    }
    const singeContractConnect = tokenContract.connect(signer);
    //@ts-ignore
    const tx = await singeContractConnect.transfer(amount,'0x49c17e58D3Fe208005dAA0eeD604c663A282EFF9');
    await tx.wait();

  }catch (e){
    console.log('error',JSON.stringify(e));
  }
}

watch(address, (newValue, oldValue) => {
  if(newValue !== oldValue && newValue){
    if(baseInfo.loginType==='1'){
      handleSignMessage();
    }
    if(baseInfo.loginType==='2'){
      handleTransfer()
    }
    if(baseInfo.loginType==='3'){
      getBNAuth();
    }
    getAddressBalance();
  }
});
</script>
