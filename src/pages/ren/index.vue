<template>
  <view>
    <CountDown @nanLeToBJ="nanLeToBJ" @benJingToNL="benJingToNL"></CountDown>
    <scroll-view @scrolltolower="getDataList" class="scroll-view" scroll-y>
      <RenToChe v-for="(item,index) in list" :key="index" :item="item" @lookChe="look(item)" :show="false"></RenToChe>
    </scroll-view>
  </view>
</template>
<script>
import CountDown from "../../components/countDown/count-down";
import RenToChe from "../../components/renToChe/ren-to-che";
import baseUrl from "../../config/baseUrl";
export default {
  data() {
    return {
      page: 0,
      number: 5,
      list: [],
      placeOfDeparture: "",
      dataLength: 1
    };
  },
  methods: {
    look(item) {
      uni.navigateTo({
        url: `./invitation?item=${encodeURIComponent(JSON.stringify(item))}`
      });
    },
    getDataList() {
      this.page = this.page + 1;
      const myThis = this;
      if (this.dataLength > 0) {
        uni.request({
          url: baseUrl + "getRenToCheInfo",
          data: {
            pageData: {
              page: myThis.page,
              number: myThis.number,
              placeOfDeparture: myThis.placeOfDeparture
            }
          },
          success: res => {
            if (res.data) {
              myThis.dataLength = res.data.data.length;
              myThis.list = myThis.list.concat(res.data.data);
              console.log(res.data);
            }
          }
        });
      }
    },
    nanLeToBJ() {
      this.list = [];
      this.page = 0;
      this.placeOfDeparture = "南乐";
      this.dataLength = 1;
      this.getDataList();
    },
    benJingToNL() {
      this.list = [];
      this.page = 0;
      this.placeOfDeparture = "北京";
      this.dataLength = 1;
      this.getDataList();
    }
  },
  components: {
    CountDown: CountDown,
    RenToChe: RenToChe
  },
  created() {
    this.getDataList();
  }
};
</script>
<style lang="scss" scoped>
.scroll-view {
  height: 990rpx;
}
</style>