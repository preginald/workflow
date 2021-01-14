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
    taskTypes: ['none','bash','html','js','mysql','php','yml'],
    activeDoc: {},
    nav: false,
    isOwner: false,
    userLink: '',
    docValidation: {slug: false},
  },
  mutations: {
    setUser(state, user){
      state.user = user
    },
    setUserProfile(state, user){
      state.userProfile = user
    },
    setUidToUserProfile(state, uid){
      state.userProfile.uid = uid
    },
    setUserDocs(state, docs) {
      state.userDocs = docs
    },
    setDocSlugs(state, docSlugs) {
      state.docSlugs = docSlugs
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
    setUserLink( state, val ) {
      state.userLink = val
    },
    setEditDoc( state, status) {
      state.activeDoc.edit = status
    },
    setCreateDoc( state, status ) {
      state.activeDoc.create = status
    },
    setValidDocSlug( state, status) {
      state.docValidation.slug = status
    },
  },
  actions: {
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
    async login({ dispatch }, form) {
      // sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
      
      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)

    },
    async logout({ commit }){
      await fb.auth.signOut()

      // clear userProfile and redirect to /login
      commit('setUserProfile', null )
      commit('setNav', false)
      router.push('/login')
    },
    async fetchUserProfile({ commit, dispatch }, user){
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()

      // set user profile in state
      commit('setUserProfile', userProfile.data())

      // set uid to user profile in state
      commit('setUidToUserProfile', user.uid)

      // set user nav in state
      commit('setNav', true)

      dispatch('constructUserLink',userProfile.data().username)

      // change route to dashboard
      if (router.currentRoute.path === '/login') {
        router.push({ name: 'UserHome', params: { userName: userProfile.data().username}})
      }
    },
    async fetchUserDocs({ commit, dispatch }, params){
      var currentUser = await fb.auth.currentUser
      // fetch user docs
      await fb.docsCollection
        .where('username', '==', params.userName)
        .get()
        .then(((querySnapshot) => {
          let data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          const docSlugs = data.map(doc =>({
            id: doc.id, slug: doc.slug
          }))

        dispatch('constructUserLink', params.userName)

        commit('setDocSlugs', docSlugs)

          if(currentUser == null){
            data = data.filter(doc => doc.status == 'publish' )
          } else if(currentUser && data[0].uid !== currentUser.uid){
            data = data.filter(doc => doc.status == 'publish' )
          }

        // set active doc in state
        commit('setUserDocs',data)
        }))
    },
    async fetchActiveDoc({ state, dispatch }, params){
      if(typeof state.activeDoc.length == 'undefined'){
      // fetch active doc
      await fb.docsCollection
        .where('username', '==', params.userName)
        .where('slug', '==', params.docSlug)
        .get()
        .then(((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          dispatch('processor',data[0])
          // set active doc in state
          // commit('setActiveDoc',data[0])
        }))
      }
      dispatch('constructUserLink', params.userName)
      dispatch('isOwner')

    },
    processor({commit,state},doc){
      doc.steps.forEach(step => {
        step.tasks.forEach(task => {
          task.typeKey = state.taskTypes.indexOf(task.type)
        })
      })
      commit('setActiveDoc', doc)
    },
    loadUserDoc({ commit, dispatch }, doc) {
      commit('setValidDocSlug', false)
      if('uid' in doc){
        commit('setActiveDoc', doc)
        router.push({ name: 'ReadDoc', params: { userName: doc.username, docSlug: doc.slug } })
      } else {
        dispatch('fetchActiveDoc', doc)
      }
    },
    async isOwner({ commit, state }){
      var currentUser = await fb.auth.currentUser
      if(currentUser){
        var uid = currentUser.uid
        if(uid) {
          commit('setIsOwner', uid == state.activeDoc.uid)
        }
      } else {
        commit('setIsOwner', false)
      }

    },
    toggleCreateDoc( {state, commit} ){
      commit('setCreateDoc', !state.activeDoc.create)
      if(!state.activeDoc.create){
        router.push({ name: 'UserHome', params: { userName: state.userProfile.username}})
      }
    },
    async toggleEditDoc({ state, commit }) {
      let doc = state.activeDoc
      doc.edit = !doc.edit
      await fb.docsCollection.doc(doc.id)
        .update({
          edit: doc.edit 
        })
        .then(() => {
          console.log("Document successfully updated!")
        })
        .catch(error => {
          console.log("Error updating document: ", error)
        })
      commit('setActiveDoc', doc)
    },
    constructUserLink({ state, commit }, username) {
      if('username' in state.activeDoc) {
        username = state.activeDoc.username
      } else if ('username' in state.userProfile) {
        username = state.userProfile.username
      }
      commit('setUserLink', "/" + username);
    },
    async createDoc({state, commit },doc){
      doc.username = state.userProfile.username
      doc.uid = state.userProfile.uid
      const editStatus = doc.status == 'draft' ? true : false

      await fb.docsCollection.add(doc)
        .then(docRef => {
          console.log('Saved doc: ', docRef.id)
          commit('setActiveDoc', doc)
          commit('setEditDoc', editStatus) 
          router.push({ name: 'ReadDoc', params: { userName: doc.username, docSlug: doc.slug } })
        })
        .catch(error => {
          console.log("Error adding document: ", error)
        })
    },
    async deleteDoc({commit}, doc) {
      await fb.docsCollection.doc(doc.id).delete()
        .then(() =>{
          console.log("Document successfully deleted!")
          router.push({ name: 'UserHome', params: { userName: doc.username} })
          commit('setActiveDoc', {})
        })
        .catch((error) => {
          console.log("Error removing document: ", error)
        })
    },
    async softDeleteDoc({ commit },doc){
      await fb.docsCollection.doc(doc.id)
        .update({
          status: 'delete'
        })
        .then(() => {
          console.log("Document successfully updated!")
          doc.status = "delete"
        })
        .catch(error => {
          console.log("Error updating document: ", error)
        })
      commit('setActiveDoc', doc)
    },
    async updateDoc({ commit },doc){
      console.log(doc.id)
      await fb.docsCollection.doc(doc.id)
        .update(doc)
        .then(() => {
          console.log("Document successfully updated!")
        })
        .catch(error => {
          console.log("Error updating document: ", error)
        })
      commit('setActiveDoc', doc)
    },
    async updateSteps({state }){
      await fb.docsCollection.doc(state.activeDoc.id).update({
        steps: state.activeDoc.steps
      })
    },
    async slugCheck({ state, commit }) {
      if(state.docSlugs){
        let result = state.docSlugs.some(doc => {
          // console.log(payload.slug)
          return doc.slug === state.activeDoc.slug && doc.id != state.activeDoc.id
        })
        commit('setValidDocSlug', result) 
      } else {
        commit('setValidDocSlug', true)
      }
    },
  },
  modules: {},
});
