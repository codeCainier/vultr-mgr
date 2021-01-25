<template>
    <q-card flat bordered class="disable-copy">
        <q-card-section>
            <div class="row q-mb-md">
                <div>
                    <div>服务器 Ping 情况</div>
                    <div>平均 {{ average() }}ms</div>
                </div>
                <q-space/>
                <div class="text-h4 text-weight-light">{{ pingTime }}</div>
            </div>
        </q-card-section>
        <q-card-section>
            <div class="full-width" style="height: 100px" ref="chart-ping"></div>
        </q-card-section>

        <q-inner-loading :showing="!Object.keys(instance).length || !pingArr.length">
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
                // 单次 ping 等待时间
                pingTime: '-',
                // ping 间隔
                interval: 1000,
                // ping 等待时间数组
                // length 超出阈值后删除第一位，保证长度固定
                pingArr: [],
                // 全部 ping 等待时间数组
                pingArrAll: [],
                // ping 等待时间总和
                // 单独计算，防止每一次 ping 都进行整个数组求和
                pingArrTotal: 0,
                // ping 数组限制长度
                pingArrLimit: 30,
                // ping 计时器
                timer: '',
                // echarts 图表
                chart: '',
            }
        },
        watch: {
            instance() {
                this.pingStart()
            },
            pingArrAll() {
                this.$emit('change', this.pingArrAll)
            }
        },
        computed: {
            // 平均延迟
            // ping 等待时间总和 / 成功 ping 次数
            average() {
                return () => {
                    const effect = this.pingArrAll.filter(item => item)
                    return (this.pingArrTotal / effect.length).toFixed(0)
                }
            }
        },
        methods: {
            pingStart() {
                this.pingTime = '-'
                this.pingArr = []
                this.pingArrAll = []
                this.pingArrTotal = 0

                clearInterval(this.timer)

                this.timer = setInterval(() => this.ping(), this.interval)
            },
            async ping() {
                if (this.pingArr.length === this.pingArrLimit) this.pingArr.splice(0, 1)

                const { time }   = (await ping.promise.probe(this.instance.main_ip, { timeout: this.interval / 1000 }))
                const timeFormat = time === 'unknown' ? 0 : time

                this.pingTime = timeFormat ? `${time}ms` : 'Timeout'
                this.pingArr.push(timeFormat)
                this.pingArrAll.push(timeFormat)
                this.pingArrTotal += timeFormat
                this.pingRander()
            },
            pingRander() {
                const option = {
                    animation: this.pingArr.length !== this.pingArrLimit,
                    grid: {
                        top: 0,
                        bottom: 10,
                        left: 0,
                        right: 0,
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
                        data: this.pingArr,
                        type: 'line',
                        symbol: 'none',
                        smooth: true
                    }]
                }
                this.chart.setOption(option)
            },
        },
        mounted() {
            this.chart = this.echarts.init(this.$refs['chart-ping'])
        }
    }
</script>