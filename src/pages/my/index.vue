<template>
    <view class="content">
        <button class="content-order" @click="myCarpooling">我的拼车</button>
        <button class="content-release" @click="release">发布我的需求</button>
        <button class="content-back" @click="feedback">意见反馈</button>
    </view>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        myCarpooling() {
            uni.navigateTo({
                url: 'myCarpooling'
            });
        },
        feedback() {
            uni.navigateTo({
                url: 'feedback'
            });
        },
        release() {
            uni.navigateTo({
                url: '../info/index'
            });
        }
    }
}
</script>
<style lang="scss" scoped>
    .content {
        &-order,&-release,&-back {
            width: 80%;
            height: 100rpx;
            line-height: 100rpx;
            font-size: 30rpx;
            margin-top: 100rpx;
            background: greenyellow;
        }
        &-release {
            background: pink;
        }
        &-back {
            background: orchid;
        }
    }
</style>