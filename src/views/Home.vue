<template>
	<domain/>
</template>
<script>
	import domain from "../components/domains.vue"
	export default{
		components:{domain},
    mounted() {
        document.title = 'Dashboard | Gestion Labo'
    },
  }
</script>