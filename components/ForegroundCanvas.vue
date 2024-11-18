<script setup lang="ts">
const canvasFront = ref(null);

onMounted(() => {
    RenderManager.foregroundCanvas = canvasFront.value;
});

onUnmounted(() => {
    RenderManager.foregroundCanvas = null;
});

</script>

<template>
    <div class="fixed w-full h-full top-0 left-0 pointer-events-none">
        <canvas ref="canvasFront"></canvas>
    </div>
</template>