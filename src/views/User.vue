<template>
  <v-container class="pa-0">
    <v-card class="pa-2" tile>
      <h1>User Information</h1>
      <v-row>
        <v-col col="12">
          <v-text-field class="px-2" label="Name" :rules="rules.required" hide-details="auto" :color="color" :value="name" hint=""></v-text-field>
        </v-col>
      </v-row>
      <v-divider light class="my-4"></v-divider>
      <v-row>
        <v-col col="12">
          <v-text-field class="px-2" label="Phone" :rules="[rules.required, rules.phone]" hide-details="auto" :color="color" :value="phone" hint=""></v-text-field>
        </v-col>
      </v-row>
      <v-divider light class="my-4"></v-divider>
      <v-row>
        <v-col col="12">
          <v-text-field class="px-2" label="Mail" :rules="[rules.required, rules.email]" hide-details="auto" :color="color" :value="mail" hint=""></v-text-field>
        </v-col>
      </v-row>
      <v-divider light class="my-4"></v-divider>
      <v-row>
        <v-col col="12">
          <v-text-field class="px-2" label="Address" :rules="rules.required" hide-details="auto" :color="color" :value="address" hint=""></v-text-field>
        </v-col>
      </v-row>
      <v-divider light class="my-4"></v-divider>
      <v-row>
        <v-col col="12">
          <v-select class="px-2" label="Payment" v-model="payment" :items="method" item-text="name" item-value="index" :color="color"></v-select>
        </v-col>
      </v-row>
      <v-divider light class="my-4"></v-divider>
      <v-row align="center" justify="space-around">
        <v-btn class="ma-2" :color="color" dark><v-icon class="pr-2">mdi-content-save</v-icon>Save</v-btn>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
export default {
  props:['color'],
  data:() => ({
    rules:{
      required: [value => !!value || 'Required.'],
      phone: value => {
        const pattern = /^(0[5-9]0[0-9]{8}|0[1-9][1-9][0-9]{7})$/
        return pattern.test(value) || 'Invalid phone number.'
      },
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      },  
    },
    name:'Test User',
    phone: 123456789,
    mail: 'abcdefg@example.com',
    address: '1-2-3 Chiyoda, Chiyoda-ku, Tokyo, Japan',
    payment:'',
    method:['Credit Card','Bank Transfer','Cash on Delivery']
  }),
  mounted: function(){
    // GA tag
    this.$ga.page({
      page: '/user',
      title: '<User>',
      location: window.location.href
    })
  }
}
</script>