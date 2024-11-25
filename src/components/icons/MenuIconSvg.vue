<template>
    <svg :class="animationClass" width="41" height="30.93" viewBox="0 0 41 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="41" height="2.74315" fill="white"/>
        <rect y="9.60107" width="41" height="2.74315" fill="white"/>
        <rect y="19.2021" width="41" height="2.74315" fill="white"/>
    </svg>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
    isMenuOpen : Boolean,
});

const animationClass = ref('');
watch(() => props.isMenuOpen, (newValue, oldValue) => {
    if (newValue) {
        animationClass.value = 'cancel';
    } else {
        animationClass.value = 'back';
    }
});

</script>

<style scoped>
svg rect {
    transform-origin: center;
}



svg.back rect:nth-child(1){
    animation: editToBackTop .5s forwards cubic-bezier(.5,0,.5,1);
    -moz-animation: editToBackTop .5s forwards cubic-bezier(.5,0,.5,1); /* Firefox */
    -webkit-animation: editToBackTop .5s forwards cubic-bezier(.5,0,.5,1); /* Safari and  Chrome */
    -o-animation: editToBackTop .5s forwards cubic-bezier(.5,0,.5,1); /* Opera */
}
svg.back rect:nth-child(2){
    animation: editToBackMiddle .5s forwards cubic-bezier(.5,0,.5,1);
    -moz-animation: editToBackMiddle .5s forwards cubic-bezier(.5,0,.5,1); /* Firefox */
    -webkit-animation: editToBackMiddle .5s forwards cubic-bezier(.5,0,.5,1); /* Safari and  Chrome */
    -o-animation: editToBackMiddle .5s forwards cubic-bezier(.5,0,.5,1); /* Opera */
}
svg.back rect:nth-child(3){
    animation: editToBackBottom .5s forwards cubic-bezier(.5,0,.5,1);
    -moz-animation: editToBackBottom .5s forwards cubic-bezier(.5,0,.5,1); /* Firefox */
    -webkit-animation: editToBackBottom .5s forwards cubic-bezier(.5,0,.5,1); /* Safari and  Chrome */
    -o-animation: editToBackBottom .5s forwards cubic-bezier(.5,0,.5,1); /* Opera */
}

svg.cancel rect:nth-child(1){
    animation: editToCancelTop .5s forwards cubic-bezier(.5,0,.5,1);
    -moz-animation: editToCancelTop .5s forwards cubic-bezier(.5,0,.5,1); /* Firefox */
    -webkit-animation: editToCancelTop .5s forwards cubic-bezier(.5,0,.5,1); /* Safari and  Chrome */
    -o-animation: editToCancelTop .5s forwards cubic-bezier(.5,0,.5,1); /* Opera */
}
svg.cancel rect:nth-child(2){
    animation: editToCancelMiddle .5s forwards cubic-bezier(.5,0,.5,1);
    -moz-animation: editToCancelMiddle .5s forwards cubic-bezier(.5,0,.5,1); /* Firefox */
    -webkit-animation: editToCancelMiddle .5s forwards cubic-bezier(.5,0,.5,1); /* Safari and  Chrome */
    -o-animation: editToCancelMiddle .5s forwards cubic-bezier(.5,0,.5,1); /* Opera */
}
svg.cancel rect:nth-child(3){
    animation: editToCancelBottom .5s forwards cubic-bezier(.5,0,.5,1);
    -moz-animation: editToCancelBottom .5s forwards cubic-bezier(.5,0,.5,1); /* Firefox */
    -webkit-animation: editToCancelBottom .5s forwards cubic-bezier(.5,0,.5,1); /* Safari and  Chrome */
    -o-animation: editToCancelBottom .5s forwards cubic-bezier(.5,0,.5,1); /* Opera */
}


@keyframes editToCancelTop{
    0%{
        transform: translate(0px, 0px) rotate(0deg);
    }
    50%{
        transform: translate(0px, 10px) rotate(0deg);
    }
    100%{
        transform: translate(6px, 7px) rotate(-45deg);
    }
}

@keyframes editToCancelMiddle{
    0%{
        display: block;
    }
    50%{
        display: none;
    }
    100%{
        display: none;
    }
}

@keyframes editToCancelBottom{
    0%{
        transform: translate(0px, 0px) rotate(0deg)
    }
    50%{
        transform: translate(0px, -10px) rotate(0deg);
    }
    100%{
        transform: translate(6px, -6px) rotate(45deg);
    }
}

@keyframes editToBackTop {
    0% {
        transform: translate(6px, 7px) rotate(-45deg);
    }
    50% {
        transform: translate(0px, 10px) rotate(0deg);
    }
    100% {
        transform: translate(0px, 0px) rotate(0deg);
    }
}

@keyframes editToBackMiddle {
    0% {
        display: none;
    }
    50% {
        display: none;
    }
    100% {
        display: block;
    }
}

@keyframes editToBackBottom {
    0% {
        transform: translate(6px, -6px) rotate(45deg);
    }
    50% {
        transform: translate(0px, -10px) rotate(0deg);
    }
    100% {
        transform: translate(0px, 0px) rotate(0deg);
    }
}
</style>