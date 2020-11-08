/**
 * 
 * @param {number} len 生成数组长度
 * @param {number} max 最大值 
 * @param {number} fract 取位数
 */
const generateRandomData = (len, max = 100, fract = 0) => {
    const _array = []
    for (let i = 0; i < len; i++) {
        _array.push((Math.random() * max).toFixed(fract))
    }
    return _array
}

export const mockBarData = () => {
    return {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: generateRandomData(5, 100)
        }]
    }
}
