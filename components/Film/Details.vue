<script setup lang="ts">
const IMG_URL = "http://image.tmdb.org/t/p/original"

defineProps({
    film: { type: Object as PropType<Film>, required: true }
})

function getCountries(countries: Array<Country>) {
    let array = []
    for (let i = 0; i < countries.length; i++) {
        if (countries[i] === countries[countries.length - 1]) {
            array.push(countries[i].name)
        } else {
            array.push(countries[i].name + ", ")
        }
    }
    return array
}

function getGenres(genres: Array<Genre>) {
    let array = []
    for (let i = 0; i < genres.length; i++) {
        if (genres[i] === genres[genres.length - 1]) {
            array.push(genres[i])
        } else {
            array.push({ id: genres[i].id, name: genres[i].name + ", " })
        }
    }
    return array
}
</script>

<template>
    <div>
        <h1 class="font-bold text-3xl">{{ film.title }}, {{ film.release_date ? new
            Date(film.release_date).toLocaleDateString("en-EN",
                { year: "numeric" }) : "?" }}</h1>
        <h1 class="text-gray-600 text-xl">{{ film.original_title }} - <span class="text-white">{{
            film.status
        }}</span> </h1>
    </div>
    <h1 class="text-2xl">{{ film.overview }}</h1>
    <h1 class="text-4xl font-bold">Details:</h1>
    <div class="text-lg">
        <div class="grid grid-cols-2">
            <h1>Release Date</h1>
            <h1>{{ film.release_date ? new
                Date(film.release_date).toLocaleDateString("en-EN",
                    { year: "numeric", month: "long", day: "numeric" }) : "-" }}</h1>
        </div>
        <div class="grid grid-cols-2" v-if="film.production_countries.length > 0">
            <h1>Country</h1>
            <div class="flex items-center gap-1">
                <h1 v-for="country in getCountries(film.production_countries)">
                    {{ country ? country : "-" }}
                </h1>
            </div>
        </div>
        <div class="grid grid-cols-2" v-if="film.genres.length > 0">
            <h1>Genres</h1>
            <div class="flex items-center gap-1">
                <h1 v-for="genre in getGenres(film.genres)"
                    class="hover:text-hover-color font-bold duration-300 cursor-pointer underline">
                    {{ genre ? genre.name : "-" }}
                </h1>
            </div>
        </div>
        <div class="grid grid-cols-2">
            <h1>Tagline</h1>
            <h1>{{ film.tagline ? `"${film.tagline}"` : "-" }}</h1>
        </div>
        <div class="grid grid-cols-2">
            <h1>Budget</h1>
            <h1>{{ film.budget ? "$" + new Intl.NumberFormat("de-DE", {}).format(film.budget) : "-" }}</h1>
        </div>
        <div class="grid grid-cols-2">
            <h1>Revenue</h1>
            <h1>{{ film.revenue ? "$" + new Intl.NumberFormat("de-DE", {}).format(film.revenue) : "-" }}</h1>
        </div>
        <div class="grid grid-cols-2">
            <h1>Runtime</h1>
            <h1>{{ film.runtime ? `${film.runtime} min. / ${film.runtime > 60 ? (film.runtime / 60).toFixed(0) : "0"} h.
                            ${film.runtime % 60} min.` :
                "-" }}</h1>
        </div>
        <div class="grid grid-cols-2">
            <h1>Adult</h1>
            <h1>{{ film.adult ? "18+" : "PG-13" }}</h1>
        </div>
    </div>
</template>

