<template>
    <q-card flat bordered>
        <q-card-section>
            <div class="row q-mb-md">
                <div>
                    <div>带宽流量使用情况</div>
                    <div>186.93 GB / 4000 GB</div>
                </div>
                <q-space />
                <div class="text-h4 text-weight-thin">4.67%</div>
            </div>
            <div class="full-width" style="height: 300px" ref="chart-bindwidth"></div>
        </q-card-section>
    </q-card>
</template>

<script>
    export default {
        name: 'BindwidthCard',
        props: {
            bandwidth: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
            }
        },
        computed: {
        },
        watch: {
            bandwidth() {
                this.bindWidthRander()
            }
        },
        methods: {
            bindWidthRander() {
                const dom = this.$refs['chart-bindwidth']
                const chart = this.echarts.init(dom)
                const flowAll = ((arr = []) => {
                    Object.values(this.bandwidth).forEach(item => {
                        arr.push(item.incoming_bytes + item.outgoing_bytes)
                    })
                    return arr
                })()
                const option = {
                    xAxis: {
                        type: 'category',
                        data: Object.keys(this.bandwidth)
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: flowAll,
                        type: 'line'
                    }]
                }
                chart.setOption(option)
            },
        },
        created() {
        }
    }
</script>