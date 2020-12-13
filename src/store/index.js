import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    doc: {
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
  },
  mutations: {},
  actions: {},
  modules: {},
});
