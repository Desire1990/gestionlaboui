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
                        <tr v-for="item in carts.items" v-bind:key="item.product.id">
                            <td>{{ item.product.produit.materiel }}</td>
                            <td>{{ item.product.produit.reference }}</td>
                            <td>{{ item.quantity }} {{item.product.unite}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr style="background-color: red;">
            <div class="column1 is-8">
                <h2 class="subtitle">Order details</h2>
                <div class="columns is-multiline">
                    
                    <div class="column is-6">
                    <div class="field">
                      <label for="id_nom">Numero</label><br>
                      <input type="text" v-model="num_order"
                        >
                    </div>
                    <div class="field">
                      <label for="id_nom">Description</label><br>
                      <input type="text" v-model="description"
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
            num_order:'',
            description:'',
            user:'',
            carts: {
                items: []
            },
            errors: []
        }
    },
    mounted() {
        document.title = 'Commande | Labo'

        this.carts = this.$store.state.carts
    },
    methods: {
        submitForm() {
            const allItems = []
            let data={}
            for (let i = 0; i < this.carts.items.length; i++ ) {
                const item = this.carts.items[i]
                // commande items
                const obj = {
                    product: item.product.id,
                    quantity: item.quantity,
                }
                allItems.push(obj)
            }
            // commande object
            data = {
                'num_order': this.num_order,
                'description':this.description,
                'items': allItems,
            }
            console.log(data)
            // axios post request
            axios
                .post(this.$store.state.url+'/order/', data, this.header)
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
    username(){
      return this.$store.state.user.username
    },
    cartTotalPrice() {
        return this.carts.items.reduce((acc, currentValue) => {
            return acc += currentValue.product.price * currentValue.quantity
        }, 0)
    },
    cartTotalLength() {
        return this.carts.items.reduce((acc, currentValue) => {
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