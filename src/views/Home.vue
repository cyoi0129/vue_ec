<template>
  <v-container class="pa-0">
    <v-carousel height="240" hide-delimiters>
      <v-carousel-item v-for="index in 3" :key="index" :src="'images/slider' + index + '.jpg'" v-bind:to="{ name: 'Special', params: { sid:index }}" reverse-transition="fade-transition" transition="fade-transition"></v-carousel-item>
    </v-carousel>
    <v-card class="mx-auto pa-2" tile>
      <h1>Enjoy Sample Shopping</h1>
      <v-list dense>
        <v-subheader>Why choose us?</v-subheader>
        <v-list-item-group :color="color">
          <v-list-item v-for="(item, i) in this.about" :key="i">
            <v-list-item-icon><v-icon v-text="item.icon"></v-icon></v-list-item-icon>
            <v-list-item-content><v-list-item-title v-text="item.text"></v-list-item-title></v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
    <v-card class="pa-2" tile flat>
      <h2>Products</h2>
      <v-row>
        <v-col v-for="(product, index) in products" cols="6" sm="6" md="4" lg="3" xl="2" :key="index">
          <v-card class="mx-auto" max-width="300" :to="{ name: 'Product', params: { pid:product.pid, productData:product }}" tile flat>
            <v-img class="white--text align-end" height="120px" :src="product.image"><v-card-title>{{product.name}}</v-card-title></v-img>
            <v-card-subtitle class="pa-1 price" style="text-align:center">{{product.price | currency}}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-card class="pa-2" tile flat>
      <h2>Articles</h2>
      <v-tabs v-model="tab" fixed-tabs :color="color">
        <v-tab v-for="(category, index) in Categories" :key="index">{{category}}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(category, index) in Categories" :key="index">
          <v-card v-for="article in getArticles(category)" :key="article.aid" class="ma-2" :to="{ name: 'Article', params: { aid:article.aid, articleData:article }}" flat>
            <v-row>
              <v-col cols="8" xs="8">
                <v-card-title class="px-2 py-0 ma-0">{{article.title}}</v-card-title>
                <v-card-text class="px-2 py-1 ma-0">{{article.description}}</v-card-text>
                <v-card-subtitle class="px-2 py-1 ma-0"><v-icon class="pr-2">mdi-clock-outline</v-icon>{{article.published}}<v-icon class="px-2">mdi-folder</v-icon>{{article.category}}</v-card-subtitle>
              </v-col>
              <v-col cols="4" xs="4">
                <v-img :src="article.thumbnail" max-width="120" class="pa-0 ma-0"></v-img>
              </v-col>
            </v-row>
            <v-divider></v-divider>
          </v-card>
          <v-row align="center" justify="space-around">
            <v-btn class="ma-2" :to="{ name: 'Category', params: { cid:index, categoryData:category }}" :color="color" dark>{{category}} Articles</v-btn>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>
<script>
export default {
  props:['products','articles','color'],
  filters: {
    currency: function (value) {
      return '¥ ' + value.toLocaleString();
    }
  },
  data: () => ({
    tab:[],
    about: [
      {
        icon:'mdi-truck',
        text:'Free shipping'
      },
      {
        icon:'mdi-hand-heart',
        text:'30 days return policy'
      },
      {
        icon:'mdi-cash',
        text:'Up to 70% OFF sale every month'
      },
    ]
  }),
  computed: {
    Categories() {
      return this.$store.getters.getCategories
    },
    getArticles: function() {
      return function(category) {
        return this.$store.getters.getArticles(category)
      }
    }
  },
  mounted: function(){
    // GA tag
    this.$ga.page({
      page: '/',
      title: '<Home>',
      location: window.location.href
    })
  }
}
</script>
<style>
.v-slide-group__prev--disabled {
    display:none!important;
}
.v-tabs--fixed-tabs > .v-tabs-bar .v-tab {
    font-size:12px!important;
    width:140px!important;
}
.listArticle {
    color:rgba(0, 0, 0, 0.6);
    text-decoration: none;
}
.v-window-item .v-card__title {
    font-size:18px;
    line-height:1.6em;
    display:-webkit-box;
    -webkit-box-orient: vertical;
    -moz-box-orient:vertical;
    -webkit-line-clamp:1;
    overflow:hidden;
}
.v-window-item .v-card__text {
    font-size:14px;
    line-height:1.6em;
    display:-webkit-box;
    -webkit-box-orient: vertical;
    -moz-box-orient:vertical;
    -webkit-line-clamp:2;
    overflow:hidden;
    height:48px;
}
.v-window-item .v-card__subtitle {
    font-size:12px;
}
.v-window-item .v-icon {
    font-size:14px;
}
</style>