<template>
<div class="center">
	<!-- <button class="change red" @click="changeColor('red')"></button> -->
	<!-- <button class="change green" @click="changeColor('green')"></button> -->
	<!-- <button class="change blue" @click="changeColor('blue')"></button> -->
	<input type="text" placeholder="Keyword" @keydown.stop 
		id="id_username" v-model="keyword" autofocus>
	<button type="reset" @click="keyword=''">&times</button>
	<div v-if="show_date" style="display:inline">
		<button style="margin-left:0">
			Date
		</button>
		<div class="form" v-if="triggered">
			<label>Du:</label>
			<input type="date" name="date_du" v-model="date.du"/>
			<label>Au:</label>
			<input type="date" name="date_au" v-model="date.au"/>
			<input type="submit" value="search"
				@click="performSearch"
				style="border:1px solid black" />
		</div>
	</div>
</div>
</template>

<script>
export default {
	props:{
		show_date:{type:Boolean, default:false}
	},
	components:{ },
	data(){
		return {
			keyword : "",
			date:{ du:null, au:null},
			triggered:false,
		}
	},
	watch:{
		keyword(val){
			this.$emit("searched", val);
		}
	},
	methods:{
		performSearch(){
			this.triggered=false;
			this.$emit("changed", this.date);
		},
		changeColor(color){
			if(color == 'red'){
				document.documentElement.style.setProperty('--primary', '#d55');
				document.documentElement.style.setProperty('--primary-light', '#faa');
				document.documentElement.style.setProperty('--hover', '#faa');
			}
			if(color == 'green'){
				document.documentElement.style.setProperty('--primary', 'green');
				document.documentElement.style.setProperty('--primary-light', '#595');
				document.documentElement.style.setProperty('--hover', '#595');
				
			}
			if(color =='blue'){
				document.documentElement.style.setProperty('--primary', '#08a');
				document.documentElement.style.setProperty('--primary-light', 'lightblue');
				document.documentElement.style.setProperty('--hover', '#29b');
			}
		}
	}
};
</script>
<style scoped>
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
.center{
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
}
.change{
}
.red{
	background-color: red;
}
.green{
	background-color: green;
}
.blue{
	background-color: #0088aa;
}
.form{
	position: absolute;
	z-index: 3;
	background-color: #007799;
	padding: 5px 10px;
	box-shadow: 0px 4px 7px 2px black
}
input[type=date]{
	display: block;
	font-size: 1.3em;
	font-weight: bold;
	width: 200px;
}
label{
	font-size: .8em;
	font-weight: bold;
}
</style>