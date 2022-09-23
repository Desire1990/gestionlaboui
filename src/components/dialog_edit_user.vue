<template>
	<div :class="{popup:true, active:visible}" @click="close">
		<div class="popup-body" @click.prevent.stop>
			<div class="head">
				<h3 style="color:#007bff;">Modifier Utilisateur</h3><hr>
				<!-- <button class="close" @click="close">x</button> -->
			</div>
			<form method="post">
				<div class="field">
					<label for="id_username">Username:</label>
					<input type="text" v-model="new_user.username" id="id_username">
				</div>
				<div class="field">
					<label for="id_first_name">Prenom:</label>
					<input type="text" v-model="new_user.first_name" id="id_first_name">
				</div>
				<div class="field">
					<label for="id_last_name">Nom:</label>
					<input type="text" v-model="new_user.last_name" id="id_last_name">
				</div>
				<div class="field">
					<label for="id_first_name">
						Mot de passe:
					</label>
					<input type="password" v-model="new_user.password" id="id_psswd">
				</div>
				<div class="field">
					<label for="confirm">
						confirmation:
					</label>
					<input type="password" v-model="confirm" id="confirm">
				</div>
				<div class="field" v-if="is_admin">
					<label for="id_group">Groupe:</label>
					<select v-model="group">
						<option v-for="group in groups" :selected="user.groups.includes(group)" :value="group">
							{{group}}
						</option>
					</select>
				</div>
				<div class="buttons">
					<div class="logs">{{logs}}</div>
					<input type="submit" value="Modifier" @click="changerUser">
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
		item:{ type:Object, required:true},
	},
	data(){
		return {
			logs:"", new_user:{}, group:"",
			groups:["admin", "gerant", "caissier"],
			confirm:""
		}
	},
	computed:{
		is_admin(){
			return this.$store.state.user.is_admin
		}
	},
	watch:{
		item(new_value){
			this.new_user = JSON.parse(JSON.stringify(new_value));
		}
	},
	methods: {
		close(){
			this.$emit("close");
		},
		changerUser(){
			let user = {
				"username":this.new_user.username,
				"first_name":this.new_user.first_name,
				"last_name":this.new_user.last_name,
			}
			if(!!this.group){
				user["group"] = this.group
			}
			if(!!this.new_user.password){
				if(this.new_user.password==this.confirm){
					if(this.new_user.password.length<6){
						this.logs = "le mot de passe doit avoir au moins 6 caractères"
						return;
					}
					user["password"]=this.new_user.password
				}else{
					this.logs = "les mot de passes doivent être identiques"
					return;
				}
			}
			let headers = {
				headers: {
				"Authorization": "Bearer " + this.$store.state.user.access
				}
			};
			axios.put(this.$store.state.url+`/user/${this.item.id}/`, user, headers)
			.then((response) => {
				Object.assign(this.item, response.data);
				this.$emit("close");
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
.close{
	position: absolute;
	right: 0;
	top: 0;
	background: #ffff;
	color:#000;
	font-size: 1.2em;
	font-weight: bold;
	padding: 0 5px;
}
.head{
	display: flex;
	justify-content: center;
	align-items: center;
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
label{
	padding:0px;
	text-transform: capitalize;
	font-size: 20px;
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