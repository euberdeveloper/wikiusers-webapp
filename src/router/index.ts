import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Users from '@/views/users/UsersView.vue';
import UsersId from '@/views/users/id/UsersIdView.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/it'
  },
  {
    path: '/:lang',
    name: 'users',
    component: Users,
    props: true
  },{
    path: '/:lang/:id',
    name: 'user',
    component: UsersId,
    props: true
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
