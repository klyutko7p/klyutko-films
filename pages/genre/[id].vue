<script setup lang="ts">
import { useFilmsStore } from '../../stores/films'
import { useGenresStore } from '../../stores/genres'

const storeFilms = useFilmsStore()
const storeGenres = useGenresStore()

const route = useRoute()

const observerMain = ref(null)

let id = +route.params.id
let sort = ref('popularity.desc')
let films = ref<Array<Film>>([])
let isLoading = ref(true)
let genre = ref('')

async function changeFilter() {
    await storeFilms.fetchFilmsByGenre(id, sort.value)
    films.value = storeFilms.getGenresFilms
}


onMounted(async () => {
    await storeFilms.fetchFilmsByGenre(id, sort.value)
    await storeGenres.fetchGenres()
    genre.value = storeGenres.getGenreName(id)
    films.value = storeFilms.getGenresFilms
    isLoading.value = false

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(async (entry) => {
                if (entry.isIntersecting) {
                    await storeFilms.loadMoreGenreFilms(id, sort.value)
                    films.value = storeFilms.getGenresFilms
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
    <div class="flex items-center gap-3 mb-3 mt-10">
        <h1 class="text-3xl font-bold">Sort</h1>
    </div>
    <div>
        <select v-model="sort" @change="changeFilter"
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
        <div v-if="!isLoading">

            <Head>
                <Title>{{ genre }} - Movie App</Title>
            </Head>
            <FilmList :films="films" />
        </div>
        <div v-else>
            <UISpinner />
        </div>
    </div>
    <div ref="observerMain"></div>
</template>


