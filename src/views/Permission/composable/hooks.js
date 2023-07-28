import {getCharacter} from "@/api/character.js";
import {ref} from "vue";
import moment from "moment";

// 获取角色信息
export const useGetCharacter = () => {
    // 分页角色信息列表
    const characterData = ref([])
    // 所有角色信息列表
    const allCharacterData = ref([])

    // 获取所有角色信息
    const getCharacterData = async (config) => {
        const res = await getCharacter(config)
        characterData.value = res.data.map(item => {
            item.create_date = moment(item.create_date).format('YYYY-MM-DD h:mm:ss')
            item.change_date = moment(item.change_date).format('YYYY-MM-DD h:mm:ss')
            return item
        })
        allCharacterData.value = res.total_data.map(item => {
            item.label = item.title
            return item
        })
    }

    return {
        characterData,
        allCharacterData,
        getCharacterData
    }
}