<template>
  <div class="w-full h-full text-white flex flex-col">
    <h1 class="font-sans text-4xl font-semibold mt-4 self-center mb-4 text-pink-800">
      Find your Meals
    </h1>
    <!-- serach and filter -->
    <div class="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
      <input
        class="rounded-md h-9 text-black pl-2 w-3/4 sm:w-1/2"
        type="text"
        placeholder="Search by Meal Name"
        v-model="searchQuery"
      />
      <input
        class="rounded-md h-9 text-black pl-2 w-3/4 sm:w-1/4"
        type="date"
        v-model="filterDate"
      />
    </div>
    <!-- end srach and filter -->
    <div class="flex flex-col sm:flex-row items-start justify-center w-full h-full gap-8 px-4">
      <!-- Display List of Meals -->
      <div
        class="bg-[#2D333A] w-[96%] sm:w-3/4 lg:w-[60%] min-h-[85vh] max-h-full flex flex-col rounded-lg"
      >
        <h2 class="text-3xl self-center mb-4 mt-4">Meals</h2>
        <ul class="w-full px-3 lg:px-4">
          <li
            v-for="meal in filteredMeals"
            :key="meal.id"
            class="mb-4 flex flex-col justify-start items-start border-2 p-2 rounded-md border-[#EFBAD3]"
          >
            <div>
              <h3 class="font-bold text-xl">{{ meal.name }}</h3>
              <p class="text-lg">Ingredients: {{ meal.ingredients.join(', ') }}</p>
              <p class="text-lg">Calories: {{ meal.calories }}</p>
              <p class="text-lg">Date: {{ meal.date }}</p>
            </div>
            <div class="flex self-end gap-2">
              <button
                @click="editMeal(meal)"
                class="bg-pink-300 text-slate-900 px-3 py-2 rounded-md"
              >
                Edit Meal
              </button>
              <button
                @click="deleteMeal(meal.id)"
                class="bg-red-500 text-white px-3 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </li>
        </ul>
      </div>
      <!-- end display -->
      <!-- Form to Add/Edit Meal -->
      <div
        class="bg-[#2D333A] w-[96%] sm:w-3/4 md:1/4 lg:w-1/4 h-full py-7 flex flex-col pl-7 rounded-lg shadow-md shadow-[#A264F4]"
      >
        <h2 class="self-center -ml-7 text-2xl text-[#EFBAD3]">Add Meal</h2>
        <div class="flex flex-col w-3/4 mt-6 gap-y-3">
          <label for="meal-name">Meal Name:</label>
          <input
            class="rounded-md h-9 text-black pl-2"
            type="text"
            id="meal-name"
            v-model="mealName"
            required
          />
        </div>
        <div class="flex flex-col w-3/4 mt-6 gap-y-3">
          <label for="ingredients">Ingredients:</label>
          <textarea
            class="rounded-md min-h-16 max-h-full text-black pl-2"
            type="text"
            id="ingredients"
            v-model="ingredients"
            required
          />
        </div>
        <div class="flex flex-col w-3/4 mt-6 gap-y-3">
          <label for="calories">Calories:</label>
          <input
            class="rounded-md h-9 text-black pl-2"
            type="number"
            id="calories"
            v-model="calories"
            required
          />
        </div>
        <div class="flex flex-col w-3/4 mt-6 gap-y-3">
          <label for="date">Date:</label>
          <input
            class="rounded-md h-9 text-black pl-2"
            type="date"
            id="date"
            v-model="date"
            required
          />
        </div>
        <div class="flex gap-4 mt-4">
          <button @click="addOrUpdateMeal" class="bg-[#EFBAD3] text-slate-700 px-4 py-2 rounded-md">
            {{ selectedMealId ? 'Update' : 'Add' }} Meal
          </button>
          <button @click="resetForm" class="bg-gray-500 text-white px-4 py-2 rounded-md">
            Cancel
          </button>
        </div>
      </div>
      <!-- end form -->
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    const mealName = ref('')
    const ingredients = ref('')
    const calories = ref('')
    const date = ref('')
    const selectedMealId = ref(null) 
    const searchQuery = ref('')
    const filterDate = ref('')

    const meals = computed(() => store.getters['meal/getMeals'])

    const filteredMeals = computed(() => {
      return meals.value.filter((meal) => {
        const matchesName = meal.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesDate = filterDate.value ? meal.date === filterDate.value : true
        return matchesName && matchesDate
      })
    })

    const addOrUpdateMeal = () => {
      if (selectedMealId.value === null) {
        store.dispatch('meal/addMeal', {
          id: Date.now().toString(),
          name: mealName.value,
          ingredients: ingredients.value.split(','),
          calories: calories.value,
          date: date.value
        })
        // alert('Meal added successfully!')
      } else {
        store.dispatch('meal/updateMeal', {
          id: selectedMealId.value,
          name: mealName.value,
          ingredients: ingredients.value.split(','),
          calories: calories.value,
          date: date.value
        })
        alert('Meal updated successfully!')
        selectedMealId.value = null
      }
      resetForm()
    }

    const editMeal = (meal) => {
      selectedMealId.value = meal.id
      mealName.value = meal.name
      ingredients.value = meal.ingredients.join(',')
      calories.value = meal.calories
      date.value = meal.date
    }

    const deleteMeal = (id) => {
      store.dispatch('meal/deleteMeal', id)
      alert('Meal deleted successfully!')
      resetForm()
    }

    const resetForm = () => {
      mealName.value = ''
      ingredients.value = ''
      calories.value = ''
      date.value = ''
      selectedMealId.value = null
    }

    return {
      meals,
      filteredMeals,
      mealName,
      ingredients,
      calories,
      date,
      searchQuery,
      filterDate,
      selectedMealId, 
      addOrUpdateMeal,
      editMeal,
      deleteMeal,
      resetForm
    }
  }
}
</script>

<style lang="scss" scoped>
/* Add your styles here */
</style>
