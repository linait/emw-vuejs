<!-- borrowed from Nuxt! -->

<template>
    <div class="event-layer" v-show="visible">
        <div class="cover"></div>
        <div class="event-con">
            <div>
                <a href="javascript:void(0)" class="close" @click="close()">×</a>
                <h3>添加企业关注</h3>
            </div>
            <div class="search-bar clear">
                <div class="search-text">
                    <input type="text" v-model="searchText" :class="{'input': true, 'is-danger': errors.has('searchText') }" v-validate="'required|shlth:2'" name="searchText">
                </div>
                <button class="search" @click="search()">搜索公司</button>
                <span v-show="errors.has('searchText')" class="help-tip">{{errors.first('searchText')}}</span>
            </div>
            <div class="search-list-title clear">
                <div class="span-290">企业名称</div>
                <div class="span-200">注册资本</div>
                <div class="span-200">法定代表人</div>
                <div class="span-200">成立时间</div>
                <div class="span-200">选择关注</div>
            </div>
            <div class="search-list">
                <div v-show="!searchNoText" class="search-list-line clear" v-for="(item,index) in searchDatas" :key="index">
                    <div class="span-290 pd27" v-text="item.companyName"></div>
                    <div class="span-200 pd27" v-text="item.regCapital"></div>
                    <div class="span-200 pd27" v-text="item.legalPerson"></div>
                    <div class="span-200 pd27" v-text="item.foundDt"></div>
                    <div class="span-180 pd20">
                        <button class="follow" @click="follow(item)">关注</button>
                    </div>
                </div>
                <div v-show="searchDatas" v-text="searchNoText" class="nocompany"></div>
            </div>
            <a class="click-more" @click="searchMore()">点击查看更多</a>
        </div>
        <LayerBox v-model="layerBoxVisible">
            213421342431
        </LayerBox>
    </div>
</template>

<script>
import LayerBox from '@/components/LayerBox'
export default {
    name: 'SearchCompany',
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            visible: false,
            layerBoxVisible: false,
            searchText: "",
            searchNoText: "请在上方输入您想要搜索的企业名称",
            searchDatas: []
        }
    },
    components: {
        LayerBox
    },
    watch: {
        value(val) {
            this.visible = val
            // 在显示时去掉body滚动条，防止出现双滚动条
            // if (value) {
            //     document.body.className += ' modal-open';
            // }
            // // 在modal动画结束后再加上body滚动条
            // else {
            //     if (!this.duration) {
            //         this.duration = window.getComputedStyle(this.$el)['transition-duration'].replace('s', '') * 1000;
            //     }
            //     window.setTimeout(() => {
            //         document.body.className = document.body.className.replace(/\s?modal-open/, '');
            //     }, this.duration || 0);
            // }
        }
    },
    methods: {
        close() {
            this.visible = false
            this.$emit('input', false)
        },
        search() {
            // if (!this.searchText) {
            //     alert("请输入您想要搜索的企业名称")
            //     return
            // }
            this.$validator.validate('searchText', this.searchText).then(result => {
                console.log(result)
                if (result) {

                    if (this.searchDatas.length > 0) {
                        this.searchVlidate()
                        return
                    }

                    for (var i = 1; i <= 30; i++) {
                        this.searchDatas.push({
                            companyName: '辉山乳业（安徽）有限公司',
                            regCapital: '1000.0' + i,
                            legalPerson: '--',
                            foundDt: '2017/06/20',
                            id: i
                        })
                    }
                    if (this.searchDatas.length > 0) {
                        this.searchNoText = ""
                    }
                }
            });

        },
        searchMore() {

            for (var i = 30; i <= 60; i++) {
                this.searchDatas.push({
                    companyName: '辉山乳业（安徽）有限公司',
                    regCapital: '1000.0' + i,
                    legalPerson: '--',
                    foundDt: '2017/06/20',
                    id: i
                })
            }
        },
        searchVlidate() {
            this.$emit("searchVlidate")
            this.close()
        },
        follow(e) {
            this.$emit("follow", e)
            this.close()
        }
    }
}
</script>

<style scoped>

</style>