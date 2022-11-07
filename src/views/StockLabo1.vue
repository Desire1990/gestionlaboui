<template>
  <domain/>
</template>
<script>
  import domain from "../components/stockList.vue"
  export default{
    components:{domain},
    mounted() {
        document.title = 'All products | Gestion Labo'
    },
  }
</script>