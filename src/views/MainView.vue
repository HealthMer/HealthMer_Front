<template>
  <default-layout>
    <div class="background">
      <div class="video-container">
        <video autoplay loop muted>
          <source src="../assets/7033786-uhd_3840_2160_25fps.mp4" type="video/mp4">
        </video>
      </div>

      <div class="title">
        <span class="letter">H</span>
        <span class="letter">E</span>
        <span class="letter">A</span>
        <span class="letter">L</span>
        <span class="letter">T</span>
        <span class="letter">H</span>
        <span class="letter">M</span>
        <span class="letter">E</span>
        <span class="letter">R</span>
      </div>
    </div>
  </default-layout>
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue';


</script>

<style scoped>
.background {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  margin-bottom: 30px;
}
.background .video-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.background .video-container video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.light .background {
  filter: brightness(1.5);
}
.background .title{
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 2rem;
  font-size: 8vw;
}

.letter:first-child,
.letter:nth-child(6) {
  color: var(--point-color2);
}
</style>