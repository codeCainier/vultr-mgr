<template>
    <q-page class="q-pa-md">
        <div class="row q-mb-md q-col-gutter-md">
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                <q-card flat bordered>
                    <user-info />

                    <q-card-section class="q-gutter-sm">
                        <q-btn label="充值" size="sm" flat color="primary" />
                        <q-btn label="新建" size="sm" flat @click="createInstancesList"/>
                    </q-card-section>

                    <q-separator />

                    <instances-list ref="instancesList" @change="getDetails"/>
                </q-card>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                <instance-detail :instance="instance"/>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                <bindwidth-card class="q-mb-md"
                                :bandwidth="bandwidth"
                                :instance="instance"
                                :loading="loading"/>
                <ping-chart class="q-mb-md"
                            ref="pingChart" 
                            :instance="instance"
                            @change="arr => $refs.timeoutChart.pingArrAll = arr"/>
                <timeout-chart ref="timeoutChart" :instance="instance"/>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                <sftp :instance="instance" :ssh="ssh" :sshStatus="sshStatus"/>
            </div>
        </div>
    </q-page>
</template>

<script>
    import userInfo       from 'src/components/userInfo'
    import instancesList  from 'src/components/instancesList'
    import bindWidthCard  from 'src/components/bindwidthCard'
    import instanceDetail from 'src/components/instanceDetail'
    import pingChart      from 'src/components/pingChart'
    import timeoutChart   from 'src/components/timeoutChart'
    import sftp           from 'src/components/sftp'
    import startupScript  from 'src/assets/startup'

    const { NodeSSH } = require('node-ssh')

    export default {
        name: 'Home',
        components: {
            'user-info'      : userInfo,
            'instances-list' : instancesList,
            'bindwidth-card' : bindWidthCard,
            'instance-detail': instanceDetail,
            'ping-chart'     : pingChart,
            'timeout-chart'  : timeoutChart,
            sftp             : sftp,
        },
        data() {
            return {
                bandwidth: {},
                instance: {},
                loading: false,
                sshStatus: false,
                ssh: {},
            }
        },
        computed: {
        },
        watch: {
            instance() {
                this.sshLogin('codeMaster.95xingrong')
            }
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
            sshLogin(password) {
                this.sshStatus = false
                this.ssh = new NodeSSH()
                this.ssh.connect({
                    host: this.instance.main_ip,
                    username: 'root',
                    port: '22',
                    password,
                    tryKeyboard: true,
                    onKeyboardInteractive: (name, instructions, instructionsLang, prompts, finish) => {
                        if (prompts.length > 0 && prompts[0].prompt.toLowerCase().includes('password')) finish([password])
                    },
                })
                .then(() => {
                    this.sshStatus = true
                    this.getDiskStatus()
                })
                .catch(err => {
                    console.log(err)
                })
            },
            getDiskStatus() {
                const cmd = 'docker -v'
                this.ssh.execCommand(cmd, { cwd: '/root' })
                    .then(res => {
                        console.log(res)
                    })
            },
            createInstancesList() {
                this.ajax.vultr.post({
                    url: '/proxy/vultr/startup-scripts',
                    params: {
                        name: 'Deploy SS & V2Rayxxx',
                        type: 'boot',
                        script: startupScript('codeMaster.95'),
                    },
                    success: res => {
                        this.notify.success('操作成功')
                    },
                })
            },
        },
        created() {
        }
    }
</script>