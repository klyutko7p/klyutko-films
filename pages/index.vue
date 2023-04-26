<script setup lang="ts">
import { useFilmsStore } from '../stores/films'


let popularFilms = ref()
let isLoading = ref(true)

const storeFilms = useFilmsStore()
onMounted(async () => {
    await storeFilms.fetchPopularFilms()
    popularFilms.value = storeFilms.getPopularFilms
    isLoading.value = false
})
</script>

<template>
    <Head>
        <Title>Home</Title>
    </Head>
    <div v-if="!isLoading">
        <h1>Home Page</h1>
    </div>
    <div v-else>
        <h1>Loading...</h1>
    </div>
</template>



<style scoped></style>