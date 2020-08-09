<template>
    <view>
        <CheToRen :item="item" :show="false" :telShow="true"></CheToRen>
        <view class="main">
            <button @click="appointmentPay">预约并支付</button>
        </view>
    </view>
</template>
<script>
import baseUrl from "../../config/baseUrl"
import CheToRen from "../../components/cheToRen/che-to-ren"
export default {
    data() {
        return {
            item: {}
        }
    },
    methods: {
        appointmentPay() {
            const myThis = this;
            this.$store.commit("getOpenId");
            uni.request({
                url: baseUrl+'lookPassengerInfo', //仅为示例，并非真实接口地址。
                data: {
                    openId: myThis.$store.state.openId
                },
                header: {
                    'custom-header': 'hello' //自定义请求头信息
                },
                success: (res) => {
                    console.log(res)
                    if (res.data.length > 0) {
                        uni.request({
                            url: baseUrl+'addApplicationListRen',
                            data: {
                                pageData: {
                                    driverOpenId: myThis.item.openId,
                                    passengerOpenId: myThis.$store.state.openId
                                }
                            },
                            header: {
                                'custom-header': 'hello' //自定义请求头信息
                            },
                            success: (res) => {
                                if (res.statusCode === 200) {
                                    uni.showToast({
                                        title: '预约成功',
                                        duration: 2000,
                                        success:()=>{
                                            setTimeout(()=>{
                                                uni.navigateBack({
                                                    delta: 1
                                                });
                                            },2000)
                                        }
                                    });
                                }
                            }
                        });
                    }else {
                        uni.navigateTo({
                            url: `../info/index?isRenToChe=true`
                        });
                    }
                }
            });
        }
    },
    components: {
        CheToRen: CheToRen
    },
    onLoad: function (option) {
        const item = JSON.parse(decodeURIComponent(option.item));
        this.item = item
    }
}
</script>
<style lang="scss" scoped>
    .main {
        width: 100%;
        box-sizing: border-box;
        padding: 0 20rpx;
        position: absolute;
        bottom: 0;
    }
</style>