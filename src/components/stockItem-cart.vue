<template>
    <tr><th>{{item.product.id}}</th>
        <th>{{item.product.product.materiel}}</th>
        <th>{{item.product.product.reference}}</th>
        <th>{{item.product.qte_livree }} {{item.product.product.unite }}</th>
        <!-- <th>{{item.product.qte_restante }} {{item.product.unite }}</th> -->
         <td>  
            <th>
            <a class="btn btn-success btn-sm" @click="decrementQuantity(item)">-</a> &nbsp;
            <a class="btn btn-success btn-sm" @click="incrementQuantity(item)">+</a> &nbsp;
            </th>
            <th>{{ item.quantity }} {{item.product.product.unite }}</th>
                
        </td>
        <td><button  class=" btn btn-danger btn-sm delete" @click="removeFromCart(item)">x</button></td>

    </tr>    
</template>

<script>
import axios from 'axios'
export default {
    name: 'StockItem',
    props: {
        initialItems: Object // received
    },
    data() {
        return {    
            item: this.initialItems
        }
    },
    methods: {
        getItemTotal(item) {
            return item.quantity * item.product.price
        },
        decrementQuantity(item) {
            item.quantity -= 1
            if(item.quantity === 0) {
                this.$emit('removeFromCart', item)
            }
            this.updateCart()
        },
        incrementQuantity(item) {
            item.quantity += 1

            this.updateCart()
        },
        updateCart() { // update vuex
            localStorage.setItem('carts', JSON.stringify(this.$store.state.carts))
        },
        removeFromCart(item) {
            this.updateCart()
            this.$emit('removeFromCart', item) // call parent function
        },
    }
}
</script>
<style scoped>
    .btn-success{
        color: #fff;
        background-color: #007bff;
        border-color: #007bff;
    }
</style>