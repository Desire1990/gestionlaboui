<template>
  <div class="products">
    <div>
      <h1 >Categories</h1><hr>      
    </div>
    <CategoryItem
      v-for="category in categories.results"
      :key="category.id"
      :category="category"
      class="categories__item"
    />
  </div>
</template>

<script>
import CategoryItem from './category-item';
import axios from 'axios'

export default {
    components: {
      CategoryItem,
    },
    name:'category',
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
<style type="text/css">
  h1{
    position: relative;
    text-align: center;
  }
</style>