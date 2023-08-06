
const util = {
    // 防抖
    debounce(fn, t) {
        let timer

        return function () {
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => {
                fn()
            }, t)
        }
    },
    // 节流
    throttle(fn, t) {
        let timer
        return function () {
            if (!timer) {
                timer = setTimeout(() => {
                    fn()
                    timer = null
                }, t)
            }
        }
    }
}

export default util
