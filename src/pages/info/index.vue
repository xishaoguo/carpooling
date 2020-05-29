<template>
  <view class="content">
    <view class="content-item">
      <text>需求:</text>
      <picker @change="demandChange" :value="index" :range="array">
        <view class="content-item-demand">{{array[index]}}</view>
      </picker>
    </view>
    <view class="content-item">
      <text>出发地:</text>
      <picker @change="fromChange" :value="fromIndex" :range="from">
        <view class="content-item-demand">{{from[fromIndex]}}</view>
      </picker>
    </view>
    <view class="content-item">
      <text>具体位置:</text>
      <input class="uni-input" placeholder="限止五个字" v-model="specificLocation" maxlength="5"/>
    </view>
    <view class="content-item">
      <text>日期:</text>
      <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="dateChange">
        <view class="content-item-date">{{date}}</view>
      </picker>
    </view>
    <view class="content-item">
      <text>时间:</text>
      <picker mode="time" :value="time" start="09:01" end="21:01" @change="timeChange">
        <view class="content-item-time">{{time}}</view>
      </picker>
    </view>
    <view class="content-item" v-if="isRenToChe">
      <text>人数:</text>
      <input
        class="uni-input"
        placeholder="请输入乘车人数"
        type="number"
        maxlength="2"
        v-model="numberOfPeople"
      />人
    </view>
    <view class="content-item" v-if="isRenToChe==false">
      <text>座位数:</text>
      <input
        class="uni-input"
        placeholder="请输入座位数"
        type="number"
        maxlength="2"
        v-model="numberOfSeats"
      />
    </view>
    <view class="content-item">
      <text>电话:</text>
      <input class="uni-input" placeholder="请输入电话" type="number" maxlength="11" v-model="tel" />
    </view>
    <view class="content-item" v-if="isRenToChe">
      <text>有无行李:</text>
      <input class="uni-input" placeholder="是否有行李" maxlength="15" v-model="luggage" />
    </view>
    <view class="content-item" v-if="isRenToChe==false">
      <text>车型:</text>
      <input class="uni-input" placeholder="请输入车型" maxlength="10" v-model="vehicleType" />
    </view>
    <view class="content-item" v-if="isRenToChe==false">
      <text>车牌号:</text>
      <input class="uni-input" placeholder="请输入车牌号" maxlength="8" v-model="licensePlateNumber" />
    </view>
    <view class="content-item" v-if="isRenToChe==false">
      <text>费用:</text>
      <input class="uni-input" maxlength="3" v-model="cost" />元
    </view>
    <view class="content-item content-last-item">
      <text>备注:</text>
      <textarea class="content-item-textarea" maxlength="50" v-model="remarks" />
    </view>
    <button class="content-ok" @click="determine">确定</button>
  </view>
</template>
<script>
import baseUrl from "../../config/baseUrl";
export default {
  data() {
    const currentDate = this.getDate({
      format: true
    });
    return {
      isRenToChe: true,
      index: "0",
      fromIndex: 0,
      array: ["人找车", "车找人"],
      from: ["南乐", "北京"],
      date: currentDate,
      time: "12:00",
      specificLocation: "",
      numberOfPeople: "",
      tel: "",
      luggage: "",
      remarks: "",
      numberOfSeats: "",
      vehicleType: "",
      licensePlateNumber: "",
      cost: "",
      avatarUrl: "",
      openId: ""
    };
  },
  methods: {
    determine() {
      if(this.specificLocation == "") {
      uni.showToast({
              title: "请输入具体出发位置",
              duration: 2000,
              icon:"none"
            });
        return;
    }
    if(this.isRenToChe && this.numberOfPeople == "") {
      uni.showToast({
              title: "请输入乘车人数",
              duration: 2000,
              icon:"none"
            });
        return;
    }
    if(this.isRenToChe==false && this.numberOfSeats == "") {
      uni.showToast({
              title: "请空闲座位数",
              duration: 2000,
              icon:"none"
            });
        return;
    }
      if(!(/^1[3456789]\d{9}$/.test(this.tel))){ 
        uni.showToast({
              title: "手机号有误，请重新填写",
              duration: 2000,
              icon:"none"
            });
        return; 
    } 
    
    
    if(this.isRenToChe==false && this.vehicleType == "") {
      uni.showToast({
              title: "请输入车型",
              duration: 2000,
              icon:"none"
            });
        return;
    }
    if(this.isRenToChe==false && this.licensePlateNumber == "") {
      uni.showToast({
              title: "请填写车牌号",
              duration: 2000,
              icon:"none"
            });
        return;
    }
    if(this.isRenToChe==false && this.cost == "") {
      uni.showToast({
              title: "请输入乘车费用",
              duration: 2000,
              icon:"none"
            });
        return;
    }
    if(this.isRenToChe && this.luggage == "") {
      uni.showToast({
              title: "请填写行李携带情况",
              duration: 2000,
              icon:"none"
            });
        return;
    }
      const myThis = this;
      this.$store.commit("getOpenId");
      this.$store.commit("getAvatarUrl");
      this.openId = this.$store.state.openId;
      this.avatarUrl = this.$store.state.avatarUrl;
      const baseInfo = {
        demand: myThis.isRenToChe ? "人找车" : "车找人",
        placeOfDeparture: myThis.from[myThis.fromIndex],
        specificLocation: myThis.specificLocation,
        date: myThis.date,
        time: myThis.time,
        remarks: myThis.remarks,
        tel: myThis.tel,
        destination: myThis.fromIndex == 0 ? myThis.from[1] : myThis.from[0],
        openId: this.openId,
        avatarUrl: this.avatarUrl
      };
      const ren = {
        numberOfPeople: myThis.numberOfPeople,
        luggage: myThis.luggage
      };
      const che = {
        numberOfSeats: myThis.numberOfSeats,
        vehicleType: myThis.vehicleType,
        licensePlateNumber: myThis.licensePlateNumber,
        cost: myThis.cost
      };
      let info;
      if (myThis.isRenToChe) {
        info = Object.assign(baseInfo, ren);
      } else {
        info = Object.assign(baseInfo, che);
      }
      const url =
        baseUrl +
        (myThis.isRenToChe
          ? "itineraryInformationRen"
          : "itineraryInformationChe");
      uni.request({
        url: baseUrl + "isReleaseInfo",
        data: {
          openId: myThis.$store.state.openId
        },
        header: {
          "custom-header": "hello"
        },
        success: res => {
          const driver = res.data.data.driver;
          const passenger = res.data.data.passenger;
          if (driver.length > 0 || passenger.length > 0) {
            uni.showToast({
              title: "您已经发布过信息，请在我的拼车中查看",
              duration: 2000,
              icon:"none",
              success: () => {
                setTimeout(() => {
                  uni.navigateBack({
                    delta: 1
                  });
                }, 2000);
              }
            });
            return;
          }else {
            uni.request({
            url: url,
            data: {
              userInfo: info
            },
            header: {
              "custom-header": "hello"
            },
            success: res => {
              if (res.statusCode === 204) {
                uni.showToast({
                  title: "信息录入成功",
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
    },
    demandChange: function(e) {
      this.index = e.target.value;
      console.log(this.index);
      if (this.index == "0") {
        this.isRenToChe = true;
      } else {
        this.isRenToChe = false;
      }
    },
    fromChange: function(e) {
      this.fromIndex = e.target.value;
    },
    dateChange: function(e) {
      this.date = e.target.value;
    },
    timeChange: function(e) {
      this.time = e.target.value;
    },
    getDate(type) {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      if (type === "start") {
        year = year - 60;
      } else if (type === "end") {
        year = year + 2;
      }
      month = month > 9 ? month : "0" + month;
      day = day > 9 ? day : "0" + day;
      return `${year}-${month}-${day}`;
    }
  },
  onLoad: function(option) {
    if (option.isRenToChe === "false") {
      this.isRenToChe = false;
      this.index = "1";
    } else {
      this.isRenToChe = true;
      this.index = "0";
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  &-item {
    display: flex;
    justify-content: space-between;
    height: 100rpx;
    border-bottom: 1px solid gray;
    align-items: center;
    box-sizing: border-box;
    padding: 0 20rpx;
    &-demand {
      width: 300rpx;
      border: 1rpx solid gray;
      height: 80rpx !important;
      line-height: 80rpx;
      border-radius: 10rpx;
      text-align: center;
    }
    &-date,
    &-time {
      width: 300rpx;
      border: 1rpx solid gray;
      height: 80rpx !important;
      line-height: 80rpx;
      border-radius: 10rpx;
      text-align: center;
    }
    input {
      width: 300rpx;
      height: 80rpx;
      font-size: 30rpx;
      line-height: 80rpx;
      border: 1rpx solid gray;
      border-radius: 10rpx;
    }
    &-textarea {
      width: 600rpx;
      border: 1rpx solid gray;
    }
  }
  &-last-item {
    height: 380rpx !important;
  }
  &-ok {
    margin-top: 50rpx;
    background: orange;
  }
}
</style>