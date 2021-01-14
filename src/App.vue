<template>
    <div id="q-app">
        <router-view />
    </div>
</template>
<script>
    export default {
        name: 'App',
        created() {
            this.ajax.vultr.get({
                url: '/proxy/vultr/regions',
                success: (res) => {
                    this.$store.commit('options/SET_REGIONS', res.regions)
                },
            })
        }
    }
</script>
