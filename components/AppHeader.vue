<script setup>
const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())
</script>

<template>
    <header class="mb-5">
        <ul class="inline-block">
            <li class="block" v-for="item, index in navigation" :key="item.id">
                <nuxt-link :to="item._path">{{ `${item.icon ?? ''} ${item.title}` }}</nuxt-link>
                <!-- <span v-if="index !== navigation.length -1"> | </span> -->
            </li>
        </ul>
        <main-logo />
        <!-- <pre>{{ navigation }}</pre> -->
    </header>
</template>