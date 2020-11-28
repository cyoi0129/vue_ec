<template>
  <v-container class="pa-0">
    <v-card flat class="articleDetail pa-0">
      <h1>{{article.title}}</h1>
      <v-card-subtitle class="px-2 py-1 ma-0"><v-icon class="pr-2">mdi-clock-outline</v-icon>{{article.published}}<v-icon class="pl-4 pr-2">mdi-folder</v-icon>{{article.category}}</v-card-subtitle>
      <v-img :src="article.thumbnail"></v-img>
      <v-card-text>{{article.description}}</v-card-text>
      <v-card class="ma-2 pa-2 articleContents" v-html="article.contents" flat></v-card>
    </v-card>
    <v-divider></v-divider>
    <v-row align="center" justify="space-around">
      <v-btn class="ma-2" :to="{ name: 'Special', params: { sid: 3 }}" :color="color" dark>See Sale Products</v-btn>
    </v-row>
  </v-container>
</template>
<script>
const param = Number(location.pathname.replace("/article/",""))
console.log(param)
export default {
  data:() => ({
    article:[],
  }),
  props:['products','articles','color','aid','articleData'],
  mounted: function(){
    if(this.articleData) {
      this.article = this.articleData
    } else {
      this.article = this.articles.filter(item => item.aid === param)[0]
    }
    // GA tag
    this.$ga.page({
      page: '/article/' + this.article.aid,
      title: '<Article>' + this.article.title,
      location: window.location.href
    })
  }
}
</script>
<style>
.articleDetail h2, .articleDetail h3, .articleDetail li, .articleDetail p {
  color:#333;
}
.articleDetail h1 {
    font-size:18px;
    padding:12px;
    color:#555;
}
.articleDetail h2 {
  font-size:16px;
}
.articleDetail h3 {
  font-size:16px;
}
.articleDetail p, .articleDetail li {
  font-size:14px;
}
.articleDetail .v-card__subtitle {
  font-size:14px;
}
.articleDetail .v-icon {
  font-size:16px;
}
.articleDetail .v-card__text {
  font-size:12px;
}
.articleCV .v-btn {
  white-space:normal!important;
  height:auto!important;
  padding:8px!important;
}
.articleCV .v-btn__content {
  white-space: normal;
  width: 100%;
}
.articleDetail img {
  width:100%!important;
}
</style>