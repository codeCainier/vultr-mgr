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

        <q-card-actions>
            <q-btn flat label="Ping"/>
            <q-space/>
            <q-btn flat color="negative" @click="terminal">Terminal</q-btn>
        </q-card-actions>
    </q-card>
</template>

<script>
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
            terminal() {
                this.instance.kvm
            }
        },
        created() {
        }
    }
</script>