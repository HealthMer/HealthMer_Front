<template>
    <div id="body">
        <Header />
        <main>
            <slot></slot>
        </main>
        <Footer />
    </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';



</script>

<style scoped>
main{
  margin-top: 111px;
  padding: 100px;
}
</style>