const routes = [{
        path: '/login',
        component: () => import('pages/login'),
    }, {
        path: '/',
        component: () => import('layouts/main'),
        children: [{
            path: '/home',
            component: () => import('pages/home')
        }]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '*',
        component: () => import('pages/error')
    }
]

export default routes
