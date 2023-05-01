<script setup lang="ts">
import { useFilmsStore } from '../../stores/films'

const route = useRoute()
const storeFilms = useFilmsStore()
const IMG_URL = "http://image.tmdb.org/t/p/original/"
const id = +route.params.id

let isLoading = ref(true)

let film = ref({} as Film)

onMounted(async () => {
    await storeFilms.fetchFilmById(id)
    film.value = storeFilms.getFilmById
    isLoading.value = false
})

let colorAVG = ref("")


function voteCheck(avg: number) {
    if (avg === 0) {
        colorAVG.value = "#5A5A5A"
        return "No AVG"
    }

    if (avg > 0 && avg <= 5) {
        colorAVG.value = "#FE0000"
        return avg.toFixed(1)
    }

    if (avg > 5 && avg <= 6) {
        colorAVG.value = "#5A5A5A"
        return avg.toFixed(1)
    }

    if (avg > 6 && avg <= 7.5) {
        colorAVG.value = "#73B85C"
        return avg.toFixed(1)
    }

    if (avg > 7.5 && avg <= 10) {
        colorAVG.value = "#008000"
        return avg.toFixed(1)
    }
}


</script>


<template>
    <div v-if="!isLoading" v-cloak>
        <img :src="IMG_URL + film.backdrop_path" alt="" class="fixed opacity-[0.1] z-[-10] w-full left-0">
        <div class="z-10 py-5 flex gap-16">
            <div class="flex flex-col gap-5">
                <img :src="IMG_URL + film.poster_path" alt="" class="max-w-[300px] max-h-[450px]">
                <h1 class="text-2xl font-bold"><span class="p-2" :style="{ backgroundColor: colorAVG }">{{
                    voteCheck(film.vote_average)
                }}</span> - {{ film.vote_count }}
                    votes</h1>
            </div>
            <div class="space-y-3">
                <div>
                    <h1 class="font-bold text-3xl">{{ film.title }}, {{ new
                        Date(film.release_date).toLocaleDateString("en-EN",
                            { year: "numeric" }) }}</h1>
                    <h1 class="text-gray-600 text-xl">{{ film.original_title }} - <span class="text-white underline">{{
                        film.status
                    }}</span> </h1>
                </div>
                <h1 class="text-2xl">{{ film.overview }}</h1>
                <FilmDetails :film="film" />
            </div>
        </div>
        <div v-if="film.belongs_to_collection">
            <h1 class="text-4xl font-bold">Part of the {{ film.belongs_to_collection.name }}</h1>
            <div>
                <img :src="IMG_URL + film.belongs_to_collection.backdrop_path" alt="">
            </div>
        </div>
    </div>
    <div v-else>
        <UISpinner />
    </div>
</template>
