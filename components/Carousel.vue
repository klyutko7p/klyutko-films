<template>
    <div class="mb-5 flex items-center gap-3">
        <h1 class="text-white text-2xl font-bold">{{ title }}</h1>
        <Icon :name="icon" size="32px" class="text-hover-color" />
    </div>
    <swiper :slidesPerView="5.5" :spaceBetween="30" :pagination="{
            clickable: true,
        }" :breakpoints="breakpoints" :modules="modules" class="mySwiper mb-10 p-10">
        <swiper-slide v-for="film in films">
            <div class="hover:scale-95 hover:shadow-2xl hover:shadow-hover-color duration-200 ">
                <img :src="IMG_URL + film.poster_path" alt="" class="relative max-h-96 h-screen mx-auto cursor-pointer"
                    @click="$router.push(`/film/${film.id}`)" v-if="film.poster_path">
                <img :src="IMG_URL + film.backdrop_path" alt="" class="relative max-h-96 h-screen mx-auto cursor-pointer"
                    @click="$router.push(`/film/${film.id}`)" v-else-if="film.backdrop_path && !film.poster_path">
                <img src="@/assets/images/no-image.png" class="max-h-96 h-screen" @click="$router.push(`/film/${film.id}`)"
                    alt="" v-else>
            </div>
        </swiper-slide>
    </swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper'
let modules = [Pagination]
const IMG_URL = "http://image.tmdb.org/t/p/w500"

let breakpoints = {
    240: {
        slidesPerView: 1.2,
        spaceBetween: 40
    },
    460: {
        slidesPerView: 1.5,
        spaceBetween: 40
    },
    610: {
        slidesPerView: 2,
        spaceBetween: 40
    },
    770: {
        slidesPerView: 3,
        spaceBetween: 40
    },
    1040: {
        slidesPerView: 4,
        spaceBetween: 40
    },
    1540: {
        slidesPerView: 5.5,
        spaceBetween: 40
    }
}

defineProps({
    films: { type: Array as PropType<Film[]>, required: true },
    title: { type: String, default: "Films" },
    icon: { type: String, required: true },
})
</script>

<style scoped></style>