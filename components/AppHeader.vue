<script setup>
const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())
</script>

<template>
    <header>
        <ul>
            <li v-for="item in navigation" :key="item.id">
                <nuxt-link :to="item._path">{{ `${item.icon ?? ''} ${item.title}` }}</nuxt-link>
            </li>
        </ul>
        <pre>{{ navigation }}</pre>
    </header>
</template>