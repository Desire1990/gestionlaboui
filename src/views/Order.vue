<template>
<div class="container">
  <table class="table">
        <thead class="tr">
            <tr style={background-color:pink;} >
                <th >#</th> 
                <th>NAME</th> 
                <th>DESCRIPTION</th>
                <th>IMAGE</th>
                <th>PRICE</th>
                <th>ACTIONS</th> 
            </tr>
        </thead>
        <tbody>
            <tr class="text-left" v-for="(depot, index) in products.results" :key="depot.id" >
               
                <th>{{ index+1 }}.</th>
                <td>{{ depot.name }}</td>
                <td> {{(depot.description)}}</td>
                <td>  <img :src=" 'http://127.0.0.1:8000' + depot.get_thumbnail" :width="60" :height="60" /></td>
                <th>currency({{depot.price }})</th>
                <td >
                <div>
                    <button class="btn btn-info btn-sm ml-1 "  @click='Update(depot)'>Modifier </button>
                    <button class="btn btn-danger btn-sm ml-1" @click="Delete(depot)" >Effacer</button> 
                </div> 
                </td>
            </tr>
        </tbody>
  </table>
    <!-- <ModaleDepot v-if="update"  :updatedepot="updatedepot" @close="close"></ModaleDepot> -->
    </div>

</template>

<script>
import axios from 'axios'
// import ModaleDepot from '../components/add_product'
export default {
    // components:{ModaleDepot,},
    props:{last:Object},
    data() {
        return {
            update:false,
            products:this.$store.state.products,
            updatedepot:null,
            update:false,
            search_term:'',
            loading:false
        } 
    },
      watch:{
          "$store.state.products"(new_val){
              this.products = new_val
          }
      },
      computed:{
            header(){
                return {
                    headers: {
                        Authorization: `Bearer ${this.$store.state.user.access}`,
                    },
                };
            }

        },
      mounted(){
        this.getProducts()

      },
      methods:{
        close(){
            this.update=false
        },
        Update(depot){
            this.update = true
            this.updatedepot=depot

        },
        getProducts(){
          document.title='Home | products'
          axios.get(this.$store.state.url +'/commande/', this.header)
          .then((response) => {
            this.products = response.data
            console.log(response.data)
          }).catch((error) => {
            console.error(error);
          });

        },
      Delete(dep) {
        if (confirm('Delete ' + dep.name +' for '+dep.price+' $')) {
            axios.delete(this.$store.state.url+`/products/${dep.id}/`, this.header)
                .then( response => 
                    
                {
                    this.getProducts()
                    return response
                }
            );
        }
    },
      
 },     
}
</script>
<style scoped>
.tr {
    background-color: pink;
    text-align: left;
    color: white;
}
.tf {
    background-color: thistle;
    text-align: left;
    color: black;
}
.gold-star {
  background-color:white;
  color:black ;
}

.silver-star {
  background-color: green;
  color:white ;
}

.bronze-star {
  background-color: yellow;
  color:black ;
}

</style>