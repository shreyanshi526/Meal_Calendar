import type { Module } from 'vuex';

interface Meal {
  id: string;
  name: string;
  ingredients: string[];
  calories: string;
  date: string;
}

interface MealState {
  meals: Meal[];
}

const state: MealState = {
  meals: [],
};

const mutations = {
  ADD_MEAL(state: MealState, meal: Meal) {
    state.meals.push(meal);
  },
  UPDATE_MEAL(state: MealState, updatedMeal: Meal) {
    const index = state.meals.findIndex(meal => meal.id === updatedMeal.id);
    if (index !== -1) {
      state.meals[index] = updatedMeal;
    }
  },
  DELETE_MEAL(state: MealState, id: string) {
    state.meals = state.meals.filter(meal => meal.id !== id);
  },
  UPDATE_MEAL_DATE(state: MealState, { mealId, newDate }: { mealId: string; newDate: string }) {
    const meal = state.meals.find(meal => meal.id === mealId);
    if (meal) {
      meal.date = newDate;
    }
  },
};

const actions = {
  addMeal({ commit }: any, meal: Meal) {
    commit('ADD_MEAL', meal);
  },
  updateMeal({ commit }: any, updatedMeal: Meal) {
    commit('UPDATE_MEAL', updatedMeal);
  },
  deleteMeal({ commit }: any, id: string) {
    commit('DELETE_MEAL', id);
  },
  updateMealDate({ commit }: any, payload: { mealId: string; newDate: string }) {
    commit('UPDATE_MEAL_DATE', payload);
  },
};

const getters = {
  getMeals: (state: MealState) => {
    console.log('Current state of meals:', state.meals);
    return state.meals;
  },
  getMealsByDate: (state: MealState) => (date: string) => {
    return state.meals.filter(meal => meal.date === date);
  },
};

const meal: Module<MealState, any> = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};

export default meal;
