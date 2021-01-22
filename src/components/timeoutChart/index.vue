<template>
    <q-card flat bordered class="disable-copy">
        <q-card-section>
            <div class="row q-mb-md">
                <div>
                    <div>服务器丢包率</div>
                    <div>发包 {{ total }} 丢包 {{ timeout }}</div>
                </div>
                <q-space/>
                <div class="text-h4 text-weight-light">{{ percent }}%</div>
            </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
            <div class="full-width" style="height: 150px" ref="chart-timeout"></div>
        </q-card-section>

        <q-inner-loading :showing="!Object.keys(instance).length || !pingArrAll.length">
            <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
    </q-card>
</template>

<script>
    import ping from 'ping'

    export default {
        name: 'PingCard',
        props: {
            instance: {
                type: Object,
                default: {}
            },
        },
        data() {
            return {
                pingArrAll: [],
                total: 0,
                effect: 0,
                timeout: 0,
                percent: 0,
            }
        },
        watch: {
            pingArrAll() {
                this.total   = this.pingArrAll.length
                this.effect  = this.pingArrAll.filter(item => item).length
                this.timeout = this.total - this.effect
                this.percent = ((this.timeout / this.total) * 100).toFixed(2)
                this.chartRander()
            },
        },
        computed: {
        },
        methods: {
            chartRander() {
                const dom    = this.$refs['chart-timeout']
                const chart  = this.echarts.init(dom)
                const option = {
                    angleAxis: {
                        max: 100,
                        clockwise: true,
                        show: false
                    },
                    radiusAxis: {
                        type: 'category',
                        show: true,
                        axisLabel: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false
                        },
                    },
                    polar: {
                        center: ['50%', '50%'],
                        radius: '150%'
                    },
                    series: [{
                        type: 'bar',
                        data: [this.percent],
                        showBackground: true,
                        backgroundStyle: {
                            color: '#BDEBFF',
                        },
                        coordinateSystem: 'polar',
                        roundCap: true,
                        barWidth: 10,
                        itemStyle: {
                            normal: {
                                opacity: 1,
                                color: new this.echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#25BFFF'
                                }, {
                                    offset: 1,
                                    color: '#5284DE'
                                }]),
                                shadowBlur: 5,
                                shadowColor: '#2A95F9',
                            }
                        },
                    }]
                }
                chart.setOption(option)
            },
        },
        created() {
        }
    }
</script>