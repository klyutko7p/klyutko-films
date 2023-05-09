<script setup lang="ts">

defineProps({
    films: { type: Object as PropType<CreditFilm>, required: true },
    person: { type: Object as PropType<Person>, required: true },
})


</script>

<template>
    <div>
        <div class="space-y-5">
            <div v-for="film in films.cast.filter(film => film.vote_count > 50)"
                v-if="person.known_for_department === 'Acting'" class="grid grid-cols-3 text-xl border-b-2 border-b-white">
                <h1> <span @click="$router.push(`/film/${film.id}`)"
                        class="hover:text-hover-color duration-200 cursor-pointer font-bold">{{ film.title ?
                            film.title :
                            "—" }}</span>,
                    <span class="italic">as {{ film.character ?
                        film.character
                        : "—" }}</span>
                </h1>
                <h1 class="text-center italic">{{ film.vote_average ? film.vote_average.toFixed(1) : "—" }}</h1>
                <h1 class="text-right mb-3">{{ film.release_date ? new Date(film.release_date).getFullYear() :
                    "—" }}
                </h1>
            </div>
            <div v-for="film in films.crew.filter(film => film.vote_count > 50)" v-else
                class="grid grid-cols-3 text-xl border-b-2 border-b-white">
                <h1><span @click="$router.push(`/film/${film.id}`)"
                        class="hover:text-hover-color duration-200 cursor-pointer font-bold">{{ film.title ?
                            film.title :
                            "—" }}</span>,
                    <span class="italic">as {{ film.job ?
                        film.job
                        : "—" }}</span>
                </h1>
                <h1 class="text-center italic">{{ film.vote_average ? film.vote_average.toFixed(1) : "—" }}</h1>
                <h1 class="text-right mb-3">{{ film.release_date ? new Date(film.release_date).getFullYear() :
                    "—" }}
                </h1>
            </div>
        </div>
    </div>
</template>

<style scoped></style>