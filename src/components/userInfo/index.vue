<template>
    <q-item v-ripple>
        <q-inner-loading :showing="loading">
            <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>

        <q-item-section avatar>
            <q-avatar>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
        </q-item-section>

        <q-item-section>
            <q-item-label>{{ fullname(username) }}</q-item-label>
            <q-item-label caption>{{ email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
            <q-badge :label="balanceDollar(balance)" />
        </q-item-section>
    </q-item>
</template>

<script>
    export default {
        name: 'UserInfo',
        data() {
            return {
                loading: false,
                username: '-',
                email: '-',
                balance: 0,
            }
        },
        computed: {
            fullname() {
                return name => {
                    const arr = name.split(' ')
                    if (arr.length === 2) return `${arr[1]}${arr[0]}`
                }
            },
            balanceDollar() {
                return num => `$ ${num}`
            },
        },
        methods: {
            getUserInfo() {
                this.loading = true
                this.ajax.vultr.get({
                    url: '/proxy/vultr/account',
                    success: (res) => {
                        this.username = res.account.name
                        this.email    = res.account.email
                        this.balance  = (- (res.account.balance + res.account.pending_charges)).toFixed(2)
                    },
                    finish: (res) => {
                        this.loading  = false
                    }
                })
            },
        },
        created() {
            this.getUserInfo()
        }
    }
</script>