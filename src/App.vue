<template>
  <v-app>
    <v-card tile class="overflow-hidden" min-height="100vh" width="100vw">
      <v-app-bar :color="color" dark fixed app :clipped-left="clipped">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title><router-link :to="{name: 'Home'}">{{siteName}}</router-link></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon v-if="login" link :to="{name: 'User'}"><v-icon>mdi-account</v-icon></v-btn>
        <v-btn icon v-else @click="dialog=true"><v-icon>mdi-login</v-icon></v-btn>
        <v-btn icon link :to="{name: 'Cart'}"><v-icon>mdi-cart</v-icon><v-badge v-if="cartShow" color="red" :content="cartAmount"></v-badge></v-btn>
      </v-app-bar>
      <v-dialog v-model="dialog" max-width="320px">
        <v-card>
          <v-card-title class="blue darken-2 mb-4 white--text">User Login</v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="User" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Password" type="password" required></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :color="color" text @click="dialog=false">Cancel</v-btn>
            <v-btn :color="color" text @click="dialog=false,login=true" dark>Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-navigation-drawer :clipped="clipped" v-model="drawer" enable-resize-watcher app dark>
        <v-list nav dense>
          <v-list-item-group v-model="group" active-class="grey--text text--lighten-3">
            <v-list-item v-for="(item, index) in menu" :key="index" link :to="{name: item.name}">
              <v-list-item-icon><v-icon>{{ item.icon }}</v-icon></v-list-item-icon>
              <v-list-item-content><v-list-item-title>{{ item.name }}</v-list-item-title></v-list-item-content>
            </v-list-item>
            <v-list-item v-if="login" link :to="{name: 'User'}">
              <v-list-item-icon><v-icon>mdi-account</v-icon></v-list-item-icon>
              <v-list-item-content><v-list-item-title>User</v-list-item-title></v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <v-container fluid class="pa-0">
          <router-view :products="loadData.products" :articles="loadData.articles" :color="color" :cartShow="cartShow" :categories="Categories"></router-view>
        </v-container>
      </v-main>
      <v-footer dark padless :color="color">
        <v-card class="flex" flat tile>
          <v-card-title class="blue darken-3 justify-center">
            <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon><v-icon size="24px">{{ icon }}</v-icon></v-btn>
          </v-card-title>
          <v-card-text class="py-2 white--text text-center">{{ new Date().getFullYear() }} — {{siteName}}</v-card-text>
        </v-card>
      </v-footer>
    </v-card>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    items: [],
    color: 'blue darken-3',
    siteName: 'Sample Shopping',
    icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram',],
    menu: [
      {
        name: 'Home',
        path: '/',
        icon: 'mdi-home',
      },
      {
        name: 'Delivery',
        path: '/delivery',
        icon: 'mdi-home',
      },
      {
        name: 'Term',
        path: '/term',
        icon: 'mdi-home',
      },
      {
        name: 'Policy',
        path: '/policy',
        icon: 'mdi-home',
      },
      {
        name: 'Cart',
        path: '/cart',
        icon: 'mdi-cart',
      },
    ],
    login: false,
    dialog: false,
    drawer: false,
    clipped: false,
    group: null,
  }),
  computed: {
    loadData() {
      return this.$store.getters.getStateDataSet
    },
    cartAmount() {
      return this.$store.getters.getCartData.length
    },
    cartShow() {
      return (this.$store.getters.getCartData.length > 0)
    },
    Categories() {
      return this.$store.getters.getCategories
    },
  },
  created() {
    this.$store.dispatch('commitDataSet')
  }
}
</script>
<style>
.v-toolbar__title a {
  text-decoration: none;
  color:#fff!important;
}
main {
  min-height:720px;
  color:#555;
}
.price {
  font-size:14px!important;
  font-weight:bold!important;
  color:#F44336!important;
}
</style>