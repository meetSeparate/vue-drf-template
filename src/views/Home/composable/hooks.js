import {ref, onMounted, markRaw} from "vue";
import {getPersonal, editPersonal} from "@/api/personal.js";
import {getAnnouncement, addAnnouncement, deleteAnnouncement} from "@/api/announcement.js";
import {useRenderFlicker} from "@/components/ReFlicker/index.js";
import {useAddUserInfo, useGetUserInfo} from "@/views/User/composable/hooks.js";
import {useUserStore} from "@/store/moudles/user.js";

// 获取个人信息
export const useGetPersonal = () => {
    const personal = ref({})

    // 获取个人信息
    const getPersonalObject = async () => {
        const res = await getPersonal()
        personal.value = res.data
    }

    onMounted(() => getPersonalObject())

    return {
        personal,
        getPersonalObject
    }
}

// 修改个人信息
export const useEditPersonal = () => {
    const editFormVisible = ref(false)
    // 表单验证
    const {userRules} = useAddUserInfo()

    // 修改个人信息
    const editPersonalObject = async (personal, fn) => {
        await editPersonal(personal)
        // 重新获取个人信息
        fn()
        editFormVisible.value = false
        ElMessage({
            type: 'success',
            message: '修改成功',
            customClass: 'pure-message'
        })
    }

    return {
        editFormVisible,
        userRules,
        editPersonalObject
    }
}

// 公告管理
export const useAnnouncement = () => {
    const userStore = useUserStore()

    // 系统公告初始化
    const announcementData = ref([])

    // 时间的格式化
    const {dateFormat} = useGetUserInfo()

    // 获取公告数据
    const getAnnouncementData = async () => {
        const res = await getAnnouncement()
        announcementData.value = res.data.map(item => {
            item.timestamp = dateFormat(new Date(item.timestamp))
            item.icon = markRaw(useRenderFlicker({background: item.color}))
            return item
        }).reverse()
    }

    // 新增公告对话框
    const announcementVisible = ref(false)

    // 新增公告表单
    const announcementForm = ref({
        username: userStore.userinfo.username,
        content: '',
        timestamp: '',
        color: '#409eff',
        size: ''
    })

    const options = ref([
        {
            label: 'large',
            value: 'large'
        },
        {
            label: 'default',
            value: 'default'
        },
        {
            label: 'small',
            value: 'small'
        }
    ])

    // 新增公告
    const addAnnouncementData = async () => {
        await addAnnouncement(announcementForm.value)
        announcementVisible.value = false
        announcementForm.value = {
            content: '',
            timestamp: '',
            color: '#409eff',
            size: ''
        }
        ElMessage({
            type: 'success',
            message: '发布成功',
            customClass: 'pure-message'
        })
        getAnnouncementData()
    }
    // 删除公告
    const deleteAnno = async (id) => {
        await deleteAnnouncement(id)
        ElMessage({
            type: 'success',
            message: 'success',
            customClass: 'pure-message'
        })
        getAnnouncementData()
    }

    onMounted(() => getAnnouncementData())

    return {
        announcementData,
        announcementVisible,
        announcementForm,
        options,
        deleteAnno,
        addAnnouncementData
    }
}