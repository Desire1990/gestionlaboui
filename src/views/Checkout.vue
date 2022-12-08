<template>
    <div class="container">
        <div class="columns is-multiline">

            <div class="column is-12">
                <h1 class="title">Checkout</h1>
            </div>

            <div class="column is-12">
                <table class="table ">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Reference</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        <tr v-for="item in cart.items" v-bind:key="item.product.id">
                            <td>{{ item.product.materiel }}</td>
                            <td>{{ item.product.reference }}</td>
                            <td>{{ item.quantity }}{{item.product.unite}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr style="background-color: red;">
            <div class="column1 is-8">
                <h2 class="subtitle">Commande details</h2>
                <div class="columns is-multiline">
                    
                    <div class="column is-6">
                    <div class="field">
                      <label for="id_nom">Numero de Commande</label><br>
                      <input type="text" v-model="num_commande"
                        >
                    </div>
<!--                     <div class="field">
                      <label for="id_nom">Nom du Laboratoire</label><br>
                      <input type="text" list="noms" v-model="laboratoire.name"
                        id="id_nom" @change="setId">
                    </div> --><!-- 
                      <datalist id="noms">
                        <option v-for="labo in laboratoires.results" :value="labo.name"/>
                      </datalist> -->
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
            laboratoire:{
                name:'',
            }, 
            num_commande:'',
            user:'',
            cart: {
                items: []
            },
            errors: []
        }
    },
    mounted() {
        document.title = 'Commande | Labo'

        this.cart = this.$store.state.cart

        // if have item show stripe form
        if(this.cartTotalLength > 0) {
 
        }
        if(this.laboratoires.length<1){
          axios.get(this.$store.state.url+'/labo/', this.headers)
          .then((response) => {
            this.$store.state.laboratoires = response.data;
          }).catch((error) => {
          });
        }

    },
    methods: {
        setId(){
          for(let laboratoire of this.$store.state.laboratoires){
            if (laboratoire.id == this.laboratoire.id) {
              this.laboratoire.name = laboratoire.name;
              return;
            }
          }
        },
        setName(){
          for(let laboratoire of this.$store.state.laboratoires){
            if (laboratoire.name == this.laboratoire.name) {
              this.laboratoire.id = laboratoire.id;
              return;
            }
          }
        },
        submitForm() {
            const allItems = []
            let data={}
            for (let i = 0; i < this.cart.items.length; i++ ) {
                const item = this.cart.items[i]
                // commande items
                const obj = {
                    product: item.product.id,
                    quantity: item.quantity,
                }
                allItems.push(obj)
            }
            // commande object
            data = {
                // 'laboratoire': this.laboratoire,
                'num_commande': this.num_commande,
                'items': allItems,
            }
            console.log(data)
            // axios post request
            axios
                .post(this.$store.state.url+'/commande/', data, this.headers)
                .then(response => {
                    this.$store.commit('clearCart')
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
    laboratoires(){
      return this.$store.state.laboratoires
    },
    host(){
      return this.$store.state.url
    },
    username(){
      return this.$store.state.user.username
    },
    headers(){
      return {
        headers: {
          "Authorization": "Bearer " + this.$store.state.user.access
        }
      }
    },
        cartTotalPrice() {
            return this.cart.items.reduce((acc, currentValue) => {
                return acc += currentValue.product.price * currentValue.quantity
            }, 0)
        },
        cartTotalLength() {
            return this.cart.items.reduce((acc, currentValue) => {
                return acc += currentValue.quantity
            }, 0)
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
</style>