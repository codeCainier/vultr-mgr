<template>
    <q-card flat bordered class="disable-copy">
        <q-inner-loading :showing="!Object.keys(instance).length">
            <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>

        <q-card-section class="bg-primary text-white">
            <div class="text-h6">{{ instance.label || '-' }}</div>
            <div class="text-subtitle2 text-weight-light">{{ instanceIntro(instance) }}</div>
            <div class="text-subtitle2 text-weight-light">{{ instance.os }}</div>
        </q-card-section>

        <q-separator />

        <q-card-actions class="q-gutter-md">
            <q-btn flat label="Ping" :loading="pingLoading" @click="ping"/>
            <span v-show="pingTime">{{ pingTime }}</span>
            <q-space/>
            <q-btn flat color="negative" @click="enterPass">输入密码</q-btn>
        </q-card-actions>
    </q-card>
</template>

<script>
    import ping from 'ping'

    export default {
        name: 'InstanceDetail',
        props: {
            instance: {
                type: Object,
                default: {},
            },
        },
        data() {
            return {
                pingLoading: false,
                pingTime: '',
            }
        },
        watch: {
            instance() {
                this.pingTime = ''
                this.ping()
            }
        },
        computed: {
            instanceIntro() {
                return item => {
                    if (!Object.keys(item).length) return '-'
                    return `${item.vcpu_count} CPU / ${item.ram} GB RAM / ${item.disk} GB SSD`
                }
            },
        },
        methods: {
            async ping() {
                this.pingLoading = true
                const { time }   = (await ping.promise.probe(this.instance.main_ip))
                this.pingTime    = time === 'unknown' ? 'Timeout' : time + 'ms'
                this.pingLoading = false
            },
            enterPass() {
            },
        },
        created() {
        }
    }
</script>