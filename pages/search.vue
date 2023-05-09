<script setup lang="ts">
import { useFilmsStore } from '../stores/films'
const storeFilms = useFilmsStore()
const observerMain = ref(null)

const IMG_URL = "http://image.tmdb.org/t/p/original"
let query = ref('Spider-Man')


let films = ref<Array<Film>>([])
let isLoading = ref(false)

async function search() {
    isLoading.value = true
    await storeFilms.searchFilmsByQuery(query.value)
    isLoading.value = false
    films.value = storeFilms.getSearchedFilms
}

onMounted(async () => {
    await storeFilms.searchFilmsByQuery(query.value)
    films.value = storeFilms.getSearchedFilms

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(async (entry) => {
                if (entry.isIntersecting) {
                    await storeFilms.loadMoreSearchFilms(query.value)
                    films.value = storeFilms.getSearchedFilms
                }
            })
        },
        {
            rootMargin: "0px",
            threshold: 1.0,
        }
    )

    if (observerMain.value) {
        observer.observe(observerMain.value)
    }
})

</script>

<template>
    <Head>
        <Title>Search - Movie App</Title>
    </Head>
    <UISpinner v-if="isLoading" />
    <div class="mt-10 space-y-10">
        <div class="space-y-3">
            <h1 class="text-2xl text-center font-bold">Search <span class="text-hover-color">Films</span> for Any Query!
            </h1>
            <input placeholder="Title..." type="text" v-model="query"
                class="text-xl p-3 rounded-full w-full bg-transparent border-2 border-hover-color" />
            <div class="float-right">
                <UIMainButton @click="search">
                    Search
                </UIMainButton>
            </div>
        </div>
        <div class="flex items-center gap-3">
            <h1 class="font-bold text-2xl">Results</h1>
            <Icon name="ic:baseline-menu" size="32px" class="text-hover-color" />
        </div>
        <div v-if="films.length > 0">
            <div class="grid grid-cols-5 gap-10">
                <div v-for="film in films" class="space-y-3" data-aos="fade-up">
                    <img @click="$router.push(`/film/${film.id}`)" :src="IMG_URL + film.poster_path"
                        class="max-w-[300px] w-full max-h-[400px] cursor-pointer h-screen" alt="" v-if="film.poster_path">
                    <img :src="IMG_URL + film.backdrop_path" alt=""
                        class="max-w-[300px] w-full max-h-[400px] cursor-pointer h-screen"
                        @click="$router.push(`/film/${film.id}`)" v-else-if="film.backdrop_path && !film.poster_path">
                    <img src="@/assets/images/no-image.png"
                        class="max-w-[300px] w-full max-h-[400px] cursor-pointer h-screen"
                        @click="$router.push(`/film/${film.id}`)" alt="" v-else>
                    <h1 class="text-xl"><span @click="$router.push(`/film/${film.id}`)"
                            class="font-bold duration-200 hover:text-hover-color cursor-pointer">{{ film.title
                            }}</span>, {{
    film.release_date ? new
        Date(film.release_date).getFullYear() : "?" }}</h1>
                </div>
            </div>
        </div>
        <div v-else class="flex items-center justify-center flex-col space-y-5">
            <h1 class="text-center text-2xl font-bold">Sorry, we don't have this <span class="text-hover-color">Film</span>
                in our database</h1>
            <UIMainButton @click="query = ''" class="z-10">
                Clear the query
            </UIMainButton>
            <UISpinner />
        </div>
        <div ref="observerMain"></div>
    </div>
</template>
