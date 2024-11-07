<script setup lang="ts">
    const width = ref(0);
    onMounted(() => {
        const {innerHeight, innerWidth} = window;
        console.log(innerHeight, innerWidth)
        const heightRatioToPixels = Math.round(innerHeight * (1 - 0.97));
        width.value = innerWidth - heightRatioToPixels;
    }),

    useHead({
        bodyAttrs: {
            class: 'relative h-screen w-screen bg-slate-700 p-10',
        },
    });
</script>

<template>
    <div
        class="absolute m-5 inset-0 rounded-xl overflow-hidden" 
    >
        <!-- :class="`w-[${width}px]`" -->
        <div class=" absolute w-full h-full bg-slate-200 overflow-scroll no-scrollbar">
            <div class="p-5">
                <slot />
            </div>
        </div>
    </div>
</template>
<style>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
</style>