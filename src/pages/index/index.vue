<template>
  <view class="content">
    <view class="content-title">拼车</view>
    <view class="content-main">
      <text class="content-main-place">南乐</text>
      <view>
        <view>→</view>
        <view>←</view>
      </view>
      <text class="content-main-to" @click="jump">北京</text>
      <button @click="myGetUserInfo" open-type="getUserInfo" bindgetuserinfo="onGotUserInfo">登录</button>
    </view>
    <button @click="getData">获取数据</button>
    <text class="content-count-down">{{countDown}}</text>
  </view>
</template>

<script>
import baseUrl from "../../config/baseUrl";
export default {
  data() {
    return {
      countDown: 3,
      weiXinUserInfo: {
        avatarUrl: "",
        city: "",
        country: "",
        gender: 1,
        language: "",
        nickName: "",
        province: "",
        openId: ""
      }
    };
  },
  onLoad() {
    /* setTimeout(()=>{
				uni.redirectTo({
				url: './main/main'
			});
			},3000);
			var timer = setInterval(()=>{
				this.countDown--
				if(this.countDown == 0) {
					clearInterval(timer)
				}
			},1000); */
  },
  methods: {
    jump() {
      console.log("跳转");
      uni.switchTab({
        url: "../ren/index"
      });
    },
    myGetUserInfo() {
      let myThis = this;
      //微信登录
      uni.login({
        provider: "weixin",
        success: function(loginRes) {
          uni.request({
            url: baseUrl + "getWeiXinCode",
            data: {
              weiXinCode: {
                code: loginRes.code
              }
            },
            success: res => {
              const openId = res.data.openid;
              // 获取用户信息
              uni.getUserInfo({
                provider: "weixin",
                success: function(infoRes) {
                  Object.assign(myThis.weiXinUserInfo,infoRes.userInfo); 
                  myThis.weiXinUserInfo.openId = openId;
                  myThis.$store.dispatch("setOpenId",openId)
                  myThis.$store.dispatch("setAvatarUrl",infoRes.userInfo.avatarUrl)
                  uni.request({
                    url: baseUrl + "setWeiXinInfo",
                    data: {
                      weiXinUserInfo: myThis.weiXinUserInfo
                    },
                    success: res => {
                      console.log(res)
                    }
                  });
                }
              });
            }
          });
        }
      });
    },
    getData() {
      console.log(this.$store.state.nale);
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  &-title {
    font-family: "黑体";
    font-size: 50rpx;
    text-align: center;
    height: 200rpx;
    line-height: 200rpx;
  }
  &-main {
    margin-top: 100rpx;
    box-sizing: border-box;
    padding: 0 50rpx;
    display: flex;
    justify-content: space-between;
    &-place {
      font-size: 40rpx;
      width: 40rpx;
    }
    &-to {
      font-size: 40rpx;
      width: 40rpx;
    }
  }
  &-count-down {
    position: absolute;
    bottom: 30rpx;
    right: 30rpx;
  }
}
</style>>
</style>
