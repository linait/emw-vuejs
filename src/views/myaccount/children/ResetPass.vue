<template>
    <div class="user layout">
        <h1>修改密码</h1>
        <div class="user-modal" v-show="status">
            <form @submit.prevent="validateSubmit('myForm')" data-vv-scope="myForm">
                <div class="modal-line">
                    <label for="">原登录密码：</label>
                    <input :class="{'input': true, 'is-danger': errors.has('myForm.oldValue') }" type="tel" placeholder="请输入原登录密码" v-validate="'required'" v-model="myForm.oldValue" name="oldValue">
                    <span v-show="errors.has('myForm.oldValue')" class="help-tip">原登录密码不能为空</span>
                </div>
                <div class="modal-line">
                    <label for="">新登录密码：</label>
                    <input :class="{'input': true, 'is-danger': errors.has('myForm.newValue') }" type="tel" placeholder="请输入新密码" v-validate="'required|min:6|max:21'" v-model="myForm.newValue" name="newValue">
                    <span v-show="errors.has('myForm.newValue')" class="help-tip">请输入6-21位任意长度的密码</span>
                </div>
                <div class="modal-line">
                    <label for="">确认登录密码：</label>
                    <input :class="{'input': true, 'is-danger': errors.has('myForm.confirmValue') }" type="tel" placeholder="请再次输入新密码" v-validate="'required|min:6|max:21|confirmed:newValue'" v-model="myForm.confirmValue" name="confirmValue">
                    <span v-show="errors.has('myForm.confirmValue')" class="help-tip">确认密码输入有误</span>
                </div>
                <button type="submit">确认修改</button>
            </form>
        </div>
        <div v-show="!status">
            <div style="text-align:center;margin:35px;">
                <span>恭喜您，密码修改成功！</span>
            </div>
            <button class="btn" @click="backIndex()">返回首页</button>
        </div>
    </div>
</template>
<script> 
export default {
    data() {
        return {
            status: true,
            myForm: {
                type: 'mobile',
                oldValue: '',
                newValue: '',
                validValue: ''
            }
        }
    },
    methods: {
        backIndex() {
            this.$router.push({ path: '/' })
        },
        validateSubmit(name) {
            this.$validator.validateAll(name).then(result => {
                if (result) {
                    // eslint-disable-next-line
                    // this.handleSubmit();
                    this.status = false
                    return;
                }
            });
        }
    }
}
</script>