<template>
    <router-link :to="{name: 'timer-detail', params: {id: item.id}}">
        <ul class="list-item">
            <li>{{ item.id }}</li>
            <li>{{ item.title }}</li>
            <li>{{ item.viewsCount }}</li>
            <li>{{ item.completeCount }}</li>
            <li>{{ item.level }}</li>
            <li>{{ item.created_at }}</li>
        </ul>
    </router-link>
</template>

<script setup>
defineProps({
    item : Object,
});
</script>

<style scoped>

.list-item {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    background-color: yellow;
    border-radius: 30px;
    margin: .8rem;
}
</style>