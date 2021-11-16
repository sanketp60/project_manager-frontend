const routes = [
    {path:'/project', component:project},
    {path:'/project/:id', component:project_discrete},
    {path:'/project/:projectid/task/:taskid', component:task_discrete},
    {path:'/project/:projectid/task', component:task}
    
]

const router=new VueRouter({routes})


const app = new Vue({
    router
}).$mount('#app')