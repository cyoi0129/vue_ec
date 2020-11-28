<template>
  <v-container>
    <h1>Cart</h1>
    <v-card v-if="cartShow" class="pa-2" tile flat>
      <v-row>
        <v-col v-for="(product, index) in cartData" cols="12" sm="12" md="12" lg="12" xl="12" :key="index">
          <v-card class="mx-auto" tile flat>
            <v-row>
              <v-col cols="4"><router-link :to="{ name: 'Product', params: { pid:product.pid, productData:product }}"><v-img width="120px" :src="product.image"></v-img></router-link></v-col>
              <v-col cols="5" class="cartLink">
                <router-link :to="{ name: 'Product', params: { pid:product.pid, productData:product }}">
                  <v-card-title class="pa-0 ma-0">{{product.name}}</v-card-title>
                  <v-card-subtitle class="ma-1 pa-0"><span class="price">{{product.price | currency}}</span></v-card-subtitle>
                </router-link>
              </v-col>
              <v-col cols="3"><v-btn class="ma-0" @click="removeCart(index)" tile depressed text><v-icon :color="color" class="mt-2">mdi-cart-remove</v-icon></v-btn></v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-card-subtitle style="text-align:right">Total: <span class="price">{{cartTotal | currency}}</span></v-card-subtitle>
      <v-row align="center" justify="space-around">
        <v-btn class="ma-2" :color="color" dark><v-icon class="pr-2" @click="checkOut(cartTotal)">mdi-cart-check</v-icon>Check out</v-btn>
      </v-row>
    </v-card>
    <v-card v-else tile flat>
        <v-card-title>Nothing in cart.</v-card-title>
    </v-card>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>
<script>
export default {
  props:['products','articles','color','cartShow'],
  data: () => ({
    overlay: false,
  }),
  computed: {
    cartData() {
      return this.$store.getters.getCartData
    },
    cartTotal() {
      return this.$store.getters.getCartTotal
    }
  },
  methods: {
    removeCart:function(targetIndex) {
      this.$ga.event('removeCart', 'remove', '<remove>' + this.cartData[targetIndex].name , this.cartData[targetIndex].pid)
      this.$store.dispatch('removeCart', targetIndex)
      this.overlay = !this.overlay
    },
    checkOut: function(cartTotal) {
      this.$ga.event('checkOut', 'checkout', '<checkOut>' + cartTotal, cartTotal)
    }
  },
  filters: {
    currency: function (value) {
      if(value) {
        return '¥ ' + value.toLocaleString();
      }
    }
  },
  watch: {
    overlay (val) {
      val && setTimeout(() => {
        this.overlay = false
      }, 1000)
    }
  },
  mounted: function(){
    // GA tag
    this.$ga.page({
      page: '/cart',
      title: '<Cart>',
      location: window.location.href
    })
  }
}
</script>
<style>
.cartLink a {
  text-decoration: none;
  color:#555;
}
</style>