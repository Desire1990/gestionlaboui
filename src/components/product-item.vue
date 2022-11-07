<template>
<div class="card">
<div class="header">
    <h5 class="card-title">{{product.materiel}}</h5>        
</div>
  <div class="card-body">
    <center>
        <h6 class="card-subtitle">{{product.reference}}</h6><hr>
        <h6 class="card-text">{{product.designation}}</h6>
        <p class="card-text"> Qte:{{product.quantite}} {{product.unite}}</p><hr>
        <p class="text-center"><input v-model="quantity" type="float" class="form-control" placeholder="Qty" min="1"/></p>
        <button class="btn btn-success btn-sm" @click="addToCart(product)">Add To Cart </button>
    </center>
  </div>
</div>
</template>

<script>
export default {
  name: 'ProductsItem',
  props: ['product'],

// export default {
//     props: {
//         item:{type:Object, required:true}
//     },
    data(){
        return {
            quantity:1
        }
    },
    methods: {
        addToCart() {
            if(isNaN(this.quantity) || this.quantity < 1) {
                this.quantity = 1 
            }

            const item = {
                product: this.product,
                quantity: this.quantity
            }
            this.$store.commit('addToCart', item)

        },
        getIcon(item){
            if (item.image == null) {
                return "/img/item.png";
            }
            return item.image;
        },
        increaseQtt : function(){
            this.cart.add(this.item);
        },
        decreaseQtt : function(){
            this.cart.decrease(this.item.id);
        },
        enableEdition(){
            if(this.item.quantite!=0) this.editable=true
        }
    },
    computed:{
        qtt:{
            get(){
                return this.cart.getQuantite(this.item.id);
            },
            set(value){
                if(value.length==0) return;
                this.cart.add(this.item, value);
            }
        }
    }
};
</script>

<style scoped>
.card{
    display: inline-grid;
    margin: 4px;
    padding: 2px;
    width: 15rem;
    background-color: transparent;
}
.header{
    text-align: center;
}
</style>