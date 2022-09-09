<template>
  <domain/>
</template>
<script>
  import domain from "../components/category-list.vue"
  export default{
    components:{domain},
    mounted() {
        document.title = 'Dashboard | Gestion Labo'
    },
  }
</script>