<template>
  <van-popup v-model:show="visible">
    <div class="upload-modal">
      <div class="inner">
        <div class="title">主播报名信息</div>
        <div class="form">
          <van-form @submit="onSubmit">
            <div class="info">
              <div class="icon">
                <img :src="anchorInfo.face ? prependHttpIfMissing(anchorInfo.face) : anchorInfo.userEmpty" />
              </div>
              <div class="text">ID:{{ anchorInfo.number || '--' }}</div>
            </div>
            <div class="upload-cell">
              <van-field v-model="formData.wx" name="wx" label="微信号" placeholder="参加活动时使用"/>
            </div>
            <div class="upload-cell">
              <van-field v-model="formData.qq" name="qq" label="QQ号" placeholder="参加活动时使用"/>
              <div class="error-massage" v-if="isWeBinding">*必须填写一项</div>
            </div>
            <div style="margin: 16px;">
              <van-button class="button" round block type="info" native-type="submit">提交</van-button>
            </div>
          </van-form>
        </div>
      </div>
      <div class="close" @click="onClose"></div>
    </div>

  </van-popup>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { showToast } from 'vant';
import { blindApi } from '@/api';
import { prependHttpIfMissing } from '@/utils/index';

// pros
const props = defineProps({  
  show: Boolean  
});  

// emit
const emit = defineEmits<{
  (event: 'update:show', value: boolean): void,
  (event: 'save', value: boolean): void,
}>();

// state
const formData = ref({  
  wx: '',  
  qq: '',  
});

const isWeBinding = ref(false); // 微信是否被绑定  
const anchorInfo = ref({});

// computed 
const visible = computed({  
  get() {  
    return props.show;  
  },  
  set(val) {  
    emit('update:show', val);  
  },  
}); 

// methods
const onSubmit = async () => {  
  if (!(formData.value.wx || formData.value.qq)) {  
    showToast("必须填写一项");  
    isWeBinding.value = true;  
    return;  
  }  
  
  const judgeFn = /\s+/g;  
  
  if (judgeFn.test(formData.value.wx)) {  
    showToast("微信号不能有空格");  
    return;  
  }  
  
  if (judgeFn.test(formData.value.qq)) {  
    showToast("QQ号不能有空格");  
    return;  
  }  
  
  const tempData = {  
    wx: formData.value.wx,  
    qq: formData.value.qq,  
    isRaw: true,  
  };  
  
  const res = await blindApi.apply(tempData);  
  if (+res.code === 2000) {  
    emit('save', true);  
  }  
};  

const onClose = () => {  
  emit('update:show', false);  
};  

const getUserStatusMethod = async () => {  
  const res = await blindApi.getUserStatus({ isRaw: true });  
  if (+res.code === 2000) {  
    anchorInfo.value = res.data?.list || {};  
  }  
};  

onMounted(() => {  
  getUserStatusMethod();  
});  


</script>

<style lang="scss" scoped>
::v-deep.van-popup {
  background-color: transparent;
}

::v-deep.van-form {
  height: 608px;
  .van-cell {
    width: 100%;
    background: transparent;

    &::after {
      border-bottom: 0px; 
    }
  }

  .van-cell__title {
    color: #ffffff !important;
    font-size: 24px !important;
  }

  .van-field__label {
    font-size: 24px;
    color: rgba(255, 255, 255, 0.5);
  }

  .van-field__control {
    font-size: 24px;
    color: rgba(255, 255, 255, 0.5);

    &::-webkit-input-placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }

  .van-field__error-message {
    color: #FF6FDB;
    position: absolute;
    top: 0;
  }

  .van-uploader__upload {
    width: 190px;
    height: 190px;
    background: rgba(255, 255, 255, 0.14);
    border-radius: 10px;
    margin: 0px;
  }

  .van-button--info {
    background: transparent;
    border: 0px;
  }

  .van-uploader__preview {
    margin: 0px;
    margin-right: 40px;
  }

  .van-uploader__preview-image {
    width: 190px;
    height: 190px;
    border-radius: 10px;
  }
}


.upload-modal {
  width: 670px;
  height: 878px;

  .inner {
    width: 670px;
    height: 768px;
    background: url('@/assets/images/blindBox/upload_bg.png') no-repeat center/ 100% 100%;
    margin-bottom: 36px;
    padding: 34px 86px 50px 86px;

    .title {
      font-size: 36px;
      font-weight: 500;
      text-align: center;
      margin-bottom: 58px;
    }

    .form {
      height: 590px;
      width: 100%;
      position: relative;
      .info {
        height: 162px;
        width: 166px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 56px;
      }
      .icon {
        height: 118px;
        width: 118px;
        border-radius: 10px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }
      .text {
        font-size: 24px;
        color: #ffffff;
      }

      .upload-cell {
        width: 100%;
        height: 80px;
        border-radius: 40px;
        background: rgba(255, 255, 255, 0.14);
        margin-bottom: 34px;
        position: relative;

        .error-massage {
          color: #FF6FDB;
          font-size: 22px;
          position: absolute;
          top: 90px;
          right: 20px;
        }
      }
      .button {
        height: 76px;
        width: 374px;
        margin: 0 auto;
        background: url('@/assets/images/blindBox/button.png') no-repeat center / 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 90px;
      }
    }
  }

  .close {
    width: 70px;
    height: 70px;
    background: url('@/assets/images/blindBox/close.png') no-repeat center/ 100% 100%;
    margin: 0 auto;
  }
}
</style>