<template>
	<div :class="{popup:true, active:visible}" @click="close">
		<div class="popup-body" @click.prevent.stop>
			<center>
				<h3>Modifier {{produit.materiel}}</h3>
			</center>
			<form method="post">
				<div class="field">
					<label for="id_unite">Materiel:</label>
					<input type="text" v-model="new_produit.materiel" id="id_unite">
				</div>
				<div class="field">
					<label for="id_unite">Reference</label>
					<input type="text" v-model="new_produit.reference" id="id_unite">
				</div>
				<div class="field">
					<label for="id_prix">Quantite:</label>
					<input type="number" name="prix" placeholder="prix" required="" id="id_quantite" v-model="new_produit.quantite">
				</div>
				<div class="field">
					<label for="id_sortant">Unité:</label>
					<input type="text" v-model="new_produit.unite" id="id_sortant" placeholder="kg, l, g, mg, ml, ...">
				</div>
				<div class="field">
					<label for="status">Status:</label>
					<select v-model="new_produit.status">
						<option disabled value="">Selectionnez le status du materiel ...</option>
					  <option>fonctionel</option>
					  <option>non-fonctionel</option>
					  <option>reparable</option>
					</select>
					<input type="text" v-model="new_produit.status" id="id_sortant" placeholder="kg, l, g, mg, ml, ...">
				</div>
				<div class="field">
					<label for="id_rapport">Date de Peremption:</label>
					<input type="text" v-model="new_produit.date_peremption" id="id_rapport">
				</div>
				<div class="buttons">
					<div class="logs">{{logs}}</div>
					<input type="submit" value="Modifier" @click="changerPrix">
				</div>
    		</form>
		</div>
	</div>
</template>
<script>
import axios from "axios";
export default {
	props: {
		visible:{ type:Boolean, default:false},
		produit:{ type:Object, required:true}
	},
	data(){
		return {
			logs:"", new_price:"", new_produit:""
		}
	},
	watch:{
		produit(new_value){
			this.new_produit = JSON.parse(JSON.stringify(new_value));
		}
	},
	methods: {
		close(){
			this.$emit("close");
		},
		changerPrix(){
			let headers = {
				headers: {
				"Authorization": "Bearer " + this.$store.state.user.access
				}
			};
			axios.put(this.$store.state.url+`/produit/${this.produit.id}/`, this.new_produit, headers)
			.then((response) => {
				let produits = this.$store.state.produits;
				for(var i = 0; i < produits.length; i++){
					let x = produits[i];
					if(x.id==this.produit.id){
						this.$store.state.produits[i] = response.data;
						this.$emit("close");
						// break;
					}
				}
			}).catch((error) => {
				console.error(error);
			})
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
.buttons{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.buttons *{
  margin: 0;
}
.logs{
  width: 180px;
  color: red;
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
</style>