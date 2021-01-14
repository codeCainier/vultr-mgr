<template>
    <q-layout view="hHh lpR fFf" class="bg-grey-1">
        <q-header elevated class="bg-white text-grey-8" height-hint="64">
            <q-toolbar>
                <q-btn flat dense round 
                       aria-label="Menu"
                       icon="menu"
                       class="q-mr-sm"
                       @click="leftDrawerOpen = !leftDrawerOpen" />

                <q-toolbar-title v-if="$q.screen.gt.xs" shrink class="row items-center no-wrap">
                    <!-- <img src="https://cdn.quasar.dev/img/layout-gallery/logo-google.svg"> -->
                    <span class="q-ml-sm">Serve Manager</span>
                </q-toolbar-title>

                <q-space />

                <div class="q-gutter-sm row items-center no-wrap">
                    <q-btn v-if="$q.screen.gt.sm" round dense flat color="text-grey-7" icon="apps">
                        <q-tooltip>Google Apps</q-tooltip>
                    </q-btn>
                    <q-btn round dense flat color="grey-8" icon="notifications">
                        <q-badge color="red" text-color="white" floating>2</q-badge>
                        <q-tooltip>Notifications</q-tooltip>
                    </q-btn>
                    <q-btn round flat>
                        <q-avatar size="26px">
                            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                        </q-avatar>
                        <q-tooltip>Account</q-tooltip>
                    </q-btn>
                </div>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="leftDrawerOpen"
                  show-if-above
                  bordered
                  content-class="bg-white"
                  :width="280">
            <q-scroll-area class="fit">
                <q-list padding class="text-grey-8">
                    <q-item v-ripple v-for="link in links1" :key="link.text" clickable @click="toPath(link)">
                        <q-item-section avatar>
                            <q-icon :name="link.icon" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{ link.text }}</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-separator inset class="q-my-sm" />

                    <q-item v-ripple v-for="link in links2" :key="link.text" clickable>
                        <q-item-section avatar>
                            <q-icon :name="link.icon" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{ link.text }}</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-separator inset class="q-my-sm" />

                    <q-item v-ripple v-for="link in links3" :key="link.text" clickable>
                        <q-item-section>
                            <q-item-label>{{ link.text }}
                                <q-icon v-if="link.icon" :name="link.icon" />
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-scroll-area>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
    export default {
        name: 'MainLayout',
        data() {
            return {
                leftDrawerOpen: false,
                links1: [{
                    icon: 'web',
                    text: '数据可视化分析',
                    path: 'home',
                }],
                links2: [{
                    icon: 'person',
                    text: '用户管理',
                    path: 'userManager',
                }],
                links3: [{
                    icon: 'open_in_new',
                    text: 'Help'
                }]
            }
        },
        methods: {
            toPath(link) {
                this.$router.push({
                    path: link.path
                })
            }
        }
    }

</script>

<style lang="sass">

</style>