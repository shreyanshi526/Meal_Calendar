import type { Module } from 'vuex';
import { useRouter } from 'vue-router';

const router = useRouter();

interface State {
  isAuthenticated: boolean;
}

const state: State = {
  isAuthenticated: false,
};

const mutations = {
  SET_AUTH(state: State, authStatus: boolean) {
    state.isAuthenticated = authStatus;
  },
};

const actions = {
  login({ commit }: any, router: any) {
    commit('SET_AUTH', true); 
    alert('Login successful!');
    router.push('/meals');
  },
  signup({ commit }: any, router: any) {
    commit('SET_AUTH', true);
    alert('Signup successful!');
    router.push('/meals');
  },
  logout({ commit }: any, router: any) {
    commit('SET_AUTH', false); 
    alert('Logout successful!');
    router.push('/login');
  },
};

const counter: Module<State, any> = {
  state,
  mutations,
  actions,
};

export default counter;
