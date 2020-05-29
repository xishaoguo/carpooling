<template>
    <view class="list" @click="lookChe">
        <image :src="item.avatarUrl" class="list-head"></image>
        <view class="list-content">
            <view><text>出发地：</text><text>{{item.placeOfDeparture}}</text></view>
            <view><text>目的地：</text><text>{{item.destination}}-{{item.specificLocation}}</text></view>
            <view><text>电话：</text><text>{{item.tel}}</text></view>
            <view><text>车牌号：</text><text>{{item.licensePlateNumber}}</text></view>
            <view><text>车型：</text><text>{{item.vehicleType}}</text></view>
            <view><text>时间：</text><text>{{item.date}}-{{item.time}}</text></view>
            <view><text>剩余座位：</text><text>{{item.numberOfSeats}}</text></view>
            <view><text>费用：</text><text>{{item.cost}}</text></view>
            <view><text>备注：</text><text>{{item.remarks}}</text></view>
            <view class="list-content-button" v-if="show">
                <button @click="payAgree">支付订车</button>
                <button @click="refuse">拒绝</button>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    props: ["item","show"],
    data() {
        return {
        }
    },
    methods: {
        lookChe() {
            this.$emit("lookChe")
        },
        payAgree() {
            this.$emit("payAgree")
        },
        refuse() {
            this.$emit("refuse")
        }
    }
}
</script>
<style lang="scss" scoped>
    .list {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 20rpx;
        border-bottom: 1rpx solid black;
        &-head {
            width: 100rpx;
            height: 100rpx;
        }
        &-content {
            margin-left: 50rpx;
            font-size: 25rpx;
            &-button {
                display: flex;
                justify-content: space-between;
                button {
                    height: 50rpx;
                    font-size: 30rpx;
                    line-height: 50rpx;
                }
            }
        }
    }
</style>