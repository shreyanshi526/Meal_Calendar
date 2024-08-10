import { createStore } from 'vuex';
import counter from './counter';  // Import the counter module
import meal from './Meals';        // Import the meal module

// Create the main store
const store = createStore({
  modules: {
    counter,
    meal,
  },
});

export default store;
