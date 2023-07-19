import { createApp, ref } from 'vue'

import Loading from './Loading.vue'

const loading = ref(false)
const $loading = createApp(Loading, {loading}).mount(document.createElement('div'))


export const loadingInstance = {
    show() { // 控制显示loading的方法
        loading.value = true
        document.body.appendChild($loading.$el)
    },

    close() { // 控制loading隐藏的方法
        loading.value = false
        // const el = $loading.$el;
        // if (el.parentNode) {
        //     el.parentNode.removeChild(el);
        // }
    }
}

