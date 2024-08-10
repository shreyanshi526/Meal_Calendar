import { createStore } from 'vuex';
import counter from './counter';  
import meal from './Meals';        

const store = createStore({
  modules: {
    counter,
    meal,
  },
});

export default store;
