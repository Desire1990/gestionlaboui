<template>
  <div class="products">
    <!-- <router-link  @click="$router.back()">Back</router-link> -->
      <router-link to="/cart-order" class="button is-success" id="cart">
        <i class="fa fa-shopping-cart" > ({{ length }})</i>
      </router-link>
    <h1>Mon Stock</h1><hr>
    <StockItem
      v-for="(product) in bonLivraisonItems.results"
      :key="product.id"
      :product="product"
      class="stock__item"
    />
  </div>
</template> 

<script>
import { mapGetters, mapActions} from 'vuex'
import StockItem from './stockItem';
import axios from 'axios'

export default {
    components: {
      StockItem,
    },
    name:'product',
    data(){
        return {
        carts:{
          items:[]
          },
        bonLivraisonItems:this.$store.state.bonLivraisonItems,
    }
  },
  computed: {
    logged_in() {
      return this.$store.state.user != null;
    },
    length() {
      let totalLength = 0
      for (let i = 0; i < this.carts.items.length; i++) {
        totalLength += parseFloat(this.carts.items[i].quantity)
      }

      return totalLength
    }
  },
  mounted() {
    this.carts = this.$store.state.carts
    axios.get(this.$store.state.url + "/bonLivraisonItems/",this.header)
        .then(res => {
          this.bonLivraisonItems = res.data
          console.log(res.data)
        })
        .catch(err => {
            console.error(err); 
        })
    },  
}
    
</script>
<style type="text/css" scoped>
  @import url("https://fonts.googleapis.com/css?family=Fjalla+One|Montserrat:300,400,700,800|Open+Sans:300");
.stock__item {
  background-image: linear-gradient(to right bottom, #b98eda, #a09ae0, #8234e5, #5d3be8, #1241eb);
  margin: 10px;
  color: #fff;
}
  h1{
    text-align: center;
  }
  #cart{
    font-size: 36px;
    color: var(--primary);
    height: 1px;
    float: right;
    padding-right: 100px;
  }
</style>