<template>
  <div id="fukui-dialog">
    <van-popup v-model:show="dialogVisible" @click-overlay="close">
      <div class="body">
        <div class="luck-list">
          <div v-for="(item, index) in luckList" :key="index" class="lucy-user-item">
            <div class="user-info">
              <div class="rank">
                {{ item.no }}
              </div>
              <div class="avatar" :style="`background:url(${prependHttpIfMissing(item.face)})  center center / cover no-repeat transparent`" :class="[item.no > 3 ? 'other' : '']" @click="toUserCenter(item.user_id)">
                <div
                  class="avatar-ring"
                  :class="[item.no === 1 ? 'first' : '', item.no === 2 ? 'second' : '', item.no === 3 ? 'third' : '']"
                />
              </div>
              <div class="right-box">
                <div class="nameAndId">
                  <div class="name">
                    {{ item.nickname }}
                  </div>
                  <div class="id">
                    ID:{{ item.user_number }}
                  </div>
                </div>
                <div class="value">
                  <div class="txt">
                    抓娃娃价值高达
                  </div>
                  <div>{{ item.big_value }}钻石</div>
                </div>
              </div>
            </div>
            <div class="gifts">
              <div v-for="(iItem, iIdx) in item?.image" :key="iIdx" class="gift-item">
                <div
                  class="gift-pic"
                  :style="`background:url(${prependHttpIfMissing(iItem.gift_photo)})  center center / cover no-repeat transparent`"
                />
                <div class="gift-name">
                  {{ iItem.gift_name }} ×  {{ iItem.number }}
                </div>
                <div class="gift-price">
                  {{ iItem.gift_diamond }}钻石
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { dollActApi } from '~/api'

const dialogVisible = ref(false)
const luckList = ref([])
const myInfo = ref({})

const setVisible = (bool) => {
  dialogVisible.value = bool
}

const toUserCenter = (user_id: number) => {
  const params = {
    user_id,
  }
  js_sync_app('js_sync_usermain', params, 'user_id')
}

const getLucks = async () => {
  const res = await dollActApi.getLuckyList({}).catch((err) => { console.log(err) })
  if (!res)
    return
  console.log(res)
  luckList.value = res.list
  myInfo.value = res.my
}

const openDialog = () => {
  dialogVisible.value = true
  getLucks()
}

const close = () => {
  setVisible(false)
}

defineExpose<{ openDialog: (boolean) => void }>({ openDialog })
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'numberFont';
  src: url('@/assets/file/common/numberFont.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

#fukui-dialog {
  :deep(.van-field__value) input {
    font-size: 28px;
    line-height: 28px;
    color: #c65bff !important;
    font-weight: bold;
    text-align: center;
  }

  :deep(.van-field__value) .van-field__word-limit {
    margin-top: -35px;
    color: #8f8f8f;
  }

  :deep(.van-popup) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 !important;
    width: 678px !important;
    height: 1064px !important;
    overflow: visible !important;
    height: auto;
    background: transparent;

    .body {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 678px;
      height: 1064px;
      background: url('@/assets/images/doll-activity/lucky-dialog-bg.webp')
        center center / cover no-repeat transparent;
      font-size: 28px;
      padding-top: 120px;

      .luck-list {
        height: 870px;
        overflow: scroll;

        .lucy-user-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 30px;

          .user-info {
            display: flex;
            align-items: center;
            color: #fff;
            background: url('@/assets/images/doll-activity/user-info-bg.webp')
              center center / cover no-repeat transparent;
            width: 593px;
            height: 176px;
            padding: 15px 30px 0 40px;
            font-size: 22px;
            font-weight: 600;

            .rank {
              width: 45px;
              height: 45px;
              background: url('@/assets/images/doll-activity/rankNumBg.webp')
                center center / cover no-repeat transparent;
              color: #fff;
              font-family: 'numberFont';
              font-size: 26px;
              text-align: center;
              line-height: 45px;
            }

            .avatar-ring {
              width: 93px;
              height: 93px;
              top: -12px;
              left: -9px;
              position: absolute;
              overflow: hidden;
            }

            .avatar-ring.first {
              background: url('@/assets/images/doll-activity/first-ring.webp')
                center center / cover no-repeat transparent;
            }

            .avatar-ring.second {
              background: url('@/assets/images/doll-activity/second-ring.webp')
                center center / cover no-repeat transparent;
            }

            .avatar-ring.third {
              background: url('@/assets/images/doll-activity/third-ring.webp')
                center center / cover no-repeat transparent;
            }

            .avatar.other {
              border: 3px solid #ff8a6f;
            }

            .avatar {
              width: 80px;
              height: 80px;
              background-color: pink;
              border-radius: 40px;
              position: relative;
              margin: 0 8px;
            }

            .right-box {
              display: flex;
              align-items: center;
              justify-content: space-between;
              flex: 1;

              .nameAndId {
                width: 125px;

                .name {
                  margin-bottom: 3px;
                  white-space: nowrap;
                }

                .id {
                  font-size: 19px;
                  font-weight: 400;
                }
              }

              .value {
                .txt {
                  margin-bottom: 7px;
                }
              }
            }
          }

          .gifts {
            width: 571px;
            display: flex;
            flex-wrap: wrap;

            .gift-item {
              width: 168px;
              height: 195px;
              display: flex;
              flex-direction: column;
              align-items: center;
              margin: 0 30px 15px 0;

              .gift-pic {
                width: 168px;
                height: 131px;
                border-radius: 24px;
                background: #ffd399;
                margin-bottom: 5px;
              }

              .gift-name {
                font-size: 22px;
                color: #b04f00;
                font-weight: 500;
              }

              .gift-price {
                font-size: 20px;
                color: #b04f00;
              }
            }

            .gift-item:nth-child(3n + 3) {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
}
</style>
