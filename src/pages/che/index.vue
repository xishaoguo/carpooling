<template>
  <view>
    <CountDown @nanLeToBJ="nanLeToBJ" @benJingToNL="benJingToNL"></CountDown>
    <scroll-view @scrolltolower="getDataList">
      <CheToRen v-for="item in list" :key="item" :item="item" @lookChe="lookItem(item)" :show="false" :telShow="true"></CheToRen>
    </scroll-view>
  </view>
</template>
<script>
import CountDown from "../../components/countDown/count-down";
import CheToRen from "../../components/cheToRen/che-to-ren";
import baseUrl from "../../config/baseUrl";
export default {
  data() {
    return {
      page:0,
      number: 5,
      list: [],
      placeOfDeparture: "",
      dataLength: 1
    };
  },
  methods: {
    lookItem(item) {
      uni.navigateTo({
        url: `./appointment?item=${encodeURIComponent(JSON.stringify(item))}`
      });
    },
    getDataList() {
      console.log("调用")
      this.page = this.page+1
      const myThis = this;
      if (this.dataLength > 0) {
        uni.request({
        url: baseUrl + "getCheToRenInfo",
        data: {
          pageData: {
            page:myThis.page,
            number: myThis.number,
            placeOfDeparture: myThis.placeOfDeparture
          }
        },
        header: {
          "custom-header": "hello" 
        },
        success: res => {
          if (res.data) {
            myThis.dataLength = res.data.data.length
            myThis.list = myThis.list.concat(res.data.data);
            console.log(res.data.data)
          }
        }
      });
      }
    },
    nanLeToBJ() {
      this.list = [];
      this.page = 0
      this.placeOfDeparture = "南乐";
      this.dataLength = 1;
      this.getDataList()
    },
    benJingToNL() {
      this.list = [];
      this.page = 0
      this.placeOfDeparture = "北京";
      this.dataLength = 1;
      this.getDataList()
    }
  },
  components: {
    CountDown: CountDown,
    CheToRen: CheToRen
  },
  created() {
    this.getDataList();
  }
};
</script>