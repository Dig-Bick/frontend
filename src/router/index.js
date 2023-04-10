import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import UserManagement from '@/views/UserManagement.vue'; // 引入用户管理页面组件
import AdminLogin from '@/views/AdminLogin.vue';
import AdminRegister from '@/views/AdminRegister.vue';
import Management from '@/views/Management.vue';
import PostList from "../components/PostList.vue";
import PostDetails from "../components/PostDetails.vue";
import CategoryList from "../components/CategoryList.vue";
import CategoryDetails from "../components/CategoryDetails.vue";
import Home from "../views/Home.vue";
import PostManagement from "@/views/PostManagement.vue";
import EditPost from "@/views/EditPost.vue";

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView,
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  // },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  // 添加用户管理页面路由
  {
    path: '/user-management',
    name: 'UserManagement',
    component: UserManagement,
  },
  {
  path: '/admin-login',
  name: 'AdminLogin',
  component: AdminLogin,
},
{
  path: '/admin-register',
  name: 'AdminRegister',
  component: AdminRegister,
},
{
  path: '/management',
  name: 'Management',
  component: Management,
},
{
    path: "/posts",
    name: "post-list",
    component: PostList,
  },
  {
    path: "/posts/:id",
    name: "post-details",
    component: PostDetails,
  },
  {
    path: "/categories",
    name: "category-list",
    component: CategoryList,
  },
  {
    path: "/categories/:id",
    name: "category-details",
    component: CategoryDetails,
  },
   {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/management/post",
    name: "PostManagement",
    component: PostManagement,
    meta: { requiresAuth: true, isAdmin: true },
  },
  {
    path: "/management/post/edit/:postId",
    name: "EditPost",
    component: EditPost,
    meta: { requiresAuth: true, isAdmin: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem("token")) {
      next({ name: "Login" });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
