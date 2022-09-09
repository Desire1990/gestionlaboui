<template>
<div class="card">
  <div class="card-body">
    <center>
        <h5 class="card-title">{{category.name}}</h5>
        <button class="btn btn-success btn-sm">
            <router-link :to="{ name: 'product', params: {id: category.id} }">
                products
            </router-link></button>
    </center>
  </div>
</div>
</template>

<script>
export default {
  name: 'CategoriesItem',
  props: ['category'],

// export default {
//     props: {
//         item:{type:Object, required:true}
//     },
    data(){
        return {
            // cart : this.$store.state.cart,
            // editable:false
        }
    },
    methods: {
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
    width: 18rem;
    background-color: transparent;
}
</style>