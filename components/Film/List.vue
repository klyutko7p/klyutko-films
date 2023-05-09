<script setup lang="ts">
const IMG_URL = "http://image.tmdb.org/t/p/original"

defineProps({
    films: { type: Array as PropType<Film[]>, required: true },
})
</script>

<template>
    <div class="grid grid-cols-5 gap-10">
        <div v-for="film in films" class="space-y-3" data-aos="fade-up">
            <img @click="$router.push(`/film/${film.id}`)" :src="IMG_URL + film.poster_path"
                class="max-w-[300px] w-full max-h-[400px] cursor-pointer h-screen" alt="" v-if="film.poster_path">
            <img :src="IMG_URL + film.backdrop_path" alt=""
                class="max-w-[300px] w-full max-h-[400px] cursor-pointer h-screen" @click="$router.push(`/film/${film.id}`)"
                v-else-if="film.backdrop_path && !film.poster_path">
            <img src="@/assets/images/no-image.png" class="max-w-[300px] w-full max-h-[400px] cursor-pointer h-screen"
                @click="$router.push(`/film/${film.id}`)" alt="" v-else>
            <h1 class="text-xl"><span @click="$router.push(`/film/${film.id}`)"
                    class="font-bold duration-200 hover:text-hover-color cursor-pointer">{{ film.title
                    }}</span>, {{
    film.release_date ? new
        Date(film.release_date).getFullYear() : "?" }}</h1>
        </div>
    </div>
</template>

