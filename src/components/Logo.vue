<template>
    <div class="logo">
        <router-link :to="{name: 'main'}">
            <img src="@/assets/logo-basic.svg" alt="">
        </router-link>
    </div>
</template>

<script setup>

</script>

<style scoped>
.logo img {
    vertical-align: top;
}
.logo.large img{
    width: 226px;
}
</style>