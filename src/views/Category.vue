<template>
  <v-container>
    <h1>{{category}}</h1>
    <v-card class="catList ma-2" v-for="article in getArticles(category)" :key="article.aid" :to="{ name: 'Article', params: { aid:article.aid, article:article }}" flat>
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
  </v-container>
</template>
<script>
const param = Number(location.pathname.replace("/category/",""))
export default {
  props:['products','articles','categories','color','cid','categoryData'],
  data:() => ({
    category:'',
    index:''
  }),
  computed: {
    getArticles: function() {
      return function(category) {
        return this.$store.getters.getArticles(category)
      }
    }
  },
  mounted: function(){
    if(this.categoryData) {
      this.index = this.cid
      this.category = this.categoryData
    } else {
      this.index = param 
      this.category = this.categories[param]
    }
    // GA tag
    this.$ga.page({
      page: '/category/' + this.index,
      title: '<Category>' + this.category,
      location: window.location.href
    })
  }
}
</script>
<style>
.catList .v-card__title {
    font-size:18px;
    line-height:1.6em;
    display:-webkit-box;
    -webkit-box-orient: vertical;
    -moz-box-orient:vertical;
    -webkit-line-clamp:1;
    overflow:hidden;
}
.catList .v-card__text {
    font-size:14px;
    line-height:1.6em;
    display:-webkit-box;
    -webkit-box-orient: vertical;
    -moz-box-orient:vertical;
    -webkit-line-clamp:2;
    overflow:hidden;
    height:48px;
}
.catList .v-card__subtitle {
    font-size:12px;
}
.catList .v-icon {
    font-size:14px;
}
</style>