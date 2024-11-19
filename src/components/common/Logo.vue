<template>
    <div class="logo">
        <router-link :to="{name: 'main'}">
            <LogoBasicSvg />
        </router-link>
    </div>
</template>

<script setup>
import LogoBasicSvg from './LogoBasicSvg.vue';


</script>

<style scoped>
.logo svg {
    vertical-align: top;
}
.logo.large svg{
    width: 226px;
    height: auto;
}

.logo svg *:not(:first-child){
    fill: var(--icon-color);
}

.logo.in-header svg *:not(:first-child){
    fill: #fff;
}

.light .logo.in-header svg{
    filter: hue-rotate(180deg);
}
</style>