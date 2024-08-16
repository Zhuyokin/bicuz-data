<template>
  <div class="blind-box">
    <div class="blind-wrap">
      <div class="blind-inner">
        <div class="blind-bottom">
          <template v-for="item in renderOptions">
            <div class="blind-btn" @click="handleUpload(item.type)">
              <img :src="item.url">
            </div>
            <div class="blind-text">
              {{ item.content_text }}
            </div>
          </template>
        </div>
      </div>
    </div>
    <!-- 上传新用户信息 -->
    <uploadModal ref="uploadRef" v-if="isUploadVisible" v-model:show="isUploadVisible" />
    <!-- 申请活动 -->
    <applyModal ref="applyRef" v-if="isApplyMVisible" v-model:show="isApplyMVisible" @save="saveCallBack" />

    <!-- 登录框 -->
    <van-dialog class="loginPop" v-model="isLogin" :show-cancel-button="false" :showConfirmButton="false">
      <div class="loginCancel" @click="isLogin = false">
        <img src="@/assets/images/blindBox/cancel_btn.png" />
      </div>
      <div class="loginMain">
        <div class="loginHead">
          <div class="loginTitle">请使用AIMI语音账号登录</div>
          <div class="loginIcon"><img src="@/assets/images/blindBox/logo.png" /></div>
        </div>
        <div class="loginCenter">
          <div class="account">
            <van-field v-model="accountNum" type="number" placeholder="请输入ID号" />
          </div>
          <div class="password">
            <van-field v-model="passwordNum" clearable type="password" placeholder="请输入密码"
              onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')"
              onpaste="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')"
              oninput="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" />
          </div>
        </div>
      </div>
      <div class="loginFooter" :class="(accountNum !== '' && passwordNum !== '') ? 'active' : ''"
        @click="getH5GuildUserLogin">登录</div>
      <div class="loginTips">本活动仅限公会成员参加</div>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { showToast } from 'vant';
import { loginApi, blindApi } from '@/api';
import { useHandleData } from '@/composables/handleData';
import uploadModal from './components/uploadModal.vue';
import applyModal from './components/applyModal.vue';
import btn1 from '@/assets/images/blindBox/btn1.png';
import btn4 from '@/assets/images/blindBox/btn4.png';
import btn2 from '@/assets/images/blindBox/btn2.png';
import btn3 from '@/assets/images/blindBox/btn3.png';

interface MessageOption {
  content_text: string;
  url: string;
  type: number;
}

const route = useRoute();
const isUploadVisible = ref(false);
const isApplyMVisible = ref(false);
const msgType = ref(0);
const renderOptions = ref<MessageOption[]>([]);
const isLogin = ref(false);
const accountNum = ref("");
const passwordNum = ref("");

const messageOptions: MessageOption[] = [
  {
    content_text: '您不符合参与条件，暂不能参与活动哦～',
    url: btn1,
    type: 0
  },
  {
    content_text: '您上周排档时间不足五小时，暂不能参与活动，请下周再来哦～',
    url: btn1,
    type: 1
  },
  {
    content_text: '您上周排档时间已满五小时，快去参加活动吧',
    url: btn4,
    type: 2
  },
  {
    content_text: '您的活动申请正在审核中，请关注活动页面查看通过状态。',
    url: btn2,
    type: 3
  },
  {
    content_text: '您上周排档时间已满五小时，申请已通过，正在参加活动。',
    url: btn3,
    type: 4
  },
  {
    content_text: '您上周排档时间已满五小时，申请已通过，正在参加活动。',
    url: btn4,
    type: 5
  }
];

// hook使用
// useHandleData(true)

onMounted(() => {
  initQueryData();
  // 是否显示登录框
  if (route.query.loginType == "login") {
    isLogin.value = true;
  }
})

/**
 * @description 参数说明
 * @param isGuildUser ==> 1:是主播 0:不是主播
 * @param isExist ==> 1:参加过活动 0:未参加过活动
 * @param lastWeekOnlineTime ==> 排挡时间
 * @param progress ==> 1:已通过 0:未审核/审核中
 * */

 const processQueryData = (queryData: any) : number  => {  
  if (+queryData.isGuildUser === 1) { // 是主播
    if (+queryData.isExist === 0) { // 未参加过活动
      if (+queryData.lastWeekOnlineTime < 5) {  
        return 1; // 排挡时间小于五小时  
      } else if (+queryData.lastWeekOnlineTime >= 5) {  
        return 2; // 排挡时间大于等于五小时 
      }  
    } else if (+queryData.isExist === 1) { // 参加过活动  
      if (+queryData.progress === 0) {  
        return 3; // 未审核/审核中  
      } else if (+queryData.progress === 1) {  
        return 4; // 已通过  
      }  
    }  
  }  
  return 0;
}; 

// 初始化查询数据
const initQueryData = async () => {
  try {
    let response = await blindApi.getUserStatus({ isRaw: true });
    if (+response.code === 2000) {
      const queryData = response.data?.list;
      const msgTypeValue = processQueryData(queryData);
      msgType.value = msgTypeValue;  
      const data = messageOptions.filter(item => item.type === msgTypeValue);  
      renderOptions.value = data;
    }
  } catch (error) {
    console.log(error);
  }
};


// 处理保存回调
const saveCallBack = (status: boolean) => {
  if (status) {
    isApplyMVisible.value = false;
    showToast('提交成功，正在等待审核');
    initQueryData();
  }
};

// 处理上传
const handleUpload = async (type: number) => {
  if (type === 4) {
    isUploadVisible.value = true;
  } else if (type === 2) {
    isApplyMVisible.value = true;
  }
};


// 弹出登录框
const getH5GuildUserLogin = async () => {
  if (accountNum.value === '' || passwordNum.value === '') {
    showToast("请输入有效的账户和密码");
    return;
  }
  let params = {
    user_number: accountNum.value,
    password: passwordNum.value,
    isRaw: true,
  }
  let res = await loginApi.h5GuildUserLogin(params);
  if (+res.code == 2000) {
    showToast("登录成功");
    sessionStorage.setItem('token', res.data.token);
    initQueryData();
    isLogin.value = false;
  }
};

</script>

<style lang="scss" scoped>
.blind-box {
  height: 3222px;
  width: 100%;
  background: linear-gradient(180deg, #ffffff 0%, #fffff0 100%);

  .blind-wrap {
    width: 100%;
    height: 2976px;
    background: url('@/assets/images/blindBox/blind_bg.png') no-repeat center / 100% 100%;
    position: relative;

    .blind-inner {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 246px;
      background: linear-gradient(180deg, #ffffff 0%, #fffff0 100%);
      border-radius: 10px 10px 0px 0px;
      padding: 132px 30px;
      display: flex;
      align-items: center;
      justify-content: center;

      .blind-bottom {
        width: 524px;
        height: 182px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .blind-btn {
          width: 436px;
          height: 94px;
          margin-bottom: 30px;

          img {
            width: 100%;
            height: 100%;
          }

          &:active {
            transform: scale(0.95);
          }
        }

        .blind-text {
          font-size: 24px;
          text-align: center;
          color: #000000;
        }
      }
    }
  }

  .loginPop {
    width: 627px;
    height: 880px;
    border-radius: 0;
    background: #fff;

    .loginMain {
      .loginHead {
        margin-top: 90px;

        .loginTitle {
          font-weight: 600;
          font-size: 30px;
          text-align: center;
          color: #000000;
        }

        .loginIcon {
          margin: auto;
          margin-top: 40px;
          width: 113px;
          height: 113px;

          img {
            width: 113px;
            height: 113px;
            border-radius: 10px;
          }
        }
      }

      .loginCenter {
        width: 482px;
        height: 170px;
        margin: auto;
        margin-top: 85px;

        .account,
        .password {
          height: 60px;

          ::v-deep(.van-field) {
            padding: 0;
            height: 60px;

            .van-field__value {
              height: 60px;

              .van-field__body {
                height: 60px;

                input {
                  border: none;
                  height: 60px;
                  border-bottom: solid 1px #CCCCCC;
                  width: 482px;
                  color: #000000;
                }
              }
            }
          }
        }

        .password {
          margin-top: 48px;
        }

      }
    }

    .loginFooter {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 150px;
      margin: auto;
      width: 482px;
      height: 95px;
      line-height: 95px;
      text-align: center;
      font-size: 30px;
      border-radius: 47.5px;
      background: #ccc;
    }

    .loginFooter.active {
      background: #FF3565;
    }

    .loginFooter:active {
      transform: scale(0.98);
    }

    .loginTips {
      position: absolute;
      left: 0;
      right: 0;
      color: #000000;
      font-size: 25px;
      text-align: center;
      bottom: 50px;
    }

    .loginCancel {
      position: absolute;
      top: 30px;
      right: 30px;

      img {
        width: 25px;
        height: 25px;
      }
    }
  }
}
</style>