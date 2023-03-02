<template>
	<div :class="{popup:true, active:visible}" @click="close">
		<div class="popup-body" @click.prevent.stop>
			<center>
				<h3>Augmenter {{produit.materiel}}</h3>
			</center>
			<form method="post">
				<div class="inline_field">
					<div class="field">
						<label for="lg_qtt">Quantite in Stock</label>
						<input type="number" v-model="new_produit.quantite" id="lg_qtt">
					</div>
				<div class="field">
					<label for="id_entrant">Unité :</label>
					<select name="unite" id="" v-model="new_produit.unite" value="Selectionnez l'unite">
					<option disabled value="Selectionnez l'unite">Selectionnez l'unite ...</option>
					  <option>kg</option>
					  <option>g</option>
					  <option>pc(s)</option>
					  <option>l</option>
					  <option>ml</option>
					</select>		
				</div>
				</div>
				<div class="buttons">
					<input type="submit" @click="submit" value="submit">
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
		produit:{ type:Object, required:true},
		achat:{ type:Object, required:false}
	},
	data(){
		return {
			lg_qtt: 0,
			new_produit:"",
		}
	},
	watch:{
		produit(new_value){
			this.new_produit = JSON.parse(JSON.stringify(new_value));
		}
	},
	mounted(){
		this.fetchProducts
	},
	computed:{
		qttTotal(){
			return this.produit.quantite;
		},
		headers(){
			return {
				headers: {
					"Authorization": "Bearer " + this.$store.state.user.access
				}
			}
		}
	},
	methods: {
		close(){
			this.lg_qtt = 0;
			this.sm_qtt = 0;
			this.$emit("close")
		},
		submit(){
			this.augmenter()
		},
		fetchProducts(){
			axios.get(this.$store.state.url+'/produit/', this.header)
			.then((response) => {
				this.$store.state.products = response.data;
				this.items = response.data;
				this.datas=response.data.results
				console.log(response.data)
			}).catch((error) => {
				if(error.response.data.code == "token_not_valid"){
					let data = {
						refresh: this.$store.state.user.refresh
					};
					axios.post(this.$store.state.url+'/refresh/', data)
					.then((response) => {
						this.$store.state.user.access = response.data.access;
						this.fetchProducts();
					}).catch((error) =>{
						this.$store.state.user = null;
					})
				}
			});
		},
		augmenter(){
			let headers = {
				headers: {
				"Authorization": "Bearer " + this.$store.state.user.access
				}
			};
			axios.patch(this.$store.state.url+`/produit/${this.produit.id}/`, this.new_produit, headers)
			.then((response) => {
					// console.log(response.data.quantite)
					this.$emit("close");
					this.fetchProducts()
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
.inline_field{
	display: inline-grid;
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
