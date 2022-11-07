<template>
  <div class="parent">
	  <div>
	    <!-- <i class="fa fa-shopping-cart" style="font-size:36px; float:right; padding-right: 20px; color: var(--success);">({{cartTotalLengt}})</i> -->
      <div id="cart">
        <router-link class="text-light" :to="{ name: 'CartOrder' }"
          ><i class="fa fa-shopping-cart" style="font-size:36px; float:right; padding-right: 20px; color: var(--success);"> ({{ length }})</i
        ></router-link>
      </div>
	  </div>
  	 <div class="form-inline my-2 my-lg-0 top" style="padding:20px;">
        <input class="form-control mr-sm-2" type="text" placeholder="Search" v-model="search_term" aria-label="Search">
        <button type="reset" @click="search_term=''">&times</button>

      </div>
    <!-- <div class="top"> -->
      <!-- <SearchBar :show_date="false" @searched="performFilter" /> -->
    <!-- </div> -->
    <div class="recycler">
    </div>
		<div class="scrollable-tab">
        <table class="table commandes">
          <thead>
            <tr class="panier-item">
              <th>#</th>
              <th>Commande</th>
              <th>Bon Livraison</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody id="commandes">
              <tr v-for="(item, index) in bonLivraisons.results">
                <td style="color:#aaa;">{{index+1}}</td>
                <td>{{item.commande.num_commande}}</td>
                <td>{{item.num_bon}}</td>
                <td class='inset'>
                	<table>
                		<thead>
	                		<tr>
								<th>Produit</th>
								<th>Quantites Livrees</th> 
								<th>Quantites Restantes</th>
								<th>Action</th>
	                		</tr>
                		</thead>
                		<tbody>
                			<tr v-for="el in item.items_bons ":key='el.id' >
                				<td >{{el.produit.reference}}</td>
                				<td >{{el.qte_livree}} {{el.unite}}</td>
                				<td >{{el.qte_restante}} {{el.unite}}</td>
                				<th>
        									<div class="btns" >
        										<button @click="addToCart(el)">Order</button>
        									</div>
                				</th>
                			</tr>
                		</tbody>
                	</table>
                </td>
              </tr>
          </tbody>
        </table>
	</div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import axios from "axios";
export default {
    name: 'Cart',
    data() {
        return {
            cart: {
                items: []
            },
      cartCount:0,
      latestProducts:[],
      quantity:1,
      bonLivraisons:this.$store.state.bonLivraisons,
      action:"récuperation des commandes...",
      search_term:''
    }
  },
  mounted(){
    this.cart = this.$store.state.cart
    document.title = 'Stocks | Productos'
    axios.get(this.$store.state.url+'/bonLivraison/', this.header)
    .then((response) => {
      this.bonLivraisons = response.data;
      console.log(response.data)
      this.action = "pas de details."
      // console.log(response.data)
    }).catch((error) => {
      console.error(error);
    });

  },
  computed: mapGetters({
    products: 'allProducts',
    length: 'getNumberOfProducts'
  }),
  methods: mapActions([
    'addToCart'
  ])
};
</script>
<style scoped>
.top{
  display: flex;
  justify-content: center;
}
.empty{
	color: red;
}
.low{
	color:green;
}
.scrollable-tab{
  width: 100%;
  /*height: 0px;*/
  overflow: auto;
  padding: 0 20px;
  position: relative;
}
.scrollable-tab table thead tr th{
  position: sticky;
  top: 0;
}
.scrollable-tab table tfoot tr th{
  position: sticky;
  bottom: 0;
}
.btns{
	display: flex;
	float: right;
	padding:0px;
}
.hidden{
  visibility: hidden;
}
@media screen and (max-width: 650px){
  .scrollable-tab{
    position: inherit;
    height: auto;
    overflow-y: hidden;
  }
  .scrollable-tab table thead tr th{
    position: inherit;
  }
}
button, input[type=submit] {
    padding: 8px 15px;
    font-size: 1em;
    background: teal;
    border-radius: 0;
    border-width: 0;
    color: #fff;
    margin: 5px;
}
thead{
	background-color: #fff;
	padding: 0px;
	margin: 0px;
}
@charset "UTF-8";
:root {
	--primary: #0088aa;
	--primary-light: #afd8f3;
	--hover: #29b;
}
*{
	box-sizing: border-box;
	text-decoration: none;
  	margin: 0;
  	padding: 0;
  	outline:0;
}
html {
	font-family: sans-serif;
	line-height: 1.15;
	margin: 0;
	padding: 0;
	height: 100%;
	overflow: hidden;
}
body,#body {
	background: #eee;
	margin: 0;
	padding: 0;
	height: 100%;
}
input[type=text], input[type=password], input[type=number], select{
	padding: 7px;
	font-size: 12pt;
    border-radius: 0;
    border: 1px solid black;
}
input[type=submit], button{
	padding: 8px 15px;
	font-size: 1em;
	background: var(--primary);
	border-radius: 0;
	border-width: 0;
	color: white;
	margin: 5px;
}
.main{
	display: flex;
	height: 100%;
	min-height: 100%;
}
.parent{
	width: 100%;
}
.field{
	margin: 10px 0;
}
.field *{
	display: block;
	width: 100%;
}
.recycler{
  display: flex;
  flex-wrap: wrap;
}
.logout{
  border-radius: 0;
  position: fixed;
  top:50px;
  right: 0;
  font-weight: bold;
  margin: 0;
  background-color: #955;
  z-index: 2;
}
tr th{
	background-color: #f5f5f5;
}
tr:nth-child(even) {
  background-color: #eee;
}
td{
	padding-right: 10px;
}
.loggout{
	position: fixed;
	right: 10px;
	top: 5px;
	font-size: 20px;
	background: #944;
	color: #ccc;
	padding: 3px 10px;
	box-shadow: 0px 0px 5px 2px #777;
}
.loggout:hover{
	color: #fff;
}
.table button, .table .btn{
	padding: 3px 1em;
}
.table tr:hover {
	background-color: #ddd;
}
.table {
	border-collapse: collapse;
	width: 100%;
}
.table th, .table td {
	border-bottom: 1px solid #aaa;
	text-align: left;
	height: 30px;
}
.popup{
	position: fixed;
	background-color: rgb(0,0,0,0.5);
	top:0;
	left:0;
	width: 100%;
	height: 100%;
	visibility: hidden;
	overflow-y: scroll;
	z-index: 3;
}
.popup.active{
	visibility: visible;
}
.popup-body{
	position: absolute;
	border-radius: 0;
	top:30%;
	left:50%;
	transform: translate(-50%, -30%);
	background-color: white;
	opacity: 1;
	padding: 5px;
}
@media screen and (max-width: 650px){
}
.vide{
	padding: 40px;
	margin: 40px;
	text-align: center;
}
.inset{
	padding: 0px;
}
.inset  table{
	width: 100%;
}
.inset *{
	padding: 0px;
}
</style>
