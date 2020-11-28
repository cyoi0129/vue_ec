import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  id: 'UA-180911622-1',
  router,
})
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/special/:sid',
    name: 'Special',
    component: () => import('./views/Special.vue'),
    props: true
  },
  {
    path: '/product/:pid',
    name: 'Product',
    component: () => import('./views/Product.vue'),
    props: true
  },
  {
    path: '/category/:cid',
    name: 'Category',
    component: () => import('./views/Category.vue'),
    props: true
  },
  {
    path: '/article/:aid',
    name: 'Article',
    component: () => import('./views/Article.vue'),
    props: true
  },
  {
    path: '/user/',
    name: 'User',
    component: () => import('./views/User.vue'),
  },
  {
    path: '/cart/',
    name: 'Cart',
    component: () => import('./views/Cart.vue'),
  },
  {
    path: '/delivery/',
    name: 'Delivery',
    component: () => import('./views/Delivery.vue'),
  },
  {
    path: '/policy/',
    name: 'Policy',
    component: () => import('./views/Policy.vue'),
  },
  {
    path: '/term/',
    name: 'Term',
    component: () => import('./views/Term.vue'),
  },
  {
    name: 'notFound',
    path: '*',
    component: () => import('./views/NotFound.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes
})

export default router
