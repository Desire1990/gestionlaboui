<template>
  <div class="parent">
  	 <div class="form-inline my-2 my-lg-0 top" style="padding-top:20px;">
        <input class="form-control mr-sm-2" type="text" placeholder="Search" v-model="search_term" aria-label="Search">

      </div>
      <br>
		<div class="scrollable-tab">
        <table class="table paiements">
          <thead>
            <tr class="panier-item">
              <th>#</th>
              <th>User</th>
              <th>Numero de Order</th>
              <th>Date ordered</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="paiements">
            <tr v-for="(item, index) in items" :key='item.id'>
              <td>{{ index+1 }}</td>
              <td>{{ item.utilisateur.user.first_name }} {{ item.utilisateur.user.last_name}}</td>
              <td>{{ item.num_order }}</td>
              <td>{{ datetime(item.created_at) }}</td>
              <td>{{item.status}}</td>
              <td>
                <div class="btns" >
                  <button @click.prevent="startEdit(item)">Approuver</button>
                  <button @click.prevent="showDetails(item)">Detail</button>
                </div>
              </td>
            </tr>
        </tbody>
      </table>
	</div>
  	<DetailsDialog :visible='details_opened' :commande='active_commande' @close="details_opened=false"/>
  </div>
</template>
<script>
import axios from "axios"
import DetailsDialog from "../components/detail_order.vue";

export default{
	components:{DetailsDialog},
	data(){
		return {
			csvData : {},
			items:this.$store.state.commandes,
			active_item:{},
			details_opened:false,
      active_commande :{},
			edit_mode:false, achat_mode:false, add_mode:false, search_term:''
		}
	},
	watch:{
		"$store.state.commandes"(new_val){
			this.items = new_val;
      },
      search_term(value){
            this.dosearch(value)
        }
    },
  methods: {
    dosearch(value){
        axios.get(this.$store.state.url+`/order/?search=${this.search_term}`, this.header)
        .then((response) => {
          this.$store.state.commandes=response.data
        }).catch((error) => {
          console.error(error);
        });
    },
		fetchCommandes(){
			axios.get(this.$store.state.url+'/order/', this.header)
			.then((response) => {
				this.$store.state.commandes = response.data;
				this.items=response.data.results
				console.log(response.data)
			}).catch((error) => {
				if(error.response.data.code == "token_not_valid"){
					let data = {
						refresh: this.$store.state.user.refresh
					};
					axios.post(this.$store.state.url+'/refresh/', data)
					.then((response) => {
						this.$store.state.user.access = response.data.access;
						this.fetchCommandes();
					}).catch((error) =>{
						this.$store.state.user = null;
					})
				}
			});
		},
		exitEdition(){
			this.active_item = {};
			this.edit_mode = false;
			this.achat_mode = false;
			this.add_mode = false;
		},
		startEdit(item){
			this.active_item = item;
			this.edit_mode = true;
		},
		showDetails(commande){
      this.active_commande = commande;
      this.details_opened=true;
    },
		performFilter(value){
			let data = this.$store.state.products.filter( x => {
				return x.id == value |
					x.nom.toLowerCase().includes(value.toLowerCase())
			});
			this.items = data;
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

			let data = this.items;
			let headers = `id;produit;quantite;prix_achat;details\n`;
			for (var i = 0;i< data.length ; i++) {
				headers += data[i].id+';'+data[i].nom+'\n';
			}
			console.log(headers);
			this.download(headers);

		},
		level(quantite){
			if(quantite==0) return "empty";
			if(quantite<=5) return "low";
		},
		uploadCSV(event){
			if (event.target.files && event.target.files[0]) {
		         let reader = new FileReader();
		         reader.readAsBinaryString(event.target.files[0]);
		         reader.onload = e => {
		            console.log(e);
		            this.csvData.size = e.total;
		            this.csvData.fileData = e.target.result;
		            let xData = this.convertToJSON(this.csvData.fileData);
		            console.log(xData);
		            console.table(xData);
		         };
		     }
		},
		convertToJSON(data_csv){
			let lines=data_csv.trim().split("\n");
			let result = [];
			let headers=lines[0].split(";");
			let line = [];
			let data = {};
			lines = lines.slice(1);
			for(let i=0;i<lines.length;i++){
				line = lines[i].split(";");
				for(let j=0; j<line.length; j++){
					if((line.indexOf(line[j]) !==0) && (!(isNaN(line[j])))){
						let x = Number.parseFloat(line[j]);
						data[headers[j]] = x.toFixed(2);
					}
					else{
						data[headers[j]] = line[j];
					}
				}
				result.push(data);
				data = {};
			}

			return result; 
		},
	},
		mounted(){
			document.title=('Commande |Labo')
			this.fetchCommandes()
		}
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
</style>
