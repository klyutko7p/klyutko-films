<script setup lang="ts">
const IMG_URL = "http://image.tmdb.org/t/p/original"

defineProps({
    films: { type: Array as PropType<Film[]>, required: true },
})
</script>

<template>
    <div class="flex items-center gap-3 mt-10 mb-5">
        <h1 class="text-2xl font-bold">Results</h1>
        <Icon name="ic:round-filter-list" size="32px" class="text-hover-color" />
    </div>
    <div class="grid grid-cols-5 gap-10 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        <div v-for="film in films" class="space-y-3 mx-auto" data-aos="fade-up">
            <h1 class="text-xl hidden max-sm:block"><span @click="$router.push(`/film/${film.id}`)"
                    class="font-bold duration-200 hover:text-hover-color cursor-pointer">{{ film.title
                    }}</span>, {{
    film.release_date ? new
        Date(film.release_date).getFullYear() : "?" }}</h1>
            <img @click="$router.push(`/film/${film.id}`)" :src="IMG_URL + film.poster_path"
                class="max-w-[300px] mx-auto max-sm:w-[250px] max-h-[400px] cursor-pointer" alt="" v-if="film.poster_path">
            <img :src="IMG_URL + film.backdrop_path" alt=""
                class="max-w-[300px] mx-auto max-sm:w-[250px] max-h-[400px] cursor-pointer"
                @click="$router.push(`/film/${film.id}`)" v-else-if="film.backdrop_path && !film.poster_path">
            <img src="@/assets/images/no-image.png" class="max-w-[300px] mx-auto max-h-[400px] cursor-pointer"
                @click="$router.push(`/film/${film.id}`)" alt="" v-else>
            <h1 class="text-xl max-sm:hidden"><span @click="$router.push(`/film/${film.id}`)"
                    class="font-bold duration-200 hover:text-hover-color cursor-pointer">{{ film.title
                    }}</span>, {{
    film.release_date ? new
        Date(film.release_date).getFullYear() : "?" }}</h1>
        </div>
    </div>
</template>

