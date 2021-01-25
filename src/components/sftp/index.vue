<template>
    <q-dialog v-model="show"
              persistent
              :maximized="true"
              transition-show="slide-up"
              transition-hide="slide-down">
        <q-card flat bordered class="disable-copy">
            <q-bar>
                <q-space />
                <!-- <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
                    <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
                </q-btn>
                <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
                    <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
                </q-btn> -->
                <q-btn dense flat icon="close" v-close-popup>
                    <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
                </q-btn>
            </q-bar>
            <q-card-section class="q-pa-none" style="height: calc(100% - 32px)">
                <q-splitter v-model="splitterModel" class="full-height" >

                    <template v-slot:before>
                        <div class="q-pa-md">
                        <!-- <img src="~/assets/sftp-icons/document.svg" alt=""> -->
                        <!-- <q-tree :nodes="laList"
                                node-key="label"
                                selected-color="primary"
                                :selected.sync="selected"
                                default-expand-all/> -->
                        </div>
                    </template>

                    <template v-slot:after>
                        <q-scroll-area class="full-height">
                            <div class="fs-head">
                                <div class="name">名称</div>
                                <div class="size">大小</div>
                            </div>
                            <div class="fs-body">
                                <div v-for="(item, index) in laList" :key="index" class="fs-item">
                                    <img class="icon" :src="item.icon" alt="">
                                    <div class="name">{{ item.name }}</div>
                                    <div class="size">{{ tools.formatFlow(item.size) }}</div>
                                </div>
                            </div>
                        </q-scroll-area>
                    </template>
                </q-splitter>
            </q-card-section>

            <q-inner-loading :showing="!Object.keys(instance).length || !sshStatus || loading">
                <q-spinner-gears size="50px" color="primary" />
            </q-inner-loading>
        </q-card>
    </q-dialog>
</template>

<script>
    export default {
        name: 'Sftp',
        props: {
            instance: {
                type: Object,
                default: {}
            },
            ssh: {
                type: Object,
                default: {}
            },
            sshStatus: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                show: true,
                splitterModel: 30,
                selected: 'Food',
                pwd: '/',
                laList: [],
                loading: false,
            }
        },
        watch: {
            sshStatus(newVal) {
                if (newVal) this.la()
            },
        },
        computed: {
        },
        methods: {
            la() {
                const cmd = 'ls -la'
                this.loading = true
                this.ssh.execCommand(cmd, { cwd: '/' })
                    .then(res => {
                        const list = res.stdout.split('\n')
                        list.splice(0, 1)
                        list.forEach((item, index) => {
                            const itemArr = item.split(' ').filter(tempItem => tempItem)
                            const itemObj = {
                                type    : itemArr[0].substring(0, 1),
                                attr    : '',
                                childNum: itemArr[1],
                                owner   : itemArr[2],
                                group   : itemArr[3],
                                size    : itemArr[4], // 字节
                                date    : `${itemArr[5]} ${itemArr[6]} ${itemArr[7]}`,
                                name    : itemArr[8],
                                link    : itemArr[10] || ''
                            }
                            itemObj.icon = this.getFileIcon(itemObj.type, itemObj.name)
                            list[index] = itemObj
                        })
                        this.laList = list
                        this.loading = false
                    })
            },
            getFileIcon(type, name) {
                const suffix = type === '-' ? name.split('.').pop() : ''
                // 目录
                if (type === 'd') return require('src/assets/sftp-icons/folder-other.svg')
                // 链接
                if (type === 'l') return require('src/assets/sftp-icons/folder-shared.svg')
                // 管理文件
                if (type === 'p') return 'p'
                // 设备文件
                if (type === 'b') return 'b'
                // 字符设备文件
                if (type === 'c') return 'c'
                // 套接字文件
                if (type === 's') return 's'
                // 普通文件
                if (suffix === 'exe') return ''
            },
        },
        mounted() {
// drwxr-xr-x  23 root root  4096 Nov 21 17:37 .
// drwxr-xr-x  23 root root  4096 Nov 21 17:37 ..
// drwxr-xr-x   2 root root  4096 Nov 21 17:36 bin
// drwxr-xr-x   3 root root  4096 Nov 21 17:39 boot
// drwxr-xr-x  18 root root  3840 Jan 15 06:49 dev
// drwxr-xr-x  94 root root  4096 Jan  7 16:42 etc
// drwxr-xr-x   2 root root  4096 Apr 24  2018 home
// lrwxrwxrwx   1 root root    34 Nov 21 17:37 initrd.img -> boot/initrd.img-4.15.0-124-generic
// lrwxrwxrwx   1 root root    33 Nov 21 17:27 initrd.img.old -> boot/initrd.img-4.15.0-76-generic
// drwxr-xr-x  23 root root  4096 Dec 24 03:26 lib
// drwxr-xr-x   2 root root  4096 Nov 21 17:34 lib64
// drwx------   2 root root 16384 Nov 21 17:26 lost+found
// drwxr-xr-x   4 root root  4096 Nov 21 17:26 media
// drwxr-xr-x   2 root root  4096 Feb  3  2020 mnt
// drwxr-xr-x   4 root root  4096 Dec 24 03:26 opt
// dr-xr-xr-x 100 root root     0 Jan 15 06:49 proc
// drwx------   4 root root  4096 Jan 15 07:05 root
// drwxr-xr-x  26 root root   940 Jan 25 02:56 run
// drwxr-xr-x   2 root root 12288 Dec 24 03:26 sbin
// drwxr-xr-x   2 root root  4096 Nov 21 17:33 snap
// drwxr-xr-x   2 root root  4096 Feb  3  2020 srv
// dr-xr-xr-x  13 root root     0 Jan 25 02:56 sys
// drwxrwxrwt   9 root root  4096 Jan 24 15:38 tmp
// drwxr-xr-x  10 root root  4096 Nov 21 17:26 usr
// drwxr-xr-x  13 root root  4096 Nov 21 17:31 var
// lrwxrwxrwx   1 root root    31 Nov 21 17:37 vmlinuz -> boot/vmlinuz-4.15.0-124-generic
// lrwxrwxrwx   1 root root    30 Nov 21 17:27 vmlinuz.old -> boot/vmlinuz-4.15.0-76-generic
        }
    }
</script>

<style lang="sass" scope>
.fs-head
    position: sticky
    top: 0
    display: flex
    height: 25px
    line-height: 25px
    z-index: 99
    background: white
    border-bottom: 1px solid rgba($dark, .1)
    .name
        width: 230px
    .size
        width: 100px
.fs-item
    display: flex
    height: 25px
    line-height: 25px
    .icon
        width: 25px
        height: 100%
        margin-right: 5px
    .name
        width: 200px
        margin-right: 5px
    .size
        width: 100px
        margin-right: 5px
    &:hover
        background: rgba($primary, .1)
</style>