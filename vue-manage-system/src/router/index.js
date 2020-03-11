import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/admin'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/admin',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/user',
                    component: () => import(/* webpackChunkName: "user" */ '../components/page/User.vue'),
                    meta: { title: '用户管理' }
                },
                {
                    path: '/category',
                    component: () => import(/* webpackChunkName: "category" */ '../components/page/Category.vue'),
                    meta: { title: '分类管理' }
                },
                {
                    path: '/product',
                    component: () => import(/* webpackChunkName: "product" */ '../components/page/Product.vue'),
                    meta: { title: '商品管理' }
                },
                {
                    path: '/order',
                    component: () => import(/* webpackChunkName: "order" */ '../components/page/Order.vue'),
                    meta: { title: '订单管理' }
                },
                {
                    path: '/message',
                    component: () => import(/* webpackChunkName: "message" */ '../components/page/Message.vue'),
                    meta: { title: '评论管理' }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
