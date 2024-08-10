import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CalendarView from '../views/CalendarView.vue'
import LogInSignIpView from '../views/LogInSignIpView.vue'
import MealView from '../views/MealView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', 
      name: 'home',
      component: HomeView
    },
    {
      path: '/meals',
      name: 'meals',
      component : MealView,
      children: [
        {
          path: 'add', // /meals/add
          name: 'AddMeal',
          component: MealView,
        },
        {
          path: 'all-meals', // /meals/dispaly
          name: 'all-meals',
          component: MealView,
        },
      
      ],
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarView
    },
    {
      path: '/login',
      name: 'Login',
      component: LogInSignIpView,  
    },
    {
      path: '/signup',
      name: 'Signup',
      component: LogInSignIpView,  
    }
  ]
})

export default router
