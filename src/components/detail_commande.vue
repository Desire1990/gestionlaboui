<template>
  <div :class="{popup:true, active:visible}" @click="close">
    <div class="popup-body" @click.prevent.stop>
      <center><h2>Commande</h2></center>
      <div v-if="commandes.length==0">{{action}}</div>
      <div class="scrollable-tab" v-else>
        <table class="table commandes">
          <thead>
            <tr class="panier-item">
              <th>id</th>
              <th>Commande</th>
              <th>Produit</th>
              <th>Quantites</th> 
              <!-- <th>Date</th>  -->

            </tr>
          </thead>
          <tbody id="commandes">
              <tr v-for="(item, index) in commandes.results">
                <td style="color:#aaa;">{{index+1}}</td>
                <td>{{item.commande.num_commande}}</td>
                <td>{{item.product.reference}}</td>
                <td>{{item.qte_commande}} {{item.product.unite}}</td>
                <!-- <td>{{datetime(item.commande.date_commande)}}</td> -->
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data(){
    return {
      commandes:[],
      action:"récuperation des commandes..."
    }
  },
  props: {
    visible:{ type:Boolean, default:false},
    commande:{ type:Object, required:true}
  },
  watch:{
    visible(is_visible){
      if(this.visible){
        let headers = {
          headers: {
            "Authorization": "Bearer " + this.$store.state.user.access
          }
        }
        axios.get(this.$store.state.url+'/commandeItem/?commande='+this.commande.id, this.header)
        .then((response) => {
          this.commandes = response.data;
          this.action = "pas de details."
          console.log(response.data)
        }).catch((error) => {
          console.error(error);
        });
      }
    }
  },
  methods: {
    close(){
      this.$emit("close")
    }
  }
};
</script>
<style scoped>
form{
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}
form div{
  margin: 5px;
}
[disabled]{
  border: 1px solid gray;
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
} loggout
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
</style>