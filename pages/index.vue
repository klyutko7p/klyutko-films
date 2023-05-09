<script setup lang="ts">
import { useFilmsStore } from '../stores/films'
import { useGenresStore } from '../stores/genres'

const storeFilms = useFilmsStore()
const storeGenres = useGenresStore()

let popularFilms = ref<Array<Film>>([])
let ratedFilms = ref<Array<Film>>([])
let upcomingFilms = ref<Array<Film>>([])
let nowPlayingFilms = ref<Array<Film>>([])

let genres = ref<Array<Genre>>([])
let isLoading = ref(true)


onMounted(async () => {
    await storeFilms.fetchCompilationFilms()
    await storeGenres.fetchGenres()
    popularFilms.value = storeFilms.getPopularFilms
    ratedFilms.value = storeFilms.getRatedFilms
    upcomingFilms.value = storeFilms.getUpcomingFilms
    nowPlayingFilms.value = storeFilms.getNowPlayingFilms
    genres.value = storeGenres.getGenres
    isLoading.value = false
})
</script>

<template>
    <Head>
        <Title>Home - Movie App</Title>
    </Head>
    <div v-if="!isLoading" v-cloak class="max-md:p-3">
        <div class="space-y-3 mb-24">
            <div class="h-[700px] mb-12">
                <div class="space-y-5 flex items-center justify-center flex-col p-5 description">
                    <h1 class="font-bold text-5xl text-center capitalize">Welcome to our <span
                            class="text-hover-color">movie</span>
                        app!</h1>
                    <h1 class="text-center text-3xl">With thousands of movies to choose from, our app is your
                        one-stop-shop
                        for
                        all
                        your
                        movie needs. Whether
                        you're in the mood for an action-packed blockbuster, a heartwarming rom-com, or a spine-chilling
                        horror
                        flick, we've got you covered.</h1>
                    <UIMainButton>
                        Explore the films
                    </UIMainButton>
                </div>
            </div>
            <div>
                <div class="flex items-center gap-3 mb-10">
                    <h1 class="text-2xl font-bold">Our Advantages</h1>
                    <Icon class="text-hover-color" name="material-symbols:heart-plus-outline" size="32px" />
                </div>
                <div class="flex items-center justify-center max-lg:flex-wrap gap-10 text-center">
                    <div class="space-y-5">
                        <Icon name="streamline:interface-share-user-human-person-share-signal-transmit-user" size="60px" />
                        <h1 class="text-hover-color font-bold text-3xl">Easy-to-Use UI</h1>
                        <h1 class="text-xl">Our easy-to-use interface lets you browse and filter movies by genre,
                            release date,
                            rating, and
                            more. You can also save your favorite movies to your watchlist and receive notifications when
                            they
                            become available to stream.</h1>
                    </div>
                    <div class="space-y-5">
                        <Icon name="mdi:cards-heart" size="60px" />
                        <h1 class="text-hover-color font-bold text-3xl">Convenience</h1>
                        <h1 class="text-xl">With a movie app, you can easily access thousands of movies from the comfort of
                            your
                            own home or on the go. No more waiting in long lines or dealing with crowds at the movie
                            theater.
                        </h1>
                    </div>
                    <div class="space-y-5">
                        <Icon name="fluent:diversity-24-filled" size="60px" />
                        <h1 class="text-hover-color font-bold text-3xl">Variety</h1>
                        <h1 class="text-xl">Movie apps offer a vast selection of movies, including classic favorites
                            and new
                            releases, as well as international films and independent productions. This ensures that there is
                            something for everyone, regardless of their tastes.</h1>
                    </div>
                </div>
            </div>
            <div>
                <div class="flex items-center gap-3 mb-10 mt-10">
                    <h1 class="text-2xl font-bold">Genres</h1>
                    <Icon class="text-hover-color"
                        name="streamline:travel-places-theater-mask-hobby-theater-masks-drama-event-show-entertainment"
                        size="32px" />
                </div>
                <div class="flex items-center justify-center flex-wrap gap-5">
                    <div v-for="genre in genres"
                        class="bg-white text-black hover:text-white hover:bg-hover-color duration-200 cursor-pointer min-w-[200px] min-h-[200px] hover:scale-110 hover:shadow-2xl hover:shadow-black flex items-center justify-center p-3">
                        <h1 class="font-bold text-xl">{{ genre.name }}</h1>
                    </div>
                </div>
            </div>
        </div>
        <h1 class="text-center text-5xl font-bold mb-10">Browse our <span class="text-hover-color">collections</span>
        </h1>
        <CarouselFilms :films="popularFilms.slice(0, 10)" />
        <Carousel :films="ratedFilms" :title="'Top rated films for all time'" icon="mdi:star-shooting" />
        <Carousel :films="upcomingFilms" :title="'The most anticipated films of the year'"
            icon="ic:round-event-available" />
        <Carousel :films="nowPlayingFilms" :title="'Everyone is watching it now'" icon="ri:fire-fill" />
    </div>
    <div v-else>
        <UISpinner />
    </div>
</template>
