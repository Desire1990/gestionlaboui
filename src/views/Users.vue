<template>
  <div class="parent" @click="popover_opened=false">
    <div class="top">
      <SearchBar :show_date="false" @searched="searchItem"/>
    </div>
    <div class="recycler">
    </div>
    <div class="scrollable-tab">
      <table class="table users">
        <thead>
          <tr class="panier-item">
            <th>#</th>
            <th>username</th>
            <th>prenom</th>
            <th>nom</th>
            <th>actif</th>
            <th>groupes</th>
            <th>options</th>
          </tr>
        </thead>
        <tbody id="users">
          <tr v-for="(user, counter) in users.results">
            <td>{{counter+1}}</td>
            <td>{{user.username}}</td>
            <td>{{user.first_name}}</td>
            <td>{{user.last_name}}</td>
            <td>{{user.is_active}}</td>
            <td class="groups">
              <span v-for="g in user.groups">
                {{g}}<span class="comma">,</span>
              </span>
            </td>
            <td>
              <div class="btns">
                <button @click="editUser(user)" v-if="permited(user)">
                  editer
                </button>
                <span v-if="$store.state.user.groups.includes('admin')">
                  <button v-if="user.is_active" @click="deactivateUser(user)">desactiver</button>
                  <button v-else @click="activateUser(user)">activer</button>
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <EditUser :visible="edit_mode" :item="active_user" @close="exitEdition"/>
  </div>
</template>
<script>
import axios from "axios";
import SearchBar from "../components/searchbar";
import EditUser from "../components/dialog_edit_user";

export default {
  components:{
    SearchBar, EditUser
  },
  data(){
    return{
      query_date : false, edit_mode:false,
      users : this.$store.state.users,
      details_opened:false, active_user:{groups:[]},
    }
  },
  computed:{
  },
  methods:{
    editable(user){
      return this.$store.state.user.is_admin && user.id!=this.$store.state.user.id
    },
    permited(user){
      return this.$store.state.user.is_admin || this.$store.state.user.id == user.id;
    },
    searchItem(value){
      let returnedValues = {};
      if (value=='') return this.fetchData();
      !this.query_date && value!= ''? 
        returnedValues = this.$store.state.users.filter(item => {
          return item.id == value | item.client.toLowerCase().includes(value.toLowerCase())
        }) :
        returnedValues = this.users.filter(item => {
          return item.id == value | item.client.toLowerCase().includes(value.toLowerCase())
        })
      this.users = returnedValues;
    },
    fetchData(){
      let headers = {
          headers: {
            "Authorization": "Bearer " + this.$store.state.user.access
          }
        }
      if(this.$store.state.users.length==0){
        axios.get(this.$store.state.url+'/user/', headers)
        .then((response) => {
          this.$store.state.users = response.data;
          this.users = response.data;
          console.log(response.data)
        }).catch((error) => {
          if(error.response){
          }else{
            console.error(error)
          }
        });
      }
    },
    headers(){
      return {
        headers: {
        "Authorization": "Bearer " + this.$store.state.user.access
        }
      };
    },
    deactivateUser(user){
      if (confirm("voulez-vous vraiment arreter cette utilisateur?")) {
        axios.put(this.$store.state.url+`/user/${user.id}/`, {"is_active":false}, this.headers())
        .then((response) => {
          Object.assign(user, response.data);
        }).catch((error) => {
          console.error(error);
        })
      }
    },
    activateUser(user){
      if (confirm("voulez-vous mettre cette utilisateur en action?")) {
        axios.put(this.$store.state.url+`/user/${user.id}/`, {"is_active":true}, this.headers())
        .then((response) => {
          Object.assign(user, response.data);
        }).catch((error) => {
          console.error(error);
        })
      }
    },
    exitEdition(x){
      this.edit_mode = false;
    },
    editUser(user){
      this.edit_mode = true;
      this.active_user = user
    }
  },
  mounted(){
    this.searchItem();
    this.fetchData()
  }
};
</script>
<style scoped>
.top{
  display: flex;
  justify-content: center;
}
.groups .comma:last-child {
    display: none;
}
.scrollable-tab{
  width: 100%;
  /*height: 0px;*/
  overflow: auto;
  padding: 0 20px;
  position: relative;
}
.uncommited{
  color: red;
}
.scrollable-tab table thead tr th{
  position: sticky;
  top: 0;
}
.scrollable-tab table tfoot tr th{
  position: sticky;
  bottom: 0;
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
