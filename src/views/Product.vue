<template>
  <domain/>
</template>
<script>
  import domain from "../components/product-list.vue"
  export default{
    components:{domain},
    mounted() {
        document.title = 'All products | Gestion Labo'
    },
  }
</script>
<style>
  <style>
.parent{
  display: flex;
  height: 100%;
  flex-direction: column;
}
.title{
  text-align: center;
  margin: 10px;
}
.cart_body{
  flex-grow: 1;
}
.btn_panier{
  position: absolute;
  right: 0;
  background: #079;
  padding: 3px 10px;
  font-weight: bold;
  font-size: 18px;
  color: #ddd;
  box-shadow: 0px 0px 5px 2px #777;
}
.btn_panier:hover{
  color: white;
  cursor: default;
}
.close_panier{
  position: absolute;
  left: 5px;
  top: 5px;
  background: #944;
  padding: 0 7px 3px 7px;
  font-weight: bold;
  color: #ddd;
  font-family: monospace;
  font-size: 20px;
  box-shadow: 0px 0px 5px 2px #777;
  cursor: default;
}
.close_panier:hover{
  color: white;
}
.page{
  display: flex;
  flex-direction: row;
  height: 90%;
}
.items{
  position: relative;
  flex-grow: 1;
  height: 100%;
  overflow-y: auto;
  padding: 10px;
}
.recycler{
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 10px;
  grid-row-gap: 10px;
}
.cart{
  min-width: 350px;
  font-size: .8em;
  max-height: 100%;
  position: relative;
  box-shadow: 0px 0px 5px 2px #777;
  display: flex;
  flex-direction: column;
}
.totals{
  display: flex;
  justify-content: space-between;
  margin:0 10px 0 15px
}
.panier_items{
  overflow-y: auto;
  flex-grow: 1;
  margin: 10px;
  align-items: baseline;
  border-bottom: 1px solid black;
}
.cart_buttons{
  display: flex;
  justify-content: flex-end;
}
@media screen and (max-width: 1200px){
  .recycler{
    grid-template-columns: repeat(4, 1fr);
  }
}
@media screen and (max-width: 900px){
  .recycler{
    grid-template-columns: repeat(3, 1fr);
  }
}
@media screen and (max-width: 600px){
  .recycler{
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
</style>