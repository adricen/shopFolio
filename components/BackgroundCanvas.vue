<script setup lang="ts">
const canvasBg = ref(null);

onMounted(() => {
    const { value: canvas } = canvasBg;
    RenderManager.backgroundCanvas = canvas;
});

onUnmounted(() => {
    RenderManager.backgroundCanvas = null;
});

</script>

<template>
    <div class="absolute z-[-1] w-full h-full top-0 left-0 pointer-events-none">
        <canvas ref="canvasBg"></canvas>
    </div>
</template>