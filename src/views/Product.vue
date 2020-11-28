<template>
  <v-container>
    <v-card flat class="productDetail">
      <h1>{{product.name}}</h1>
      <v-img :src="product.image"></v-img>
      <v-card-subtitle class="py-4 px-2 ma-0"><v-icon class="pr-2">mdi-clock-outline</v-icon>{{product.date}}<v-icon class="pl-4 pr-2">mdi-earth</v-icon>{{product.series}}</v-card-subtitle>
      <v-card-text>{{product.introduce}}</v-card-text>
      <v-card-subtitle class="pa-1 price" style="text-align:center;font-size:24px!important">{{product.price | currency}}</v-card-subtitle>
    </v-card>
    <v-row align="center" justify="space-around">
      <v-btn class="ma-2" :color="color" dark @click="addCart"><v-icon class="pr-2">mdi-cart-plus</v-icon>Add to cart</v-btn>
    </v-row>
    <h2 class="mt-6 mb-2">Related Products</h2>
    <v-sheet class="mx-0 px-0 my-3" max-width="800">
      <v-slide-group multiple>
        <v-slide-item v-for="item in getRelated(this.product)" :key="item.pid" class="mx-2">
          <v-card tile flat @click="toRelated(item)">
            <v-img :src="item.image" width="120"></v-img>
            <v-card-title class="ma-1 pa-0">{{item.name}}</v-card-title>
            <v-card-subtitle class="ma-0 py-0 px-2 price">{{item.price | currency}}</v-card-subtitle>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>
<script>
const param = Number(location.pathname.replace("/product/",""))
export default {
  props:['products','color','pid','productData'],
  data: () => ({
    overlay: false,
    model: null,
    product:[]
  }),
  filters: {
    currency: function (value) {
      if(value) {
        return '¥ ' + value.toLocaleString();
      }
    }
  },
  computed: {
    getRelated: function() {
      return function(product) {
        return this.$store.getters.getRelated(product)
      }
    },
  },
  methods: {
    toRelated: function(item) {
      this.$router.push('/product/' + item.pid)
      this.product = item
    },
    addCart: function() {
      // GA tag
      this.$ga.event('addCart', 'add', '<add>' + this.product.name , this.product.pid)
      this.$store.dispatch('addCart', this.product)
      this.overlay = !this.overlay
    },
  },
  watch: {
    overlay (val) {
      val && setTimeout(() => {
        this.overlay = false
      }, 1000)
    }
  },
  mounted: function(){
    if(this.productData) {
      this.product = this.productData
    } else {
      this.product = this.products.filter(item => item.pid === param)[0]
    }
    // GA tag
    this.$ga.page({
      page: '/product/' + this.product.pid,
      title: '<Product>' + this.product.name,
      location: window.location.href
    })
  }
}
</script>
<style>
.productDetail h1 {
    font-size:18px;
    padding:12px;
    color:#555;
}
.productDetail .v-icon {
  font-size:16px;
}
.productDetail .v-card__subtitle {
  font-size:14px;
}
.productDetail .v-card__text {
  font-size:12px;
}
</style>