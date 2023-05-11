<script setup lang="ts">
import { useFilmsStore } from '@/stores/films'
import { useCreditsStore } from '@/stores/credits'
import { useVideosStore } from '@/stores/videos'
import { useReviewsStore } from '@/stores/reviews'

const route = useRoute()
const router = useRouter()
const storeFilms = useFilmsStore()
const storeCredits = useCreditsStore()
const storeVideos = useVideosStore()
const storeReviews = useReviewsStore()
const IMG_URL = "http://image.tmdb.org/t/p/original"
const id = +route.params.id

let isLoading = ref(true)

let film = ref({} as Film)
let recommendationsFilms = ref<Array<Film>>([])
let credits = ref({} as Credit)
let videos = ref<Array<Video>>([])
let reviews = ref<Array<Review>>([])

let colorAVG = ref("")
function voteCheck(avg: number) {
    if (avg === 0) {
        colorAVG.value = "#5A5A5A"
        return "No AVG"
    }

    if (avg > 0 && avg <= 5) {
        colorAVG.value = "#FE0000"
        return avg.toFixed(1)
    }

    if (avg > 5 && avg <= 6) {
        colorAVG.value = "#5A5A5A"
        return avg.toFixed(1)
    }

    if (avg > 6 && avg <= 7.8) {
        colorAVG.value = "#73B85C"
        return avg.toFixed(1)
    }

    if (avg > 7.8 && avg <= 10) {
        colorAVG.value = "#008000"
        return avg.toFixed(1)
    }
}

function goToCredits(id: number) {
    router.push(`/film/${id}/credits`)
}

onMounted(async () => {
    await storeFilms.fetchFilmById(id)
    await storeCredits.fetchCreditsById(id)
    await storeVideos.fetchVideosById(id)
    await storeReviews.fetchReviewsById(id)
    film.value = storeFilms.getFilmById
    recommendationsFilms.value = storeFilms.getRecommendationsFilms
    credits.value = storeCredits.getCredits
    videos.value = storeVideos.getVideos
    reviews.value = storeReviews.getReviews
    isLoading.value = false
})
</script>

<template>
    <div v-if="!isLoading" v-cloak>

        <Head>
            <Title>{{ film.title }} - Movie App</Title>
        </Head>
        <img :src="IMG_URL + film.backdrop_path" alt=""
            class="fixed opacity-[0.1] max-lg:blur-lg h-screen max-lg:h-full z-[-10] w-full left-0 top-0">
        <div class="z-10 py-5 flex max-md:block gap-16">
            <div class="flex flex-col gap-5">
                <div class="relative max-md:mx-auto">
                    <img :src="IMG_URL + film.poster_path" alt="" class="max-w-[300px] max-h-[450px]"
                        v-if="film.poster_path">
                    <img :src="IMG_URL + film.poster_path" alt="" class="max-w-[300px] max-h-[450px]"
                        v-else-if="film.backdrop_path && !film.poster_path">
                    <img src="@/assets/images/no-image.png" alt="" class="max-w-[300px] max-h-[450px]" v-else>
                </div>
                <h1 class="text-2xl font-bold mb-10 max-md:text-center"><span class="p-2"
                        :style="{ backgroundColor: colorAVG }">{{
                            voteCheck(film.vote_average)
                        }}</span> - {{ film.vote_count }}
                    votes</h1>
            </div>
            <div class="space-y-3">
                <FilmDetails :film="film" />
            </div>
        </div>
        <FilmCollection :film="film" />
        <FilmTrailer :videos="videos" class="mb-10" />
        <Carousel v-if="recommendationsFilms.length > 0" :films="recommendationsFilms" :title="'You may like'"
            icon="mdi:heart-plus" />
        <FilmCredits :credits="credits" @goToCredits="goToCredits" />
        <FilmReviews :reviews="reviews" />
    </div>
    <div v-else>
        <UISpinner />
    </div>
</template>
