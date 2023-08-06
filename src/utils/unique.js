// 对象数组根据某个属性去重
export const unique = (arr, attribute) => {
    const res = new Map()
    return arr.filter((item) => !res.has(item[attribute]) && res.set(item[attribute], 1))
}