<script setup>
    const mainCanvas = ref(null);
    let x = 0;
    let y = 0;
    const squareSize = 100;
    const way = [true, true];
    const speed = 2;
    onMounted(() => {
        const { value: canvas } = mainCanvas;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        console.log('main canvas: ', [canvas]);
        renderLoop(canvas)
    });
    function renderLoop(canvas) {
        if (x > canvas.width - squareSize) {
            way[0] = false;
        }
        if (x - speed < 0) {
            way[0] = true;
        }
        if (y + speed > canvas.height - squareSize) {
            way[1] = false;
        }
        if (y - speed < 0) {
            way[1] = true;
        }
        if (way[0]) {
            x += speed;
        } else {
            x -= speed;
        }
        if (way[1]) {
            y += speed;
        } else {
            y -= speed;
        }
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // TODO: Fille style
        ctx.fillStyle = 'blue';
        ctx.fillRect(x, y, 100, 100);
        window.requestAnimationFrame(() => {renderLoop(canvas)});
    }
</script>
<template>
    <div class="fixed w-full h-full top-0 left-0 pointer-events-none">
        <canvas ref="mainCanvas" ></canvas>
        <slot />
    </div>
</template>