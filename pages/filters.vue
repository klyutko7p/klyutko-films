<script setup lang="ts">
import { useLanguagesStore } from '../stores/languages'
import { useGenresStore } from '../stores/genres'
import { useFilmsStore } from '../stores/films'

const storeLanguages = useLanguagesStore()
const storeGenres = useGenresStore()
const storeFilms = useFilmsStore()

let languages = ref<Array<Language>>([])
let genres = ref<Array<Genre>>([])
let isLoading = ref(false)

let isFilters = ref(false)
let isSort = ref(true)
let films = ref<Array<Film>>([])
let observerMain = ref(null)

let queryBody = ref({
    date: '',
    language: 'en',
    sort: 'popularity.desc',
    userScore: 0,
    userVotes: 0,
    runtime: 0,
    genres_ids: [],
} as Filter)

function selectedSelection() {
    const tags = document.querySelectorAll(".genre-button")
    tags.forEach((tag) => {
        tag.classList.remove("bg-hover-color", "text-white")
    })

    if (queryBody.value.genres_ids.length != 0) {
        queryBody.value.genres_ids.forEach((id) => {
            const tag = document.getElementById(`${id}`)
            if (tag) {
                console.log(tag)
                tag.classList.add("bg-hover-color", "text-white")
            }
        })
    }
}

async function changeFilter() {
    isLoading.value = true
    await storeFilms.searchFilmsByFilters(queryBody.value)
    isLoading.value = false
    films.value = storeFilms.getFilterFilms
}

function getGenresIds(idGenre: number) {
    if (queryBody.value.genres_ids.length == 0) {
        queryBody.value.genres_ids.push(idGenre)
    } else {
        if (queryBody.value.genres_ids.includes(idGenre)) {
            queryBody.value.genres_ids.forEach((id, index) => {
                if (id === idGenre) {
                    queryBody.value.genres_ids.splice(index, 1)
                }
            })
        } else {
            queryBody.value.genres_ids.push(idGenre)
        }
    }
}

onMounted(async () => {
    await storeLanguages.fetchLanguages()
    await storeGenres.fetchGenres()
    await storeFilms.searchFilmsByFilters(queryBody.value)
    films.value = storeFilms.getFilterFilms
    genres.value = storeGenres.getGenres
    languages.value = storeLanguages.getLanguages

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(async (entry) => {
                if (entry.isIntersecting) {
                    await storeFilms.loadMoreFilterFilms(queryBody.value)
                    films.value = storeFilms.getFilterFilms
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
        <Title>Filters - Movie App</Title>
    </Head>
    <UISpinner v-if="isLoading" />
    <div class="mt-10">
        <div class="flex items-center gap-3 mb-3">
            <h1 class="text-3xl font-bold">Sort</h1>
            <Icon class="cursor-pointer" v-if="!isSort" name="ic:baseline-keyboard-arrow-down" size="32px"
                @click="isSort = true" />
            <Icon class="cursor-pointer" v-if="isSort" name="ic:baseline-keyboard-arrow-up" size="32px"
                @click="isSort = false" />
            <UIMainButton class="float-right" @click="changeFilter">
                Search
            </UIMainButton>
        </div>
        <div v-if="isSort">
            <select v-model="queryBody.sort" @change="changeFilter"
                class="w-full text-xl bg-secondary-color text-white border-2 border-hover-color mb-3 mt-3 rounded-full p-3">
                <option value="popularity.desc" selected>Popularity +</option>
                <option value="popularity.asc">Popularity -</option>
                <option value="release_date.desc">
                    Release date +
                </option>
                <option value="release_date.asc">
                    Release date -
                </option>
                <option value="revenue.desc">Revenue +</option>
                <option value="revenue.asc">Revenue -</option>
                <option value="vote_average.desc">
                    Vote average +
                </option>
                <option value="vote_average.asc">
                    Vote average -
                </option>
                <option value="original_title.desc">
                    Title (A-Z)
                </option>
                <option value="original_title.asc">Title (Z-A)</option>
            </select>
        </div>
        <div>
            <div class="flex items-center gap-3 my-5">
                <h1 class="text-3xl font-bold">Filters</h1>
                <Icon class="cursor-pointer" v-if="!isFilters" name="ic:baseline-keyboard-arrow-down" size="32px"
                    @click="isFilters = true" />
                <Icon class="cursor-pointer" v-if="isFilters" name="ic:baseline-keyboard-arrow-up" size="32px"
                    @click="isFilters = false" />
                <UIMainButton class="float-right" @click="changeFilter">
                    Search
                </UIMainButton>
            </div>
            <div v-if="isFilters">
                <div>
                    <h1 class="m-3 text-xl font-bold">Release Year</h1>
                    <input v-model="queryBody.date" placeholder="2012, 1992, 1998..."
                        class="bg-transparent p-3 rounded-full border-2 border-hover-color w-full" type="number">
                </div>
                <div>
                    <h1 class="m-3 text-xl font-bold">Language</h1>
                    <select
                        class="w-full text-xl bg-secondary-color text-white border-2 border-hover-color mb-3 rounded-full p-3"
                        v-model="queryBody.language">
                        <option value="" selected>Any language</option>
                        <option v-for="language in languages" :value="language.iso_639_1">
                            {{ language.english_name }}
                        </option>
                    </select>
                </div>
                <div class="flex items-center gap-3 mb-10 mt-10">
                    <h1 class="text-2xl font-bold">Genres</h1>
                    <Icon class="text-hover-color"
                        name="streamline:travel-places-theater-mask-hobby-theater-masks-drama-event-show-entertainment"
                        size="32px" />
                </div>
                <div class="flex items-center justify-center flex-wrap gap-5">
                    <div v-for="genre in genres" @click="getGenresIds(genre.id), selectedSelection(), changeFilter()"
                        :id="`${genre.id}`"
                        class="bg-white text-black hover:text-white hover:bg-hover-color duration-200 cursor-pointer min-w-[200px] min-h-[200px] hover:scale-110 hover:shadow-2xl genre-button hover:shadow-black flex items-center justify-center p-3">
                        <h1 class="font-bold text-xl">{{ genre.name }}</h1>
                    </div>
                </div>
                <div class="space-y-5">
                    <div class="text-xl">
                        <h1 class="text-2xl font-bold">User Score <span class="text-hover-color">{{ queryBody.userScore
                        }}</span></h1>
                        <div class="flex items-center gap-3">
                            <h1>Min: 0 AVG.</h1>
                            <h1>Max: 10 AVG.</h1>
                        </div>
                        <input class="w-full" type="range" step="1" v-model="queryBody.userScore" min="0" max="10">
                    </div>
                    <div class="text-xl">
                        <h1 class="text-2xl font-bold">User Votes <span class="text-hover-color"> {{ queryBody.userVotes
                        }}</span></h1>
                        <div class="flex items-center gap-3">
                            <h1>Min: 0 vote.</h1>
                            <h1>Max: 3000 vote.</h1>
                        </div>
                        <input class="w-full" type="range" step="1" v-model="queryBody.userVotes" min="0" max="3000">
                    </div>
                    <div class="text-xl mb-10">
                        <h1 class="text-2xl font-bold">Runtime <span class="text-hover-color"> {{ queryBody.runtime
                        }}</span>
                        </h1>
                        <div class="flex items-center gap-3">
                            <h1>Min: 0 min.</h1>
                            <h1>Max: 400 min.</h1>
                        </div>
                        <input class="w-full" type="range" step="1" v-model="queryBody.runtime" min="0" max="400">
                    </div>
                </div>
            </div>
        </div>

        <div v-if="films.length > 0">
            <FilmList :films="films" />
        </div>
        <div ref="observerMain"></div>
    </div>
</template>
