import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'memo',
      component: require('@/pages/memo').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
