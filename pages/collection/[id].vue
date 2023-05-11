<script setup lang="ts">
import { useCollectionsStore } from '../../stores/collections'
import { useGenresStore } from '../../stores/genres'

const route = useRoute()
const storeCollection = useCollectionsStore()
const storeGenres = useGenresStore()
let id = +route.params.id

let collection = ref({} as Collection)
let isLoading = ref(true)
const IMG_URL = "http://image.tmdb.org/t/p/original"

onMounted(async () => {
    await storeCollection.fetchCollectionById(id)
    await storeGenres.fetchGenres()
    collection.value = storeCollection.getCollection
    isLoading.value = false
})

</script>

<template>
    <div v-if="!isLoading">
        <img :src="IMG_URL + collection.backdrop_path" alt="" class="fixed opacity-[0.1] z-[-10] w-full left-0 top-0">
        <div class="mt-10 gap-16 flex items-start max-md:block">
            <div class="">
                <img :src="IMG_URL + collection.poster_path" alt=""
                    class="max-md:mx-auto max-md:mb-10 max-w-[300px] max-h-[450px]" v-if="collection.poster_path">
                <img :src="IMG_URL + collection.poster_path" alt=""
                    class="max-md:mx-auto max-md:mb-10 max-w-[300px] max-h-[450px]"
                    v-else-if="collection.poster_path && !collection.backdrop_path">
                <img src="@/assets/images/no-image.png" alt=""
                    class="max-md:mx-auto max-md:mb-10 max-w-[300px] max-h-[450px]" v-else>
            </div>
            <div>
                <h1 class="text-3xl font-bold">{{ collection.name }}, {{
                    storeCollection.getAVG(collection.parts) }} - AVG rating</h1>
                <h1 class="text-xl mt-3">{{ collection.overview }}</h1>
            </div>
        </div>
        <div class="mt-10">
            <div class="mb-5 flex items-center gap-3">
                <h1 class="text-white text-2xl font-bold">Films of {{ collection.name }}</h1>
                <Icon name="bi:collection" size="32px" class="text-hover-color" />
            </div>
            <div class="flex flex-col gap-10 mb-5">
                <div v-for="film in collection.parts.sort((a, b) => new Date(a.release_date).getFullYear() - new Date(b.release_date).getFullYear())"
                    class="flex max-lg:block max-lg:text-center gap-10 rounded-2xl p-10 shadow-2xl shadow-hover-color bg-secondary-color">
                    <img @click="$router.push(`/film/${film.id}`)" :src="IMG_URL + film.poster_path" alt=""
                        class="max-w-[200px] max-lg:mx-auto cursor-pointer border-2" v-if="film.poster_path">
                    <img @click="$router.push(`/film/${film.id}`)" :src="IMG_URL + film.poster_path" alt=""
                        class="max-w-[200px] max-lg:mx-auto cursor-pointer border-2"
                        v-else-if="film.backdrop_path && !film.poster_path">
                    <img @click="$router.push(`/film/${film.id}`)" src="@/assets/images/no-image.png" alt=""
                        class="max-w-[200px] max-lg:mx-auto cursor-pointer border-2" v-else>
                    <div class="space-y-3 p-3">
                        <h1 class="text-2xl font-bold"> <span @click="$router.push(`/film/${film.id}`)"
                                class="hover:text-hover-color duration-200 cursor-pointer">{{
                                    film.title }}</span>, {{ film.release_date ? new
        Date(film.release_date).toLocaleDateString("en-EN", {
            year: "numeric",
        }) : "?" }}</h1>
                        <h1 class="text-xl">{{ film.overview }}</h1>
                        <div class="flex items-center flex-wrap gap-5">
                            <div class="border-2 text-xl font-bold cursor-pointer hover:text-hover-color hover:bg-white duration-300 border-white py-3 px-7
                            rounded-3xl max-md:hidden" v-for="genre_id in film.genre_ids">
                                {{ storeGenres.getGenreName(genre_id) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <UISpinner />
    </div>
</template>
