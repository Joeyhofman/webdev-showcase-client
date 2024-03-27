import { userHasRole } from "./router/index";


const sideBarItems = [
  {
    component: 'CNavTitle',
    name: 'Projecten',
  },
  {
    component: 'CNavItem',
    name: 'Mijn projecten',
    to: '/projects',
    icon: 'cil-people',
  },
  {
    component: 'CNavGroup',
    name: 'Pages',
    to: '/pages',
    icon: 'cil-star',
    items: [
      {
        component: 'CNavItem',
        name: 'Login',
        to: '/pages/login',
      },
      {
        component: 'CNavItem',
        name: 'Register',
        to: '/pages/register',
      },
      {
        component: 'CNavItem',
        name: 'Error 404',
        to: '/pages/404',
      },
      {
        component: 'CNavItem',
        name: 'Error 500',
        to: '/pages/500',
      },
    ],
  }
]

async function pushProtectedItems(){
  if(userHasRole("Admin")){
    sideBarItems.push({
      component: 'CNavTitle',
      name: 'Gebruikers',
    })
    
    sideBarItems.push({
      component: 'CNavItem',
      name: 'Gebruikers',
      to: '/users',
      icon: 'cil-people',
    });
  }
}

pushProtectedItems();

export default sideBarItems;
