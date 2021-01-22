<template>
    <q-card flat bordered class="disable-copy">
        <q-card-section>
            <div class="row q-mb-md">
                <div>
                    <div>带宽流量使用情况</div>
                    <div>{{ usedBandwidth }} / {{ allowedBandwidth() }}</div>
                </div>
                <q-space />
                <div class="text-h4 text-weight-light">{{ percent() }}</div>
            </div>
            <div class="full-width" style="height: 100px" ref="chart-bindwidth"></div>
        </q-card-section>

        <q-inner-loading :showing="loading || !Object.keys(instance).length">
            <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
    </q-card>
</template>

<script>
    export default {
        name: 'BindwidthCard',
        props: {
            bandwidth: {
                type: Object,
                default: {}
            },
            instance: {
                type: Object,
                default: {}
            },
            loading: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                usedBandwidthArr: [],
                usedBandwidth: '-',
            }
        },
        computed: {
            allowedBandwidth() {
                return () => this.instance.allowed_bandwidth ? `${this.instance.allowed_bandwidth} GB` : '-'
            },
            percent() {
                return () => {
                    const num = (this.usedBandwidth.split(' ')[0] / this.instance.allowed_bandwidth * 100)
                    return num ? `${num.toFixed(2)}%` : '-'
                }
            }
        },
        watch: {
            bandwidth() {
                this.usedArrHandle()
            },
        },
        methods: {
            usedArrHandle() {
                const arr = []
                let usedBandwidth = 0
                Object.values(this.bandwidth).forEach(item => {
                    const incoming_total = item.incoming_bytes + item.outgoing_bytes
                    arr.push(incoming_total)
                    usedBandwidth += incoming_total
                })
                this.usedBandwidthArr = arr
                this.usedBandwidth = this.tools.formatFlow(usedBandwidth)
                this.bindWidthRander()
            },
            bindWidthRander() {
                const dom    = this.$refs['chart-bindwidth']
                const chart  = this.echarts.init(dom)
                const option = {
                    grid: {
                        top: 0,
                        bottom: 10,
                        left: 0,
                        right: 0,
                    },
                    // 提示配置
                    tooltip: {
                        // 是否显示工具提示
                        show: true,
                        // 通过轴触发
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: 'rgba(0, 0, 0, .5)',
                                formatter: values => this.tools.formatFlow(values.value)
                            },
                            lineStyle: {
                                color: 'rgba(0, 0, 0, .3)',
                            },
                            shadowStyle: {
                                color: 'rgba(0, 0, 0, .3)',
                            },
                            crossStyle: {
                                color: 'rgba(0, 0, 0, .3)',
                            },
                        },
                    },
                    xAxis: {
                        show: false,
                        type: 'category',
                    },
                    yAxis: {
                        show: false,
                        type: 'value',
                    },
                    series: [{
                        data: this.usedBandwidthArr,
                        type: 'line',
                        smooth: true
                    }]
                }
                chart.setOption(option)
            },
        },
        created() {
        }
    }
</script>