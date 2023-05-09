<script setup lang="ts">
import { useCreditsStore } from '../../../stores/credits'
import { useFilmsStore } from '../../../stores/films'

const storeCredits = useCreditsStore()
const storeFilms = useFilmsStore()
const route = useRoute()

const id = +route.params.id
let credits = ref({} as Credit)
let film = ref({} as Film)
let isLoading = ref(true)
const IMG_URL = "http://image.tmdb.org/t/p/original"


onMounted(async () => {
    await storeCredits.fetchCreditsById(id)
    await storeFilms.fetchFilmById(id)
    credits.value = storeCredits.getCredits
    film.value = storeFilms.getFilmById
    isLoading.value = false
})

</script>

<template>
    <div v-if="!isLoading">

        <Head>
            <Title>{{ film.title }} (Credits) - Movie App</Title>
        </Head>
        <img :src="IMG_URL + film.backdrop_path" alt="" class="fixed opacity-[0.1] z-[-10] w-full left-0 top-0">
        <div class="mt-10 flex gap-40">
            <div>
                <h1 class="text-center text-4xl mb-10">Cast - {{ credits.cast.length }}</h1>
                <div class="grid grid-cols-3 gap-5">
                    <div v-for="actor in credits.cast" class="flex flex-col text-center">
                        <div @click="$router.push(`/person/${actor.id}`)" :style="{
                                backgroundImage: `url('${actor.profile_path ? IMG_URL + actor.profile_path : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}')`
                            }"
                            class="w-[110px] bg-cover bg-center h-[110px] mx-auto rounded-[50%] mb-3 cursor-pointer">
                        </div>
                        <div>
                            <h1 @click="$router.push(`/person/${actor.id}`)" :title="actor.name"
                                class="text-xl  font-bold whitespace-nowrap overflow-clip">
                                <span class="hover:text-hover-color duration-300 cursor-pointer"> {{ actor.name }}</span>
                            </h1>
                            <h1 :title="actor.character" class="text-gray-500 whitespace-nowrap overflow-clip">{{
                                actor.character }}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h1 class="text-center text-4xl mb-10">Crew - {{ credits.crew.length }}</h1>
                <div class="grid grid-cols-3 gap-5">
                    <div v-for="author in credits.crew.sort((a, b) => b.popularity - a.popularity)"
                        class="flex flex-col text-center">
                        <div @click="$router.push(`/person/${author.id}`)" :style="{
                                backgroundImage: `url('${author.profile_path ? IMG_URL + author.profile_path : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}')`
                            }"
                            class="w-[110px] bg-cover bg-center h-[110px] mx-auto rounded-[50%] mb-3 cursor-pointer">
                        </div>
                        <div>
                            <h1 @click="$router.push(`/person/${author.id}`)" :title="author.name"
                                class="text-xl  font-bold whitespace-nowrap overflow-clip">
                                <span class="hover:text-hover-color duration-300 cursor-pointer"> {{ author.name }}</span>
                            </h1>
                            <h1 :title="author.job" class="text-gray-500 whitespace-nowrap overflow-clip">{{ author.job }}
                            </h1>
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

