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

                    <instances-list ref="instancesList" @change="getDetails"/>
                </q-card>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                <instance-detail :instance="instance"/>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                <bindwidth-card :bandwidth="bandwidth" 
                                :instance="instance"
                                :loading="loading"/>
            </div>
        </div>
    </q-page>
</template>

<script>
    import userInfo from 'src/components/userInfo'
    import instancesList from 'src/components/instancesList'
    import bindWidthCard from 'src/components/bindwidthCard'
    import instanceDetail from 'src/components/instanceDetail'

    export default {
        name: 'Home',
        components: {
            'user-info': userInfo,
            'instances-list': instancesList,
            'bindwidth-card': bindWidthCard,
            'instance-detail': instanceDetail,
        },
        data() {
            return {
                bandwidth: {},
                instance: {},
                loading: false,
            }
        },
        computed: {
        },
        methods: {
            getDetails(item, finish) {
                this.loading = true
                this.instance = item
                this.ajax.vultr.get({
                    url: `/proxy/vultr/instances/${item.id}/bandwidth`,
                    success: (res) => {
                        this.bandwidth = res.bandwidth
                    },
                    finish: () => {
                        this.loading = false
                        this.$refs.instancesList.loadingItem = ''
                    }
                })
            },
        },
        created() {
        }
    }
</script>