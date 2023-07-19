import {getAccount, addAccount, editAccount, deleteUser} from "@/api/user.js";
import {getCharacter} from "@/api/character.js";
import {ref, reactive, getCurrentInstance} from "vue";

// 获取用户信息
export const useGetUserInfo = () => {
    const userData = ref([])

    // 封装一个不够两位数就补零的函数
    function showTime(t) {
        var time
        time = t > 10 ? t : '0' + t
        return time
    }

    // 日期格式化
    function dateFormat(date) {
        var year = date.getFullYear();                // 年
        var month = showTime(date.getMonth() + 1);        // 月
        var day = showTime(date.getDate());          // 日
        var str = '';
        str = str + year + '-' + month + '-' + day
        return str
    }

    // 获取用户信息
    const getUserAccount = async (config) => {
        const res = await getAccount(config)
        userData.value = res.data.map(item => {
            item.date_joined = dateFormat(new Date(item.date_joined))
            return item
        })
        config.total = res.total
    }

    return {
        dateFormat,
        userData,
        getUserAccount
    }
}


// 新增用户信息
export const useAddUserInfo = () => {
    const {proxy} = getCurrentInstance()
    // 新增用户dialog
    const addUserFormVisible = ref(false)
    // dialog标题
    const title = ref('新增用户')
    // 新增用户表单
    const addUserForm = ref({
        username: '',
        password: '',
        name: '',
        gender: '',
        age: '',
        phone: ''
    })

    // 检查年龄信息
    const checkAge = (rule, value, callback) => {
        if (!Number.isInteger(value)) {
            callback(new Error('请输入正确的年龄'))
        } else {
            if (value < 18) {
                callback(new Error('年龄必须大于18'))
            } else {
                callback()
            }
        }
    }
    // 检查手机号信息
    const checkMobile = (rule, value, callback) => {
        // 手机号正则表达式
        const regMobile = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
        if (regMobile.test(value)) {
            // 合法的手机号
            return callback()
        }
        callback(new Error('请输入合法的手机号'))
    }
    // 表单验证规则
    const userRules = reactive({
        username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 5, max: 10, message: '用户名为6~12个字符', trigger: 'blur'},
        ],
        password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 12, message: '密码为6~12个字符', trigger: 'blur'},
        ],
        name: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
        ],
        gender: [
            {required: true, message: '请输入性别', trigger: 'blur'},
        ],
        age: [
            {required: true, message: '请输入年龄', trigger: 'blur'},
            {validator: checkAge, trigger: 'blur'}
        ],
        phone: [
            {required: true, message: '请输入联系方式', trigger: 'blur'},
            {validator: checkMobile, trigger: 'blur'}
        ],
    })

    const handlerClose = () => {
        addUserFormVisible.value = false
        addUserForm.value = {
            username: '',
            password: '',
            name: '',
            gender: '',
            age: '',
            phone: ''
        }
    }

    // 操作用户
    const addUserInfo = async (config, fn) => {
        title.value === '新增用户' ? await addAccount(addUserForm.value) : await editAccount(addUserForm.value)
        addUserFormVisible.value = false
        handlerClose()
        fn(config)
        ElMessage({
            type: 'success',
            message: '操作成功',
            customClass: 'pure-message'
        })
    }

    // 编辑用户
    const editUserInfoFlag = (data) => {
        addUserFormVisible.value = true
        addUserForm.value = data
        title.value = '编辑用户'
    }

    // 新增用户
    const addUserInfoFlag = () => {
        addUserFormVisible.value = true
        title.value = '新增用户'
    }

    // 删除用户
    const deleteUserInfo = async (id, config, fn) => {
        await deleteUser(id)
        fn(config)
        ElMessage({
            type: 'success',
            message: '删除成功',
            customClass: 'pure-message'
        })
    }


    return {
        addUserFormVisible,
        title,
        addUserForm,
        userRules,
        addUserInfo,
        editUserInfoFlag,
        addUserInfoFlag,
        handlerClose,
        deleteUserInfo
    }
}


// 获取角色信息
export const useGetCharacter = () => {
    // 角色信息列表
    const characterData = ref([])

    // 获取所有角色信息
    const getCharacterData = async (config) => {
        const res = await getCharacter(config)
        characterData.value = res.data
    }

    return {
        characterData,
        getCharacterData
    }
}