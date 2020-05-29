<template>
  <view>
    <RenToChe :item="item" :show="false"></RenToChe>
    <view class="main">
      <button @click="invitationToCar">邀请上车</button>
      <button @click="backUpPage">返回</button>
    </view>
  </view>
</template>
<script>
import RenToChe from "../../components/renToChe/ren-to-che";
import baseUrl from "../../config/baseUrl";
export default {
  data() {
    return {
      item: {}
    };
  },
  methods: {
    backUpPage() {
      uni.navigateBack({
        delta: 1
      });
    },
    invitationToCar() {
      const myThis = this;
      this.$store.commit("getOpenId");
      uni.request({
        url: baseUrl + "lookDriverInfo", 
        data: {
          openId: myThis.$store.state.openId
        },
        header: {
          "custom-header": "hello" 
        },
        success: res => {
          if (res.data.length > 0) {
            uni.request({
              url: baseUrl + "lookInvitationUpper", 
              data: {
                data: {
                  driverOpenId: myThis.$store.state.openId,
                  passengerOpenId: myThis.item.openId
                }
              },
              header: {
                "custom-header": "hello" 
              },
              success: res => {
                if (res.data.length > 0) {
                  uni.showToast({
                    title: "您已经邀请过",
                    duration: 2000,
                    success: () => {
                      setTimeout(() => {
                        uni.navigateBack({
                          delta: 1
                        });
                      }, 2000);
                    }
                  });
                } else {
                  uni.request({
                    url: baseUrl + "addApplicationListChe", 
                    data: {
                      pageData: {
                        driverOpenId: myThis.$store.state.openId,
                        passengerOpenId: myThis.item.openId
                      }
                    },
                    header: {
                      "custom-header": "hello" 
                    },
                    success: res => {
                      if (res.statusCode === 200) {
                        uni.showToast({
                          title: "邀请发送成功",
                          duration: 2000,
                          success: () => {
                            setTimeout(() => {
                              uni.navigateBack({
                                delta: 1
                              });
                            }, 2000);
                          }
                        });
                      }
                    }
                  });
                }
              }
            });
          } else {
            uni.navigateTo({
              url: `../info/index?isRenToChe=false`
            });
          }
        }
      });
    }
  },
  components: {
    RenToChe: RenToChe
  },
  onLoad: function(option) {
    const item = JSON.parse(decodeURIComponent(option.item));
    this.item = item;
  }
};
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  box-sizing: border-box;
  padding: 0 20rpx;
  position: absolute;
  bottom: 0;
  button:nth-child(1) {
    margin-bottom: 50rpx;
  }
}
</style>