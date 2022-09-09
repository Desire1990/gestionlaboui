<template>
  <div class="products">
    <!-- <router-link  @click="$router.back()">Back</router-link> -->
    <h1>Products</h1><hr>
    <ProductItem
      v-for="product in products.results"
      :key="product.id"
      :product="product"
      class="products__item"
    />
  </div>
</template>

<script>
import ProductItem from './product-item';
import axios from 'axios'

export default {
    components: {
      ProductItem,
    },
    name:'product',
    data(){
        return {
            products:[],
            id:this.$route.params.id
    }
  },
    mounted() {
    axios.get(this.$store.state.url + "/produit/?category="+this.id,this.header)
        .then(res => {
          this.products = res.data
          console.log(res.data)
        })
        .catch(err => {
            console.error(err); 
        })
    },  
}
    
</script>
<style type="text/css">
  h1{
    position: relative;
    text-align: center;
  }
</style>