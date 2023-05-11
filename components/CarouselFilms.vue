<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation, Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { useGenresStore } from '../stores/genres'

const IMG_URL = "http://image.tmdb.org/t/p/original"
let modules = [Autoplay, Pagination, Navigation]
const storeGenres = useGenresStore()

defineProps({
    films: { type: Array as PropType<Film[]>, required: true },
})
</script>


<template>
    <swiper class="swiper mb-10" :loop="true" :slides-per-view="1" :space-between="30" :modules="modules" :pagination="{
            clickable: true
        }" :autoplay="{
            delay: 10000,
            disableOnInteraction: true,
        }">
        <swiper-slide class="slide cursor-grab max-lg:text-center" v-for="film in films">
            <img :src="IMG_URL + film.backdrop_path" alt="backdrop_path" class="opacity-20 h-full min-h-[300px] relative">
            <div class="absolute bottom-10 left-10 max-lg:top-24 flex gap-5">
                <img :src="IMG_URL + film.poster_path"
                    class="max-w-[250px] max-lg:hidden relative cursor-pointer animate-pulse hover:animate-none"
                    alt="poster_path" @click="$router.push(`/film/${film.id}`)">
                <div class="space-y-3">
                    <h1 class="text-4xl"><span @click="$router.push(`/film/${film.id}`)"
                            class="cursor-pointer font-bold hover:text-hover-color duration-200">{{
                                film.title
                            }}</span> ({{ new Date(film.release_date).toLocaleDateString("en-EN", { year: "numeric" }) }})
                    </h1>
                    <h1 class="text-2xl text-gray-600 max-sm:hidden">{{ film.original_title }}, <span class="uppercase">{{
                        film.original_language
                    }}</span>
                    </h1>
                    <h1 class="text-lg font-medium max-md:hidden">{{ film.overview }}</h1>
                    <div class="flex items-center flex-wrap gap-5 max-md:hidden">
                        <div class="border-2 text-xl font-bold cursor-pointer hover:text-hover-color hover:bg-white duration-300 border-white py-3 px-7 max-lg:text-base
                            rounded-3xl" v-for="genre_id in film.genre_ids"
                            @click="$router.push(`/genre/${genre_id}`)">
                            {{ storeGenres.getGenreName(genre_id) }}
                        </div>
                    </div>
                </div>
            </div>
        </swiper-slide>
    </swiper>
</template>


