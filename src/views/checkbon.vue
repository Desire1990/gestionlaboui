<template>
    <div class="container">
        <div class="columns is-multiline">

            <div class="column is-12">
                <h1 class="title">Checkout bon</h1>
            </div>

            <div class="column is-12">
                <table class="table ">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Reference</th>
                            <th>Quantite Livree</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        <tr v-for="item in cartbon.items" :key="item.product.id">
                            <td>{{ item.product.materiel }}</td>
                            <td>{{ item.product.reference }}</td>
                            <td>{{ item.quantity }} {{item.product.unite}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr style="background-color: red;">
            <div class="column1 is-8">
                <h2 class="subtitle">Bon details</h2>
                <div class="columns is-multiline">
                    
                   <div class="column is-6">
                    <div class="field">
                      <label for="id_nom">Numero</label><br>
                      <input type="text" v-model="num_bon"
                        >
                    </div>
                   </div>
                </div>

                <div class="notification is-danger mt-4" v-if="errors.length">
                    <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                </div>
                <template v-if="cartTotalLength"><br>
                        
                    <button class="btn btn-primary" @click="submitForm">Submit</button>
                </template>

                <hr>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'

export default {
    name: 'Checkout',
    data() {
        return {
            commande:{
                num_commande:''
            },
            num_bon:'',
            cartbon: {
                items: []
            },
            errors: []
        }
    },
    mounted() {
        document.title = 'Bon Commande | Labo'
        this.cartbon = this.$store.state.cartbon;
    },
    methods: {
        setId(){
          for(let commande of this.$store.state.commandes){
            if (commande.id == this.commande.id) {
              this.commande.num_commande = commande.num_commande;
              return;
            }
          }
        },
        setName(){
          for(let commande of this.$store.state.commandes){
            if (commande.num_commande == this.commande.num_commande) {
              this.commande.id = commande.id;
              return;
            }
          }
        },
        submitForm() {
            const allItems = []
            let data={}
            for (let i = 0; i < this.cartbon.items.length; i++ ) {
                const item = this.cartbon.items[i]
                // commande items
                const obj = {
                    product: item.product.id,
                    quantity: item.quantity,
                }
                allItems.push(obj)
            }
            // commande object
            data = {
                commande:this.$store.state.selected_commande.id,
                'num_bon': this.num_bon,
                'utilisateur': this.$store.state.selected_commande.utilisateur.id,
                'items': allItems,
            }
            console.log(data)
            // axios post request
            axios
                .post(this.$store.state.url+'/bonLivraison/', data, this.header)
                .then(response => {
                    this.$store.commit('clear')
                    this.$router.push('/cart/success')
                })
                .catch(error => {
                    this.errors.push('Something went wrong. Please try again')
                    console.log(error)
                })

                this.$store.commit('setIsLoading', false)

        },
        
    },
    computed: {
        host(){
          return this.$store.state.url
        },
        commandes(){
          return this.$store.state.commandes
        },
        username(){
          return this.$store.state.user.username
        },
        cartTotalPrice() {
            return this.cartbon.items.reduce((acc, currentValue) => {
                return acc += currentValue.product.price * currentValue.quantity
            }, 0)
        },
        cartTotalLength() {
            return this.cartbon.items.reduce((acc, currentValue) => {
                return acc += currentValue.quantity
                }, 
            0)
        }
    }
}
</script>
<style scoped>
    h1{
        margin: 0px;
        text-align: center;
    }
    label{
        font-size: 20px;
        font-weight: bold;
        font-family: sans-serif;
    }
    .subtitle{
        text-decoration-line: underline;
        text-transform: uppercase;
        text-align: 400px;
        text-orientation: upright;
        text-anchor: middle;
    }
    .column1{
        text-decoration-line: underline;
        /*text-transform: ;*/
        padding-left: 300px;
        text-orientation: upright;
        text-anchor: middle;
    }
    thead{
        margin: 0px;
        justify-content: center;
        background-color: teal;
        color: #fff;
    }
    h1{
        text-align: center;
    }
    .btn-success {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
}
</style>