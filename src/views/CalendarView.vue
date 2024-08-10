<template>
  <div class="flex m-10 min-h-screen max-h-full">
    <draggable class="w-full" :list="currentWeek" @end="onDayDragEnd" group="days">
      <div
        class="day-item bg-gray-300 m-1 p-3 rounded-md text-center"
        v-for="day in currentWeek"
        :key="day.date"
      >
        <div class="day-header">
          {{ day.name }} - {{ day.date }}
        </div>
        <p class="total-calories">Total Calories: {{ calculateTotalCalories(day.dishes) }}</p>
        <draggable
          v-if="day.dishes.length"
          class="dish-list"
          :list="day.dishes"
          group="dishes"
          @end="onDishDragEnd"
          :data-index="currentWeek.indexOf(day)"
        >
          <div
            class="dish-item bg-pink-300 m-1 p-2 rounded-md"
            v-for="dish in day.dishes"
            :key="dish.id"
            :data-id="dish.id"
          >
            {{ dish.name }} - {{ dish.calories }} kcal
          </div>
        </draggable>
        <p v-else>No dishes</p>
      </div>
    </draggable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { VueDraggableNext } from 'vue-draggable-next'

export default defineComponent({
  components: {
    draggable: VueDraggableNext
  },
  setup() {
    const store = useStore()

    const getCurrentWeek = () => {
      const today = new Date()
      const dayOfWeek = today.getDay()
      const startOfWeek = new Date(today)
      startOfWeek.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1))

      const weekDays = []

      for (let i = 0; i < 7; i++) {
        const currentDay = new Date(startOfWeek)
        currentDay.setDate(startOfWeek.getDate() + i)

        const dayName = currentDay.toLocaleDateString('en-US', { weekday: 'long' })
        const formattedDate = currentDay.toISOString().split('T')[0]

        weekDays.push({
          name: dayName,
          date: formattedDate,
          dishes: []
        })
      }

      return weekDays
    }

    const currentWeek = ref(getCurrentWeek())

    const currentWeekWithDishes = computed(() => {
      return currentWeek.value.map((day) => {
        const dishesForDay = store.getters['meal/getMealsByDate'](day.date)
        return {
          ...day,
          dishes: dishesForDay
        }
      })
    })

    const calculateTotalCalories = (dishes: { calories: number }[]) => {
      return dishes.reduce((total, dish) => total + (dish.calories || 0), 0)
    }

    return {
      currentWeek: currentWeekWithDishes,
      calculateTotalCalories
    }
  },
  methods: {
    onDayDragEnd(event) {
      console.log('Day drag ended:', event)
    },
    onDishDragEnd(event) {
      const draggedMealId = event.item.dataset.id
      const newDayIndex = parseInt(event.to.dataset.index)
      const newDate = this.currentWeek[newDayIndex].date

      const draggedMeal = this.currentWeek.flatMap((day) =>
        day.dishes.find((dish) => dish.id === draggedMealId)
      )

      if (draggedMeal) {
        this.$store.dispatch('meal/updateMealDate', {
          mealId: draggedMealId,
          newDate
        })

        // Update the currentWeek data to reflect the changes after drag
        this.currentWeek = this.getCurrentWeek()
      }
    }
  }
})
</script>

<style scoped>
.day-item {
  min-height: 100px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
}
.day-header {
  font-weight: bold;
  margin-bottom: 10px;
}
.dish-list {
  min-height: 50px;
  border: 1px dashed #ddd;
  border-radius: 4px;
  padding: 5px;
}
.dish-item {
  cursor: move;
  background-color: #fbcfe8;
  margin: 2px;
  padding: 5px;
  border-radius: 4px;
}
.total-calories {
  font-weight: bold;
  margin-top: 10px;
}
</style>
