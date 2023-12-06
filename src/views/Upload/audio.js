import {ref} from 'vue'

export const useCreateWatchAudio = () => {
    const audioEle = document.querySelector('audio')
    const cvs = document.querySelector('canvas')
    const ctx = cvs.getContext('2d')

    // 初始化canvas的尺寸
    const initCvs = () => {
        cvs.width = 1300
        cvs.height = (window.innerHeight/4) * devicePixelRatio
    }
    initCvs()

    let isInit = false
    let analyser, dataArray

    audioEle.onplay = () => {
        if (isInit) {
            return
        }

        // 初始化
        const audCtx = new AudioContext() // 创建音频上下文
        const source = audCtx.createMediaElementSource(audioEle) // 创建音频源节点
        analyser = audCtx.createAnalyser() // 创建分析器节点
        // 核心->用分析器处理音频数据（将时域图转换为频率图->快速傅立叶变换）
        analyser.fftSize = 512
        // 创建数组，用于接收分析器节点的分析数据
        dataArray = new Uint8Array(analyser.frequencyBinCount)

        source.connect(analyser) // 连接源节点与分析器
        analyser.connect(audCtx.destination) // 连接分析器与输出设备
        isInit = true
    }

    // 把分析出的波形绘制到canvas上
    const draw = () => {
        requestAnimationFrame(draw)
        // 清空画布
        const { width, height } = cvs
        ctx.clearRect(0, 0, width, height)
        if (!isInit) {
            return
        }

        // 让分析器节点分析出数据到数组中
        analyser.getByteFrequencyData(dataArray)
        const length = dataArray.length / 2.5
        const barWidth = width / length / 2
        // 设置填充颜色
        ctx.fillStyle = '#78c5F7'
        for(let i = 0; i<length; i++) {
            const data = dataArray[i] // 小于256
            const barHeight = data / 255 * height
            const x1 = i * barWidth + width / 2 // 第一个横坐标
            const x2 = width / 2 - (i+1)*barWidth
            const y = height - barHeight // 纵坐标
            ctx.fillRect(x1, y, barWidth - 2, barHeight)
            ctx.fillRect(x2, y, barWidth - 2, barHeight)
        }
    }

    draw()
}