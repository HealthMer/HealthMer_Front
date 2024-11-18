<template>
    <header>
        <Logo />
        <div class="buttons">
            <BtnToggle @click="store.toggleTheme()"/>
            <span class="menu" @click="menuToggle">
                <MenuIconSvg :isMenuOpen="isMenuOpen" />
            </span>
        </div>
    </header>
    
    <transition name="nav-slide">
        <nav v-if="isMenuOpen">
            <div class="left-page"></div>
            <div class="right-page">
                <ul>
                    <li><router-link :to="{name: 'timer-list'}">Timer</router-link></li>
                    <li><router-link :to="{name: 'main'}">Video</router-link></li>
                    <li><router-link :to="{name: 'main'}">Community</router-link></li>
                    <li><router-link :to="{name: 'main'}">MyPage</router-link></li>
                </ul>
                <hr />
                <ul>
                    <li>
                        <btn>
                            <router-link :to="{name: 'signin'}">Sign in</router-link>
                        </btn>
                        <btn>
                            <router-link :to="{name: 'signup'}">Sign up</router-link>
                        </btn>
                    </li>
                </ul>
            </div>
        </nav>
    </transition>

</template>

<script setup>
import { ref } from 'vue';
import { useThemeStore } from '@/stores/theme';
import MenuIconSvg from './icons/MenuIconSvg.vue';
import Btn from './Btn.vue';
import BtnToggle from './BtnToggle.vue';
import Logo from './Logo.vue';
const store = useThemeStore();

const isMenuOpen = ref(false);

const menuToggle = () => {
    isMenuOpen.value = !isMenuOpen.value;
}

</script>

<style scoped>
header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 110px;
    background-color: transparent;
    border-bottom: 1px solid var(--border-color-50);
    display: flex;
    justify-content: space-between;
    align-items: center;
    mix-blend-mode: difference;
    z-index: 2;
    padding-left: 38px;
    padding-right: 23px;
}

.nav-slide-enter-active, .nav-slide-leave-active {
    transition: transform .5s ease, opacity .5s ease;
}

.nav-slide-enter-from {
    transform: translateX(100%);
}
.nav-slide-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}

nav {
    display: flex;
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: var(--background-color2);
    height: 100%;
    z-index: 1;
}

header a {
    color: #fff !important;
}

nav .left-page {
    position: relative;
    width: 425px;
    height: 100%;
    background-color: #313131;
}
nav .right-page {
    position: relative;
    height: 100%;
    width: auto;
    padding: 85px;
    padding-top: calc(111px + 85px);
}

.light nav .left-page{
    background-color: #cecece;
}

nav a:after {
  content: '';
  height: 0;
  position: absolute;
  background-color: var(--point-color);
  height: 0;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: -1;
  transition: height .3s;
}

nav a:hover:after {
  height: 100%;
}

.buttons{
    display: flex;
    align-items: center;
}
.buttons > * {
    margin : 15px;
}
.menu {
    display: block;
    line-height: 0;
    cursor: pointer;
}

@media (max-width: 1000px) {
    nav .left-page{
        display: none;
    }
}
</style>