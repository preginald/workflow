import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    userProfile: {},
    doc: {
      username: 'preginald',
      title: 'Install Wordpress on Apache2 VirtualHost',
      inputs: [
        { name: 'databaseName', label: 'Database name', value: 'wordpress' },
        { name: 'databaseUser', label: 'Database user', value: 'wordpress' },
        {
          name: 'databasePassword',
          label: 'Database password',
          value: 'supersecret',
        },
        {
          name: 'domainName',
          label: 'Domain name',
          value: 'wordpress.com',
        },
        {
          name: 'subdomain',
          label: 'Sub domain',
          value: 'www',
        },
      ],
      steps: [
        {
          order: 1,
          title: 'Create a database',
          tasks: [
            { order: 1, title: 'mysql -u root -p' },
            {
              order: 2,
              title: 'CREATE DATABASE <variable>databaseName</variable>;',
            },
            {
              order: 3,
              title:
                "CREATE USER <variable>databaseUser</variable> IDENTIFIED BY '<variable>databasePassword</variable>';",
            },
            {
              order: 4,
              title:
                'GRANT ALL PRIVILEGES ON <variable>databaseName</variable>.* TO <variable>databaseUser</variable>@localhost;',
            },
            { order: 5, title: 'FLUSH PRIVILEGES;' },
            { order: 6, title: 'exit' },
          ],
        },
        {
          order: 2,
          title: 'Download WordPress',
          tasks: [
            { order: 1, title: 'cd ~' },
            {
              order: 2,
              title: 'rm -rf wordpress',
            },
            {
              order: 3,
              title: 'wget http://wordpress.org/latest.tar.gz',
            },
            {
              order: 4,
              title: 'tar xzvf latest.tar.gz',
            },
          ],
        },
        {
          order: 3,
          title: 'Configure WordPress',
          tasks: [
            { order: 1, title: 'cd ~/wordpress' },
            {
              order: 2,
              title: 'cp wp-config-sample.php wp-config.php',
            },
            {
              order: 3,
              title: 'vim wp-config.php',
            },
            {
              order: 4,
              title: "define('DB_NAME', '<variable>databaseName</variable>’);",
            },
            {
              order: 5,
              title: "define('DB_USER', '<variable>databaseUser</variable>');",
            },
            {
              order: 6,
              title:
                "define('DB_PASSWORD', '<variable>databasePassword</variable>');",
            },
            {
              order: 7,
              title: "define('FS_METHOD','direct');",
            },
          ],
        },
        {
          order: 4,
          title: 'Copy files',
          tasks: [
            { order: 1, title: 'cd /var/www' },
            {
              order: 2,
              title: 'sudo mkdir <variable>domainName</variable>',
            },
            {
              order: 3,
              title:
                'sudo rsync -avP ~/wordpress/ /var/www/<variable>domainName</variable>/',
            },
            {
              order: 4,
              title: 'cd /var/www/<variable>domainName</variable>',
            },
            {
              order: 5,
              title:
                'sudo mkdir /var/www/<variable>domainName</variable>/wp-content/uploads',
            },
            {
              order: 6,
              title: 'sudo chown -R www-data:www-data *',
            },
          ],
        },
        {
          order: 5,
          title: 'Configure Apache',
          tasks: [
            { order: 1, title: 'cd /etc/apache2/sites-available' },
            {
              order: 2,
              title:
                'sudo cp 000-default.conf <variable>domainName</variable>.conf',
            },
            {
              order: 3,
              title: 'sudo vim <variable>domainName</variable>.conf',
            },
            {
              order: 4,
              title: 'ServerName <variable>domainName</variable>',
            },
            {
              order: 5,
              title:
                'ServerAlias <variable>subdomain</variable>.<variable>domainName</variable>',
            },
            {
              order: 6,
              title: 'sudo chown -R www-data:www-data *',
            },
          ],
        },
      ],
    },
    users: [
      {
        name: 'preginald',
        docs: [
          {
            title: 'Wordpress install on LAMP',
            slug: 'wordpress-install-lamp',
            subtitle:
              'Steps that I use to install Wordpress on my LAMP droplet.',
          },
        ],
      },
    ],
  },
  mutations: {
    setUser(state, user){
      state.user = user
    },
    setUserProfile(state, user){
      state.userProfile = user
    },
  },
  actions: {
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
      router.push('/login')
    },
    async fetchUserProfile({ commit }, user){
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()

      // set user profile in state
      commit('setUserProfile', userProfile.data())

      // change route to dashboard
       router.push({ name: 'user', params: { userName: userProfile.data().username}})
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
