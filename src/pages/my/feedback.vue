<template>
  <view class="content">
    <textarea class="content-textarea" placeholder="感谢您写下的宝贵建议" maxlength="150" v-model="content" />
    <button class="content-commit" @click="commit">提交</button>
  </view>
</template>
<script>
import baseUrl from "../../config/baseUrl";
export default {
  data() {
    return {
      content: ""
    };
  },
  methods: {
    commit() {
      const myThis = this;
      uni.request({
        url: baseUrl + "setFeedback",
        data: {
          pageData: {
            content: myThis.content
          }
        },
        header: {
          "custom-header": "hello"
        },
        success: res => {
          if (res.statusCode == 200) {
            uni.showToast({
              title: "提交成功，感谢您的建议",
              duration: 2000,
              success: () => {
                setTimeout(() => {
                  myThis.content = "";
                  uni.navigateBack({
                    delta: 2
                  });
                }, 2000);
              }
            });
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  height: 1vh;
  box-sizing: border-box;
  padding: 20rpx;
  &-textarea {
    border: 1rpx solid gray;
  }
  &-commit {
    background: orange;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>