<template>
    <q-page class="q-pa-md">
        <div class="row q-mb-md q-col-gutter-md">
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                <q-card flat bordered>
                    <user-info />

                    <q-card-section class="q-gutter-sm">
                        <q-btn label="充值" size="sm" flat color="primary" />
                        <q-btn label="新建" size="sm" flat />
                    </q-card-section>

                    <q-separator />

                    <instances-list @change="getDetails"/>
                </q-card>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
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
            </div>
        </div>
    </q-page>
</template>

<script>
    import userInfo from 'src/components/userInfo'
    import instancesList from 'src/components/instancesList'

    export default {
        name: 'Home',
        components: {
            'user-info': userInfo,
            'instances-list': instancesList,
        },
        data() {
            return {
                bandwidth: [],
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
            getDetails(item) {
                this.ajax.vultr.get({
                    url: `/proxy/vultr/instances/${item.id}/bandwidth`,
                    success: (res) => {
                        this.bandwidth = res.bandwidth
                    }
                })
            },
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