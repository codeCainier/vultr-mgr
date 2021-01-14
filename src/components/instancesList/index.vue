<template>
    <q-list separator>
        <q-inner-loading :showing="loading">
            <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>

        <q-item-label header>Vultr 服务器列表</q-item-label>

        <q-separator/>

        <q-item v-ripple clickable v-for="item in instances" :key="item.id" @click="handleClickItem(item)">
            <q-item-section avatar>
                <q-icon color="primary" name="storage" />
            </q-item-section>

            <q-item-section>
                <q-item-label>{{ item.label || 'Cloud Instances' }}</q-item-label>
                <q-item-label caption>{{ getAddress(item.region) }}</q-item-label>
            </q-item-section>

            <q-item-section side>
                <q-badge :label="item.main_ip" />
            </q-item-section>

            <q-inner-loading :showing="item.id === loadingItem">
                <q-spinner-gears size="30px" color="primary" />
            </q-inner-loading>
        </q-item>
    </q-list>
</template>

<script>
    export default {
        name: 'InstancesList',
        data() {
            return {
                loading: false,
                loadingItem: '',
                instances: [],
            }
        },
        computed: {
            instanceIntro() {
                return item => {
                    return `${item.vcpu_count} CPU / ${item.ram} GB RAM / ${item.disk} GB SSD`
                }
            },
            getAddress() {
                return region => {
                    const regions = this.$store.state.options.regions
                    const [ info ] = regions.filter(item => item.id === region)
                    return `${info.continent} / ${info.country} / ${info.city}`
                }
            },
        },
        methods: {
            getInstances() {
                this.loading = true
                this.ajax.vultr.get({
                    url: '/proxy/vultr/instances',
                    success: (res) => {
                        this.instances = res.instances
                    },
                    finish: (res) => {
                        this.loading  = false
                    }
                })
            },
            handleClickItem(item) {
                this.loadingItem = item.id
                this.$emit('change', item)
            }
        },
        created() {
            this.getInstances()
        }
    }
</script>