import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    userProfile: {},
    userDocs: null,
    activeDoc: {},
    nav: false,
    isOwner: false,
  },
  mutations: {
    setUser(state, user){
      state.user = user
    },
    setUserProfile(state, user){
      state.userProfile = user
    },
    setUserDocs(state, docs) {
      state.userDocs = docs
    },
    setActiveDoc(state, doc){
      state.activeDoc = doc
    },
    setNav( state, status ) {
      state.nav = status
    },
    setIsOwner( state, val ) {
      state.isOwner = val
    },
  },
  actions: {
    async login({ commit, dispatch }, form) {
      // sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
      
      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)

      commit('setNav', true)
    },
    async logout({ commit }){
      await fb.auth.signOut()

      // clear userProfile and redirect to /login
      commit('setUserProfile', null )
      commit('setNav', false)
      // router.push('/login')
    },
    async fetchUserProfile({ commit }, user){
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()

      // set user profile in state
      commit('setUserProfile', userProfile.data())

      // change route to dashboard
      if (router.currentRoute.path === '/login') {
        router.push({ name: 'UserHome', params: { userName: userProfile.data().username}})
      }
    },
    async fetchActiveDoc({ commit }, params){
      // fetch active doc
      fb.docsCollection
        .where('username', '==', params.userName)
        .where('slug', '==', params.docSlug)
        .get()
        .then(((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        // set active doc in state
        commit('setActiveDoc',data[0])
        }))
    },
    async updateSteps({state }){
      // console.log(state.activeDoc.steps)
      fb.docsCollection.doc(state.activeDoc.id).update({
        steps: state.activeDoc.steps
      })
    },
    isOwner({ commit, state }){
      var uid = fb.auth.currentUser.uid

      if(uid) {
        commit('setIsOwner', uid == state.activeDoc.uid)
      } else {
        commit('setIsOwner', false)
      }
    },
    loadUserDoc({ commit }, doc) {
      commit('setActiveDoc', doc)
      router.push({ name: 'UserDoc', params: { userName: doc.username, docSlug: doc.slug } })
    },
    async signup({ dispatch }, form){
      // sign user up
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

      // create user profile object in userCollection
      await fb.usersCollection.doc(user.uid).set({
        username: form.username
      })

      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    },
  },
  modules: {},
});
