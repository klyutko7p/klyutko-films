<script setup lang="ts">
import { useFilmsStore } from '../stores/films'
import { useGenresStore } from '../stores/genres'

const storeFilms = useFilmsStore()
const IMG_URL = "http://image.tmdb.org/t/p/original"

let favoritesFilms = ref<Array<Film>>([])

function removeFilm(film: Film) {
    storeFilms.removeFavoriteFilm(film)
}

onMounted(() => {
    favoritesFilms.value = storeFilms.getFavoritesFilms
})


</script>

<template>
    <Head>
        <Title>Favorites Films - Movie App</Title>
    </Head>
    <div class="mt-10" v-if="favoritesFilms.length > 0">
        <div class="flex items-center text-2xl gap-3 mb-10">
            <h1 class="font-bold
            ">Your Favorites Films</h1>
            <Icon name="ph:heart-break-bold" class="text-hover-color" size="32px" />
        </div>
        <div class="space-y-10 mb-10">
            <div v-for="film in favoritesFilms"
                class="flex items-center max-md:text-center max-md:block gap-16 rounded-2xl p-10 shadow-2xl shadow-hover-color bg-secondary-color">
                <img :src="IMG_URL + film.poster_path" alt=""
                    class="max-w-[250px] max-md:mb-10 max-md:mx-auto border-2 cursor-pointer"
                    @click="$router.push(`/film/${film.id}`)" v-if="film.poster_path">
                <img :src="IMG_URL + film.backdrop_path" alt=""
                    class="max-w-[250px] md:mb-10 md:mx-auto border-2 cursor-pointer"
                    @click="$router.push(`/film/${film.id}`)" v-else-if="film.backdrop_path && !film.poster_path">
                <img src="@/assets/images/no-image.png"
                    class="max-w-[250px] max-md:mb-10 max-md:mx-auto border-2 cursor-pointer"
                    @click="$router.push(`/film/${film.id}`)" alt="" v-else>
                <div class="space-y-10">
                    <div class="space-y-3">
                        <h1 class="text-2xl"><span @click="$router.push(`/film/${film.id}`)"
                                class="hover:text-hover-color font-bold duration-200 cursor-pointer">{{
                                    film.title }}</span>, {{ film.release_date ? new
        Date(film.release_date).getFullYear() : "?" }}</h1>
                        <h1 class="text-xl">{{ film.overview }}</h1>
                    </div>
                    <div class="flex items-center flex-wrap gap-5">
                        <div class="border-2 text-base font-bold cursor-pointer hover:text-hover-color hover:bg-white duration-300 border-white py-3 max-md:mx-auto px-7
                            rounded-3xl" v-for="genre in film.genres" @click="$router.push(`/genre/${genre.id}`)">
                            {{ genre.name }}
                        </div>
                    </div>
                    <UIMainButton @click="removeFilm(film)">
                        Remove film
                    </UIMainButton>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="text-center text-2xl space-y-3 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <h1>You don't have any favorites films. <br> Go to add something <span
                class="text-hover-color font-bold">interesting!</span>
        </h1>
        <UIMainButton @click="$router.push('/')">
            Explore the Films
        </UIMainButton>
    </div>
</template>
