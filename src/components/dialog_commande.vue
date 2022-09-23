<template>
	<div :class="{popup:true, active:visible}" @click="close">
		<div class="popup-body" @click.prevent.stop>
			<center>
				<h3>Augmenter {{produit.materiel}}</h3>
			</center>
			<form method="post">
				<div class="inline_field">
					<div class="field">
						<label for="lg_qtt">{{ produit.unite }}</label>
						<input type="number" v-model="lg_qtt" id="lg_qtt">
					</div>
					<div class="field" v-if="produit.rapport!=1">
						<label for="sm_qtt">{{ produit.unite_sortant }}</label>
						<input type="number" v-model="sm_qtt" id="sm_qtt">
					</div>
				</div>
				<div class="total">
					La quantité total en unités:
					<b>{{ qttTotal }}</b>
				</div>
				<div :class="{'inline_field':produit.rapport!=1}">
					<div class="field">
						<label for="prix">Prix unitaire</label>
						<input type="number" v-model="prix"
							id="prix" ref="prix">
					</div><br>
					<div class="field">
						<label for="total">Prix total</label>
						<input type="number" v-model="total"
							id="total" ref="total">
					</div>
				</div>
				<div class="field">
					<label for="id_prix">Details:</label>
					<textarea name="prix" v-model="details"></textarea> 
				</div>
				<div class="buttons">
					<div class="logs">{{logs}}</div>
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
			payee: 0, lg_qtt: 0, total:0, logs:"",
			sm_qtt: 0, prix: 0, details:""
		}
	},
	computed:{
		qttTotal(){
			return this.lg_qtt*this.produit.quantite+(this.sm_qtt*1);
		},
		headers(){
			return {
				headers: {
					"Authorization": "Bearer " + this.$store.state.user.access
				}
			}
		}
	},
	watch:{
		prix(value){
			if(this.$refs.prix == document.activeElement){
				this.total = value*this.qttTotal;
			}
		},
		total(value){
			if(this.$refs.total == document.activeElement){
				this.prix = value/this.qttTotal;
			}
		},
		achat(value){
			console.log(value);
			if(this.produit.quantite >=0){
				this.lg_qtt = value.quantite;
			} else {
				this.sm_qtt = value.quantite;
			}
			this.total = value.prix_total;
		}
	},
	methods: {
		close(){
			this.lg_qtt = 0;
			this.sm_qtt = 0;
			this.$emit("close")
		},
		submit(){
			if(!this.achat){
				this.performAchat()
			} else {
				this.performEdition()
			}
		},
		performAchat(){
			let data = {
				"quantite": this.qttTotal,
				"details": this.details,
				"prix_total": this.total,
				"produit": this.produit.id
			};
			let url = this.$store.state.url
			axios.post(url+"/achat/", data, this.headers)
			.then((response) => {
				let produits = this.$store.state.produits
				let produit = produits.find(x => x.id == this.produit.id);
				this.$store.state.achats.unshift(response.data)
				if(!!produit){
					produit.quantite += response.data.quantite;
					this.$emit("close");
				} else {
					this.logs = "quelque chose a mal tourné";
				}
			}).catch((error) => {
				if (!!error.response) {
					this.logs = error.response.data.status
				} else {
					this.logs = "une erreur est survenue";
				}
    		})
		},
		performEdition(){
			let data = {
				"quantite": this.qttTotal,
				"details": this.details,
				"prix_total": this.total,
				"produit": this.produit.id
			};
			let url = this.$store.state.url
			axios.put(url+`/achat/${this.achat.id}/`, data, this.headers)
			.then((response) => {
				this.produit.quantite-=this.achat.quantite;
				this.achat.quantite = response.data.quantite;
				this.produit.quantite += response.data.quantite;
				this.achat.prix_total = response.data.prix_total;
				this.achat.prix_unitaire = response.data.prix_unitaire;
				this.$emit("close");
			}).catch((error) => {
				if (!!error.response) {
					this.logs = error.response.data.status
				} else {
					this.logs = "une erreur est survenue";
				}
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
