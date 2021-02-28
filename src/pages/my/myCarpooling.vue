<template>
  <view class="content">
    <view class="content-order">
      <view class="content-order-title">拼车单</view>
      <view v-if="passengerOrder.length>0">
          <RenToChe v-for="(item,index) in passengerOrder" :key="index" :item="item" :show="true" @agree="agree" @refuse="refuse" :telShow="true"></RenToChe>
      </view>
      <view v-if="driverOrder.length>0">
          <CheToRen v-for="(item,index) in driverOrder" :key="index" :item="item" :show="true" :telShow="true"></CheToRen>
      </view>
    </view>
    <view class="content-release">
      <view class="content-release-title">我发布的</view>
      <view v-if="driver.length>0">
        <CheToRen v-for="(item,index) in driver" :key="index" :item="item" :telShow="false"></CheToRen>
      </view>
      <view v-if="passenger.length>0">
        <RenToChe v-for="(item,index) in passenger" :key="index" :item="item" :telShow="false"></RenToChe>
      </view>
    </view>
  </view>
</template>
<script>
import baseUrl from "../../config/baseUrl";
import RenToChe from "../../components/renToChe/ren-to-che";
import CheToRen from "../../components/cheToRen/che-to-ren";
import { getOpenId } from "../../utils";
export default {
  data() {
    return {
      driver: [],
      passenger: [],
      driverOrder: [],
      passengerOrder: []
    };
  },
  components: {
    RenToChe: RenToChe,
    CheToRen: CheToRen
  },
  methods: {
    getDate() {
      this.$store.commit("getOpenId");
      const myThis = this;
      uni.request({
        url: baseUrl + "isReleaseInfo",
        data: {
          openId: getOpenId()
        },
        header: {
          "custom-header": "hello"
        },
        success: res => {
          myThis.driver = res.data.data.driver;
          myThis.passenger = res.data.data.passenger;
          myThis.getOrderInfo();
        }
      });
    },
    getOrderInfo() {
      const myThis = this;
      if (myThis.driver.length > 0) {
        uni.request({
          url: baseUrl + "lookMyCarpoolingByDriver",
          data: {
            data: {
              type: "driver",
              openId: getOpenId()
            }
          },
          header: {
            "custom-header": "hello"
          },
          success: res => {
            this.passengerOrder = res.data;
            console.log(res.data)
          }
        });
      }
      if (myThis.passenger.length > 0) {
        uni.request({
          url: baseUrl + "lookMyCarpoolingByPassenger",
          data: {
            data: {
              type: "passenger",
              openId: getOpenId()
            }
          },
          header: {
            "custom-header": "hello"
          },
          success: res => {
              this.driverOrder = res.data
          }
        });
      }
    },
    agree(item) {
      const myThis = this;
      uni.request({
          url: baseUrl + "addOrderInfo",
          data: {
            pageData: {
              driverOpenId: getOpenId(),
              passengerOpenId: item.openId
            }
          },
          header: {
            "custom-header": "hello"
          },
          success: res => {
              console.log(res)
          }
        });
    },
    refuse() {
      console.log("拒绝")
    }
  },
  created() {
    this.getDate();
  }
};
</script>
<style lang="scss" scoped>
.content {
  &-order {
    min-height: 500rpx;
    &-title {
      height: 100rpx;
      background-color: greenyellow;
      text-align: center;
      line-height: 100rpx;
    }
  }
  &-release {
    margin-top: 100rpx;
    &-title {
      height: 100rpx;
      line-height: 100rpx;
      text-align: center;
      background-color: orangered;
    }
  }
}
</style>