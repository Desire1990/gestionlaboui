<template>
    <div>
        <h1> All Categories </h1>
        <div>
            <hr>
            <table class="table table-dark text-left" >
                <thead class="tr">
                    <tr>
                        <th>#</th>
                        <th>NAME</th>
                        <th>Products</th>
                    </tr>
                </thead> 
                <tbody>
                    <tr class="text-left" v-for="(cat, index) in categories.results" :key="cat.id">
                        <th>{{ index+1 }}</th>
                        <th>{{ cat.name }}</th>
                        <th> 
                        <router-link :to="{ name: 'product', params: {id: cat.id} }"> 
                            view all products 
                        </router-link> 
                    </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name:'category',
        // template: ['id'],
        data(){
            return {
                categories:[],
                id:this.$route.params.id
    }
  },
    mounted() {
    axios.get(this.$store.state.url + "/category/?domain="+this.id,this.header)
        .then(res => {
          this.categories = res.data
          console.log(res.data)
        })
        .catch(err => {
            console.error(err); 
        })
    },  
    computed:{
          header(){
              return{
          headers :{
            "Authorization" : `Bearer ${this.$store.state.user.access}`
          },
        }
      },
  },
}
    
</script>

<style scoped>
    .models{
        background-color: lightcyan;
        border: 10px;
    }
    .tr{
        color: #fff;
        background-color: teal;

    }
    h1{
      padding: 4px;
      text-align: center;
      text-transform: uppercase;
      text-decoration: !important;
      text-anchor: middle;
    }
</style>