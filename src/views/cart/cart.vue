<template>
    <div class="page-cart container">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Stock Cart</h1>
            </div>

            <div class="column is-12 box">
                <table class="table is-fullwidth" v-if="cartTotalLength">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Reference</th>
                            <th>Qtes en stock</th>
                            <th>Qte commande</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        <CartItem
                            v-for="item in carts.items"
                            v-bind:key="item.id"
                            v-bind:initialItems="item"
                            v-on:removeFromCart="removeFromCart"/> <!-- listen the method -->
                    </tbody>
                </table>

                <p v-else>You don't have any product in your cart...</p>
            </div>

            <div class="container">
                <h2>Summary :
                <strong> {{ cartTotalLength }}</strong> items </h2>
                <center v-if='cartTotalLength !=0'>
                    <router-link to="/cart/checkorder" class="btn btn-success">Proceed to checkout</router-link>
                </center>
            </div>
        </div>
    </div>
</template>

<script>
import CartItem from '@/components/stockItem-cart.vue'

export default {
    name: 'Cart',
    components: {
        CartItem
    },
    data() {
        return {
            carts: {
                items: []
            }
        }
    },
    mounted() {
        this.carts = this.$store.state.carts
    },
    methods: {
        updateCart() { // update vuex
            localStorage.setItem('carts', JSON.stringify(this.$store.state.carts))
        },
        removeFromCart(item) {
            this.carts.items = this.cart.items.filter( i => i.product.id !== item.product.id)
            this.updateCart()
        }
    },
    computed: {
        
        cartTotalLength() {
            return this.carts.items.reduce( (acc, currentValue) => {
                return acc += parseFloat(currentValue.quantity)
            },0)
        },

    }

}
</script>
<style scoped>
    thead{
        margin: 0px;
        justify-content: center;
        background-color: whitesmoke;
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