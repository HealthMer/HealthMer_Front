<template>
    <transition name="modal-background">
        <div v-if="isModalOpen" class="modal background" @click="closeModal"></div>
    </transition>

    <transition name="modal-content">
        <div v-if="isModalOpen" class="modal content" @click="closeModal">
            <div id="close-modal" @click="closeModal">X</div>
            <div id="content" @click.stop @scroll.stop.prevent>
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script setup>
defineProps({
    isModalOpen : Boolean,
});

const emit = defineEmits(['closeModal']);
const closeModal = () => {
    emit('closeModal', false);
}





</script>

<style scoped>
.modal-background-enter-active, .modal-background-leave-active {
    transition: opacity 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.modal-background-enter-from,
.modal-background-leave-to {
    opacity: 0;
}

.modal-content-enter-active, .modal-content-leave-active {
    transform: translateY(0%);
    transition: transform 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.modal-content-enter-from,
.modal-content-leave-to {
    transform: translateY(-100%);
}


.modal{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.modal.content{
    /* transform: translateY(-100%); */
}

.modal.background{
    background-color: rgba(0, 0, 0, 0.65);
}

#content{
    width: 725px;
    height: 765px;
    max-width: calc(100% - 20px);
    background-color: #fff;
    border-radius: 20px;
}
</style>