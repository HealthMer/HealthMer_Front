<template>
    <default-layout>
        <div id="add-timer" @click="openModal">
            <AddTimerSvg />
        </div>
      <Category />
      <CommunityList />
    </default-layout>
  </template>
  
<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import Category from '@/components/Category.vue';
import AddTimerSvg from '@/components/icons/AddTimerSvg.vue';
import CommunityList from '@/components/community/CommunityList.vue';
  
  
</script>

<style scoped>

</style>