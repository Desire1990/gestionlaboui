<template>
    <tr><th>{{item.product.id}}</th>
        <td><router-link :to="item.product.get_absolute_url">{{ item.product.materiel}}</router-link></td>
        <th>{{item.product.reference}}</th>
        <th>{{item.product.quantite }} {{item.product.unite }}</th>
         <td>  
            <a class="btn btn-success btn-sm" @click="decrementQuantity(item)">-</a> &nbsp;
            <a class="btn btn-success btn-sm" @click="incrementQuantity(item)">+</a> &nbsp;
            {{ item.quantity }}{{item.product.unite }}
        </td>
        <td><button  class=" btn btn-danger btn-sm delete" @click="removeFromCart(item)">x</button></td>

    </tr>    
</template>

<script>
export default {
    name: 'CartItem',
    props: {
        initialItem: Object // received
    },
    data() {
        return {    
            item: this.initialItem
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
            localStorage.setItem('cartbon', JSON.stringify(this.$store.state.cartbon))
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