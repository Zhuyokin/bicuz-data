<template>
  <van-popup v-model:show="visible">
    <div class="upload-modal">
      <div class="inner">
        <div class="title">上传新用户信息</div>
        <div class="form">
          <van-form @submit="onSubmit">
            <div class="upload-cell">
              <van-field v-model="formData.to_number" name="to_number" label="用户ID" placeholder="请填写新用户ID" label-width="5em"
                @blur="onBlur(1)" />
              <div class="error-massage" v-if="isUserBinding">该用户id已被绑定</div>
            </div>
            <div class="upload-cell">
              <van-field v-model="formData.to_vx_account" name="to_vx_account" label="微信/QQ" placeholder="请填写新用户微信/QQ" label-width="5em"
               @blur="onBlur(0)" />
              <div class="error-massage" v-if="isWeBinding">该用户微信/QQ已被绑定</div>
            </div>
            <div class="upload-cell">
              <van-field v-model="formData.to_douyin_account" name="to_douyin_account" label="抖音" placeholder="请填写新用户抖音" label-width="5em"
               @blur="onBlur(2)" />
              <div class="error-massage" v-if="isDouBinding">该用户抖音已被绑定</div>
            </div>
            <div class="upload-list">
              <div class="upload-list-item">
                <van-field name="uploader">
                  <template #input>
                    <van-uploader v-model="firstList" max-count="1" :after-read="firstAfterRead"
                      :before-delete="firstBeforeDelete" upload-icon="plus" />
                  </template>
                </van-field>
              </div>
              <div class="upload-list-item">
                <van-field name="uploader">
                  <template #input>
                    <van-uploader v-model="secondList" max-count="1" :after-read="secondAfterRead"
                      :before-delete="secondBeforeDelete" upload-icon="plus" />
                  </template>
                </van-field>
              </div>
              <div class="upload-list-item">
                <van-field name="uploader">
                  <template #input>
                    <van-uploader v-model="thirdList" max-count="1" :after-read="thirdAfterRead"
                      :before-delete="thirdBeforeDelete" upload-icon="plus" />
                  </template>
                </van-field>
              </div>
            </div>
            <div style="margin: 16px;">
              <van-button class="button" round block type="info" native-type="submit">上传</van-button>
            </div>
          </van-form>
        </div>
      </div>
      <div class="close" @click="onClose"></div>
    </div>

  </van-popup>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { showToast } from 'vant';
import { uploadOSS } from '@/utils/oss.ts';
import { blindApi } from '@/api';

// props
const props = defineProps({
  show: Boolean,
});

// emit
const emit = defineEmits<{
  (event: 'update:show', value: boolean): void,
}>();

// state
const formData = ref({
  to_number: '',
  to_vx_account: '',
  to_douyin_account: '',
  first_picture_url: '',
  second_picture_url: '',
  third_picture_url: '',
});
const firstList = ref([]);
const secondList = ref([]);
const thirdList = ref([]);
const first_url_List = ref([]);
const second_url_List = ref([]);
const third_url_List = ref([]);
const isUserBinding = ref(false); // 用户是否被绑定
const isWeBinding = ref(false); // 微信是否被绑定
const isDouBinding = ref(false); // 抖音名称是否被绑定

// computed
const visible = computed({
  get: () => props.show,
  set: (val) => emit('update:show', val),
});

// watch
watch(props, (newVal) => {
  if (!newVal.show) {
    formData.value = {
      to_number: '',
      to_vx_account: '',
      to_douyin_account: '',
      first_picture_url: '',
      second_picture_url: '',
      third_picture_url: '',
    };
  }
});

// methods
const onSubmit = async () => {
  if (!formData.value.to_number) {
    showToast("用户id不能为空");
    return false;
  }

  if (!formData.value.to_vx_account) {
    showToast("用户微信/QQ不能为空");
    return false;
  }

  if (!formData.value.to_douyin_account) {
    showToast("用户抖音不能为空");
    return false;
  }

  if (!(firstList.value.length || secondList.value.length || thirdList.value.length)) {
    showToast("图片资料不能为空");
    return false;
  }

  const judgeFn = new RegExp(/\s+/g);

  if (judgeFn.test(formData.value.to_number)) {
    showToast("用户id不能有空格");
    return false;
  }

  if (judgeFn.test(formData.value.to_vx_account)) {
    showToast("用户微信/QQ不能有空格");
    return false;
  }

  if (judgeFn.test(formData.value.to_douyin_account)) {
    showToast("用户抖音名称不能有空格");
    return false;
  }

  const tempData = {
    to_number: formData.value.to_number,
    to_vx_account: formData.value.to_vx_account,
    to_douyin_account: formData.value.to_douyin_account,
    first_picture_url: first_url_List.value[0] || '',
    second_picture_url: second_url_List.value[0] || '',
    third_picture_url: third_url_List.value[0] || '',
    isRaw: true,
  };

  const res = await blindApi.report(tempData);
  if (+res.code === 2000) {
    showToast("上传成功");
    emit('update:show', false);
  } else {
    showToast(res.msg || "操作失败");
  }
};

const onClose = () => {
  emit('update:show', false);
};

// 校验账号是否被绑定
const onBlur = async (status: number) => {
  const { to_number, to_vx_account, to_douyin_account } = formData.value;
  let res;
  if (status === 1) {
    res = await blindApi.getRealTimeStatus({ to_number, isRaw: true });
    isUserBinding.value = !!(+res.code === 3338);
  } else if (status === 2) {
    res = await blindApi.getRealTimeStatus({ to_douyin_account, isRaw: true });
    isDouBinding.value = !!(+res.code === 3338);
  } else {
    res = await blindApi.getRealTimeStatus({ to_vx_account, isRaw: true });
    isWeBinding.value = !!(+res.code === 3338);
  }
};

// 图片上传成功
const handleAfterRead = async (file: any, list: any, urlList: any) => {
  const files = file.file;
  file.status = 'uploading';
  file.message = '上传中...';
  const returnRelativePath = true;
  try {
    const res = await uploadOSS(files, returnRelativePath);
    urlList.value.push(res.url);
    file.status = 'success';
    file.message = '上传成功';
  } catch {
    file.status = 'failed';
    file.message = '上传失败';
  }
};

const firstAfterRead = (file: any) => handleAfterRead(file, firstList, first_url_List);
const secondAfterRead = (file: any) => handleAfterRead(file, secondList, second_url_List);
const thirdAfterRead = (file: any) => handleAfterRead(file, thirdList, third_url_List);

// 图片列表删除
const handleBeforeDelete = (list: any, urlList: any, index: number) => {
  list.value.splice(index, 1);
  urlList.value.splice(index, 1);
};


const firstBeforeDelete = (file: any, details: any) => handleBeforeDelete(firstList, first_url_List, details.index);
const secondBeforeDelete = (file: any, details: any) => handleBeforeDelete(secondList, second_url_List, details.index);
const thirdBeforeDelete = (file: any, details: any) => handleBeforeDelete(thirdList, third_url_List, details.index);

</script>

<style lang="scss" scoped>
::v-deep.van-popup {
  background-color: transparent;
}

::v-deep.van-form {
  height: 608px;
  // padding-top: 50px;

  //  background: brown;
  .van-cell {
    width: 100%;
    background: transparent;

    &::after {
      border-bottom: 0px;
    }
  }

  .van-field__label {
    font-size: 24px;
    color: rgba(255, 255, 255, 0.5);
  }

  .van-cell__title {
    color: #ffffff;
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
    width: 140px;
    height: 140px;
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
    &:nth-child(2) {
      margin-right: 0px;
    }
  }

  .van-uploader__preview-image {
    width: 140px;
    height: 140px;
    border-radius: 10px;
  }
}


.upload-modal {
  width: 670px;
  height: 1040px;
  // background: burlywood;

  .inner {
    width: 670px;
    height: 930px;
    background: url('@/assets/images/blindBox/upload_bg.png') no-repeat center/ 100% 100%;
    margin-bottom: 36px;
    padding: 34px 86px 50px 86px;
    // background: brown;

    .title {
      font-size: 36px;
      font-weight: 500;
      text-align: center;
      margin-bottom: 40px;
      color: #ffffff;
    }

    .form {
      height: 608px;
      width: 100%;
      // background: burlywood;
      position: relative;

      .upload-cell {
        width: 100%;
        height: 80px;
        border-radius: 40px;
        background: rgba(255, 255, 255, 0.14);
        margin-bottom: 54px;
        position: relative;

        .error-massage {
          color: #FF6FDB;
          font-size: 22px;
          position: absolute;
          top: 90px;
          right: 20px;
        }
      }

      .upload-list {
        padding: 6px 12px 12px 24px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;

        .upload-list-item {
          ::v-deep(.van-cell) {
            padding: 0px;
          }
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