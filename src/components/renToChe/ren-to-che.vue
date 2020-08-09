<template>
    <view class="list" @click="look">
        <image :src="item.avatarUrl" class="list-head"></image>
        <view class="list-content">
            <view><text>出发地：</text><text>{{item.placeOfDeparture}}</text></view>
            <view><text>目的地：</text><text>{{item.destination}}-{{item.specificLocation}}</text></view>
            <view><text>电话：</text><text>{{item.tel}}</text><button v-if="telShow" @click="call">打电话</button></view>
            <view><text>人数：</text><text>{{item.numberOfPeople}}人</text></view>
            <view><text>时间：</text><text>{{item.date}}</text></view>
            <view><text>有无行李：</text><text>{{item.luggage}}</text></view>
            <view><text>备注：</text><text>{{item.remarks}}</text></view>
            <view v-if="show" class="list-content-order-button">
                <button @click="agree">同意上车</button>
                <button @click="refuse">拒绝</button>
                <view>进行中</view>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    props: ["item","show","telShow"],
    data() {
        return {
        }
    },
    methods: {
        look() {
            this.$emit("lookChe")
        },
        agree() {
            this.$emit("agree",this.item)
        },
        refuse() {
            this.$emit("refuse",this.item)
        },
        call() {
            this.$emit("call",this.item)
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
            &-order-button {
                display: flex;
                justify-content: space-between;
                button,view {
                    height: 50rpx;
                    font-size: 30rpx;
                    line-height: 50rpx;
                }
            }
        }
    }
</style>