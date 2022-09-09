<template>
	<div  :class="{popup:true, active:visible}" @click="close">

		<div ref='modal' class="popup-body" @click.stop  >
			<center>
				<h3>Ajouter un Produit</h3>
			</center>
			<form method="post">
				<div class="field">
					<label for="id_nom">Nom:</label>
					<input type="text" v-model="produit.nom" id="id_nom" placeholder="le nom du produit">
				</div>
				<div class="field">
					<label for="id_entrant">Unité d'achat:</label>
					<input type="text" v-model="produit.unite" id="id_entrant" placeholder="exemples: kg,carton,casier...">
				</div>
				<div class="field">
					<label for="id_sortant">Unité de vente:</label>
					<input type="text" v-model="produit.unite_sortant" id="id_sortant"
						:placeholder="unite_sortant">
				</div>
				<div class="field">
					<label for="id_rapport">rapport:</label>
					<input type="number" v-model="produit.rapport" id="id_rapport"
						:placeholder="rapport">
				</div>
				<div class="field">
					<label for="id_prix">Prix de vente:</label>
					<input type="number" name="prix" placeholder="prix de vente" id="id_prix"
						v-model="produit.prix_vente">
				</div>
				<div class="logs">{{logs}}</div>
				<div class="buttons">
					<button @click.prevent="generateCSV">
						<fa icon="download"/> Model
					</button>
					<button @click.prevent="onPickFile">
						<fa icon="upload"/> Charger
					</button>
					<input type="file" style="display: none"
						ref="fileInput" accept=".csv"
						@change="loadCSV">

					<button @click.prevent="createProduct" ref="submit">
						Créer
					</button>
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
		modelaVisible:true
	},
	data(){
		return {
			logs:"", produit:{},
			new_price:"", csv_array:[],
			csvData :{ size:0, fileData:[]}
		}
	},
	watch:{
		csv_array(new_val){
			if(new_val.length == 0){
				this.logs = "";
				this.$refs.submit.innerText = "Créer";
				return;
			}
			this.logs = new_val.length+" produits chargés";
			this.$refs.submit.innerText = "upload";
		}
	},
	computed:{
		rapport(){
			let str = "1 "+this.produit.unite+
				" vaut combien de "+this.produit.unite_sortant+"?"
			return !this.produit.unite_sortant?1+" par defaut":str;
		},
		unite_sortant(){
			return !this.produit.unite?"exemples: kg,carton,casier...":
				this.produit.unite +" par defaut";
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
			this.$emit("close");
		},
		uploadCSV(){
			axios.post(this.$store.state.url+`/produit/`, this.csv_array, this.headers)
			.then((response) => {
				this.$store.state.produits = this.$store.state.produits.concat(response.data);
				this.csv_array = [];
				this.close();
			}).catch((error) => {
				console.error(error);
			})
		},
		createProduct(){
			if(this.csv_array.length>0){
				this.uploadCSV();
				return;
			}
			if(!this.produit.nom){
				this.logs = "le nom est obligatoire"
				return;
			}
			if(!this.produit.unite){
				this.logs = "l'unité d'achat est obligatoire"
				return;
			}
			if(!this.produit.rapport != !this.produit.unite_sortant){
				this.logs = "le rapport et l'unité sortant vont de pair"
				return;
			}
			if(!this.produit.prix_vente){
				this.produit.prix_vente = 0;
				this.logs = ""
			}
			axios.post(this.$store.state.url+`/produit/`, this.produit, this.headers)
			.then((response) => {
				this.produit = {};
				this.$store.state.produits.push(response.data);
			}).catch((error) => {
				console.error(error);
			})
		},
		download (data){
			const blob = new Blob([data], {type: 'text/csv'});
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.setAttribute('hidden', '');
			a.setAttribute('href', url);
			a.setAttribute('download', 'model.csv');
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
        },
      	generateCSV(){
			let data = `"sep=;"\nnom;unite;unite_sortant;rapport;prix_vente\n`
			this.download(data)
		},

		onPickFile () {
		  this.$refs.fileInput.click();
		},
		loadCSV(event){
			if (event.target.files && event.target.files[0]) {
		         let reader = new FileReader();
		         reader.readAsBinaryString(event.target.files[0]);

		         reader.onload = e => {
		            this.csvData.size = e.total;
		            this.csvData.fileData = e.target.result;
		            let xData = this.convertToJSON(this.csvData.fileData);
		            this.csv_array = xData;     
		         };
		     }
		},
		convertToJSON(data_csv){
			let lines=data_csv.trim().split("\n");
			let result = [];
			let headers=lines[0].trim().split(";");
			let line = [];
			let data = {};
			lines = lines.slice(1);

			for(let i=0;i<lines.length;i++){
				line = lines[i].trim().split(";");
				for(let j=0; j<line.length; j++){
					data[headers[j]] = line[j];
				}
				result.push(data);
				data = {};
			}
			return result; 
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
  margin: 0 5;
}
.logs{
  width: 180px;
  color: red;
}
</style>