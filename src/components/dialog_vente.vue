<template>
  <div :class="{popup:true, active:visible}" @click="close">
    <div class="popup-body" @click.prevent.stop>
      <center><h2>Ventes</h2></center>
      <div v-if="ventes.length==0">{{action}}</div>
      <div class="scrollable-tab" v-else>
        <table class="table commandes">
          <thead>
            <tr class="panier-item">
              <th>id</th>
              <th>produit</th>
              <th>quantite</th>
            </tr>
          </thead>
          <tbody id="commandes">
              <tr v-for="vente in ventes">
                <td style="color:#aaa;">{{vente.id}}</td>
                <td>{{vente.produit}}</td>
                <td>x {{vente.quantite}}</td>
                <td>x {{vente.produit.unite}}</td>
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
      ventes:[],
      action:"récuperation des ventes..."
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
        axios.get(this.$store.state.url+'/commandeitem/?commande='+this.commande.id, headers)
        .then((response) => {
          this.ventes = response.data;
          this.action = "pas de details."
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
</style>