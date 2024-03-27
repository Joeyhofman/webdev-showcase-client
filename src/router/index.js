import { h, nextTick, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import axios from 'axios'

import DefaultLayout from '@/layouts/DefaultLayout'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        meta: {requiresAuth: true},
        component: () =>
          import(
            '@/views/dashboard/Dashboard.vue'
          ),
      },
      {
        path: "/projects/:id/diagrams",
        name: "projectdiagrams",
        meta: {requiresAuth: true},
        component: () => import('@/views/projects/diagrams/Diagrams.vue')
      },
      {
        path: "/projects/:id/invitations",
        name: "Projects-notifications",
        meta: {requiresAuth: true},
        component: () => import('@/views/projects/invitations/invitations.vue')
      },
      {
        path: "/projects",
        name: "Projects",
        meta: {requiresAuth: true},
        component: () => import('@/views/projects/projects.vue')
      },
      {
        path: "/setup-two-factor-auth",
        name: "SetupTwoFactorAuth",
        meta: {requiresAuth: true},
        component: () => import('@/views/twofactorauth/SetupTwoFactorAuth.vue')
      },
      {
        path: '/users',
        name: "Users",
        meta: {requiresAuth: true, requiresRole: "Admin"},
        component: () => import('@/views/users/Users.vue'),
      },
      {
        path: '/theme',
        name: 'Theme',
        meta: {requiresAuth: true},
        redirect: '/theme/typography',
      },
      {
        path: '/theme/colors',
        name: 'Colors',
        meta: {requiresAuth: true},
        component: () => import('@/views/theme/Colors.vue'),
      },
      {
        path: '/theme/typography',
        name: 'Typography',
        meta: {requiresAuth: true},
        component: () => import('@/views/theme/Typography.vue'),
      },
      {
        path: '/base',
        name: 'Base',
        meta: {requiresAuth: true},
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/base/breadcrumbs',
        children: [
          {
            path: '/base/accordion',
            name: 'Accordion',
            meta: {requiresAuth: true},
            component: () => import('@/views/base/Accordion.vue'),
          },
          {
            path: '/base/breadcrumbs',
            name: 'Breadcrumbs',
            meta: {requiresAuth: true},
            component: () => import('@/views/base/Breadcrumbs.vue'),
          },
          {
            path: '/base/cards',
            name: 'Cards',
            meta: {requiresAuth: true},
            component: () => import('@/views/base/Cards.vue'),
          },
          {
            path: '/base/carousels',
            name: 'Carousels',
            meta: {requiresAuth: true},
            component: () => import('@/views/base/Carousels.vue'),
          },
          {
            path: '/base/collapses',
            name: 'Collapses',
            meta: {requiresAuth: true},
            component: () => import('@/views/base/Collapses.vue'),
          },
          {
            path: '/base/list-groups',
            name: 'List Groups',
            meta: {requiresAuth: true},
            component: () => import('@/views/base/ListGroups.vue'),
          },
          {
            path: '/base/navs',
            name: 'Navs',
            meta: {requiresAuth: true},
            component: () => import('@/views/base/Navs.vue'),
          },
          {
            path: '/base/paginations',
            name: 'Paginations',
            meta: {requiresAuth: true},
            component: () => import('@/views/base/Paginations.vue'),
          },
          {
            path: '/base/placeholders',
            name: 'Placeholders',
            meta: {requiresAuth: true},
            component: () => import('@/views/base/Placeholders.vue'),
          },
          {
            path: '/base/popovers',
            name: 'Popovers',
            meta: {requiresAuth: true},
            component: () => import('@/views/base/Popovers.vue'),
          },
          {
            path: '/base/progress',
            name: 'Progress',
            meta: {requiresAuth: true},
            component: () => import('@/views/base/Progress.vue'),
          },
          {
            path: '/base/spinners',
            name: 'Spinners',
            meta: {requiresAuth: true},
            component: () => import('@/views/base/Spinners.vue'),
          },
          {
            path: '/base/tables',
            name: 'Tables',
            meta: {requiresAuth: true},
            component: () => import('@/views/base/Tables.vue'),
          },
          {
            path: '/base/tooltips',
            name: 'Tooltips',
            meta: {requiresAuth: true},
            component: () => import('@/views/base/Tooltips.vue'),
          },
        ],
      },
      {
        path: '/buttons',
        name: 'Buttons',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/buttons/standard-buttons',
        children: [
          {
            path: '/buttons/standard-buttons',
            name: 'Buttons',
            component: () => import('@/views/buttons/Buttons.vue'),
          },
          {
            path: '/buttons/dropdowns',
            name: 'Dropdowns',
            component: () => import('@/views/buttons/Dropdowns.vue'),
          },
          {
            path: '/buttons/button-groups',
            name: 'Button Groups',
            component: () => import('@/views/buttons/ButtonGroups.vue'),
          },
        ],
      },
      {
        path: '/forms',
        name: 'Forms',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/forms/form-control',
        children: [
          {
            path: '/forms/form-control',
            name: 'Form Control',
            component: () => import('@/views/forms/FormControl.vue'),
          },
          {
            path: '/forms/select',
            name: 'Select',
            component: () => import('@/views/forms/Select.vue'),
          },
          {
            path: '/forms/checks-radios',
            name: 'Checks & Radios',
            component: () => import('@/views/forms/ChecksRadios.vue'),
          },
          {
            path: '/forms/range',
            name: 'Range',
            component: () => import('@/views/forms/Range.vue'),
          },
          {
            path: '/forms/input-group',
            name: 'Input Group',
            component: () => import('@/views/forms/InputGroup.vue'),
          },
          {
            path: '/forms/floating-labels',
            name: 'Floating Labels',
            component: () => import('@/views/forms/FloatingLabels.vue'),
          },
          {
            path: '/forms/layout',
            name: 'Layout',
            component: () => import('@/views/forms/Layout.vue'),
          },
          {
            path: '/forms/validation',
            name: 'Validation',
            component: () => import('@/views/forms/Validation.vue'),
          },
        ],
      },
      {
        path: '/charts',
        name: 'Charts',
        component: () => import('@/views/charts/Charts.vue'),
      },
      {
        path: '/icons',
        name: 'Icons',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/icons/coreui-icons',
        children: [
          {
            path: '/icons/coreui-icons',
            name: 'CoreUI Icons',
            component: () => import('@/views/icons/CoreUIIcons.vue'),
          },
          {
            path: '/icons/brands',
            name: 'Brands',
            component: () => import('@/views/icons/Brands.vue'),
          },
          {
            path: '/icons/flags',
            name: 'Flags',
            component: () => import('@/views/icons/Flags.vue'),
          },
        ],
      },
      {
        path: '/notifications',
        name: 'Notifications',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/notifications/alerts',
        children: [
          {
            path: '/notifications/alerts',
            name: 'Alerts',
            component: () => import('@/views/notifications/Alerts.vue'),
          },
          {
            path: '/notifications/badges',
            name: 'Badges',
            component: () => import('@/views/notifications/Badges.vue'),
          },
          {
            path: '/notifications/modals',
            name: 'Modals',
            component: () => import('@/views/notifications/Modals.vue'),
          },
          {
            path: '/notifications/toasts',
            name: 'Toasts',
            component: () => import('@/views/notifications/Toasts.vue'),
          },
        ],
      },
      {
        path: '/widgets',
        name: 'Widgets',
        component: () => import('@/views/widgets/Widgets.vue'),
      },
    ],
  },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/pages/Page404'),
      },
      {
        path: '500',
        name: 'Page500',
        component: () => import('@/views/pages/Page500'),
      },
      {
        path: 'login',
        name: 'Login',
        meta: {requiresLogout: true},
        component: () => import('@/views/pages/Login'),
      },
      {
        path: 'register',
        name: 'Register',
        meta: {requiresLogout: true},
        component: () => import('@/views/pages/Register'),
      },
      {
        path: 'twofactorcode',
        name: 'TwoFactorCode',
        meta: {requiresLogout: true},
        component: () => import('@/views/pages/TwoFactorCode'),
      },
      {
        path: 'editor/:projectId/:diagramId',
        name: 'Editor',
        meta: {requiresAuth: true},
        component: () => import('@/views/diagram/Editor.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory("/"),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})


async function isAuthenticated() {
  try {
    const authToken = sessionStorage.getItem('token');
    const config = {
      headers: {
          'Authorization': `Bearer ${authToken}`
      }
    };

    const response = await axios.get(`https://localhost:7215/users/auth`, config);
    if(response.status === 401){
      return false;
    } else if(response.status === 200){
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

async function userHasRole(role){
  try {
    const authToken = sessionStorage.getItem('token');
        const config = {
          headers: {
              'Authorization': `Bearer ${authToken}`
          }
      };
  
  
        const response = await axios.get(`https://localhost:7215/users/role/${role}`, config);
        if(response.status == 401 || response.status === 403){
          return false;
        }
        const hasRole = response.data.result;
        return hasRole;
  } catch (error) {
    return false;
  }
}

router.beforeEach(async (to, from, next) => {
  try {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const requiredRole = to.meta?.requiresRole;
    const requiresLogout = to.meta?.requiresLogout;
  
    
    if (requiresAuth && !await isAuthenticated()) {
      next('/pages/login');
    }else if(requiresLogout && await isAuthenticated()) {
      console.log("redirecting to /")
      next("/");
    }else {
      if (requiredRole) {
        const hasRequiredRole = await userHasRole(requiredRole); // Pass the role name, not the boolean
        if (!hasRequiredRole) {
          next(from);
        } else {
          next();
        }
      } else {
        next();
      }
    }
  } catch (error) {
    next(false);
  }
});

export {
  userHasRole
}
export default router
