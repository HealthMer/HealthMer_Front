<template>
    <svg id="timer" width="176" height="184" viewBox="0 0 176 184" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M114.212 0H60.7874V9.00122C64.4131 9.10295 67.3446 15.5373 67.3993 23.5051C60.0071 25.3832 53.0181 28.2716 46.5879 32.0147C46.186 31.6844 45.7458 31.3393 45.2669 30.9767C35.2318 23.3786 17.5303 26.5082 6.85683 40.6051C-3.65779 54.4921 -0.38837 71.778 9.30493 79.5533C7.17336 86.8317 6.03002 94.5323 6.03002 102.5C6.03002 147.511 42.5188 184 87.53 184C132.541 184 169.03 147.511 169.03 102.5C169.03 94.6983 167.934 87.1527 165.887 80.0088L166.032 79.8991C176.067 72.3011 179.597 54.7019 168.924 40.6051C158.251 26.5082 140.549 23.3786 130.514 30.9767C129.914 31.4311 129.375 31.8578 128.895 32.2627C122.332 28.3888 115.178 25.4088 107.601 23.49C107.659 15.5295 110.589 9.10355 114.212 9.00124V0ZM87.53 173C126.466 173 158.03 141.436 158.03 102.5C158.03 63.5639 126.466 31.9999 87.53 31.9999C48.594 31.9999 17.03 63.5639 17.03 102.5C17.03 141.436 48.594 173 87.53 173Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M88.03 164C121.719 164 149.03 136.689 149.03 103C149.03 69.3106 121.719 42 88.03 42C54.3407 42 27.03 69.3106 27.03 103C27.03 136.689 54.3407 164 88.03 164ZM88.03 156C117.301 156 141.03 132.271 141.03 103C141.03 73.7289 117.301 50 88.03 50C58.7589 50 35.03 73.7289 35.03 103C35.03 132.271 58.7589 156 88.03 156Z" fill="white"/>
        <rect x="54" y="97" width="68" height="11" fill="white"/>
        <rect x="83" y="68" width="11" height="68" fill="white"/>
        <path class="hand" d="M136.937 65.3676L101.095 102.17L89.2126 102.822L92.6701 91.4348L136.937 65.3676Z" fill="#FE0013"/>
    </svg>
</template>

<script setup>

</script>

<style scoped>
svg{
    cursor: pointer;
}

#timer{
    transition: all .3s;
}

.light #timer > *:not(.hand){
    fill: var(--icon-color);
}

#timer:hover{
    filter: drop-shadow(0px 0px 6px #FE0013);
    color: #FE0013;
}

#add-timer:hover #timer > *{
    fill: #FE0013;
}

#add-timer:hover #timer > .hand{
    fill: #fff;
    animation: rotate .8s ease forwards;
}

#add-timer:not(:hover) #timer > .hand {
    animation: rotate-reverse .8s ease forwards;
}

/* 애니메이션 */

@keyframes rotate{
    0%{
        transform: rotate(0deg);
        transform-origin: 88px 102px;
    }
    100%{
        transform: rotate(180deg);
        transform-origin: 88px 102px;
    }
}
@keyframes rotate-reverse{
    0%{
        transform: rotate(180deg);
        transform-origin: 88px 102px;
    }
    100%{
        transform: rotate(0deg);
        transform-origin: 88px 102px;
    }
}
</style>