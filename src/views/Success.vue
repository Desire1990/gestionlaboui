<template>
    <div class="page-success">
        <div class="columns is-multiline">
            <div class="column is-12 content">
                <h1 class="title">Thank You</h1>
                <p>Your order will be processed!!<br>Welcome back ...</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Success',
    mounted() {
        document.title = 'Success | Ecommerce Store'
    }
}
</script>
<style scoped>
    .content{
        text-align: center;
        padding: 50px;
    }
</style>