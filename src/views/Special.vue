<template>
  <v-container>
    <h1>{{title[index - 1]}}</h1>
    <v-card class="pa-2" tile flat>
      <v-row>
        <v-col v-for="(product, index) in products" cols="6" sm="6" md="4" lg="3" xl="2" :key="index">
          <v-card tile flat class="mx-auto" max-width="300" :to="{ name: 'Product', params: { pid:product.pid, productData:product }}">
            <v-img class="white--text align-end" height="120px" :src="product.image"><v-card-title>{{product.name}}</v-card-title></v-img>
            <v-card-subtitle class="pa-1 price" style="text-align:center">{{product.price | currency}}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
const param = Number(location.pathname.replace("/special/",""))
export default {
  props:['products','articles','sid'],
  data: () => ({
      title:[
        'New Arrival',
        'Free Shipping',
        'Summer Sale, Up to 70% off'
      ],
      index:'',
  }),
  filters: {
    currency: function (value) {
      if(value) {
        return '¥ ' + value.toLocaleString();
      }
    }
  },
  mounted: function(){
    if(this.sid) {
      this.index = this.sid
    } else {
      this.index = param
    }
    // GA tag
    this.$ga.page({
      page: '/special/' + this.index,
      title: '<Special>' + this.title[this.index],
      location: window.location.href
    })
  }
}
</script>