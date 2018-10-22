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
      path: '/eyeProtection',
      name: 'memo',
      component: require('@/pages/eyeProtection').default
    },
    {
      path: '/robot',
      name: 'memo',
      component: require('@/pages/robot').default
    },
    {
      path: '/compression',
      name: 'memo',
      component: require('@/pages/compression').default
    },
    {
      path: '/setting',
      name: 'setting',
      component: require('@/pages/setting').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
