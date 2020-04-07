import Vue from 'vue'
import 'muse-ui/lib/styles/base.less';
import 'muse-ui/lib/styles/theme.less';
import Router from 'vue-router'
const index = resolve => {require(['../pages/index'], resolve)}
const index2 = resolve => {require(['../pages/index2'], resolve)}


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: index2
        }
    ]
})
