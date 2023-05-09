<script setup lang="ts">
import { usePersonsStore } from '../../stores/person'

const storePersons = usePersonsStore()
const route = useRoute()
const id = +route.params.id

let person = ref({} as Person)
let filmsCredits = ref({} as CreditFilm)
let images = ref({} as Image)
let social = ref({} as Social)

let isLoading = ref(true)

function getFilms() {

}

function setFilmsByFilter(filter: string) {
    if (person.value.known_for_department === "Acting") {
        if (filter === "Date") {
            filmsCredits.value.cast.sort((a, b) => new Date(b.release_date).getFullYear() - new Date(a.release_date).getFullYear())
        } else if (filter === "Title") {
            filmsCredits.value.cast.sort((a, b) => a.title.localeCompare(b.title))
        } else if (filter === "AVG") {
            filmsCredits.value.cast.sort((a, b) => b.vote_average - a.vote_average)
        }
    } else {
        if (filter === "Date") {
            filmsCredits.value.crew.sort((a, b) => new Date(b.release_date).getFullYear() - new Date(a.release_date).getFullYear())
        } else if (filter === "Title") {
            filmsCredits.value.crew.sort((a, b) => a.title.localeCompare(b.title))
        } else {
            filmsCredits.value.crew.sort((a, b) => b.vote_average - a.vote_average)
        }
    }
}

onMounted(async () => {
    await storePersons.fetchPersonById(id)
    person.value = storePersons.getPerson
    filmsCredits.value = storePersons.getPersonFilmsCredits
    setFilmsByFilter("AVG")
    images.value = storePersons.getPersonImages
    social.value = storePersons.getPersonSocial
    isLoading.value = false
})

</script>

<template>
    <div v-if="!isLoading" class="mt-10">

        <Head>
            <Title>{{ person.name }} - Movie App</Title>
        </Head>
        <img src="https://covermart.ru/assets/images/products/115676/in-laminate-4.jpg" loading="lazy" alt=""
            class="fixed opacity-[0.1] z-[-10] h-screen w-full left-0 top-0">
        <div class="space-y-3">
            <PersonDetails :person="person" :images="images" :social="social" />
            <div class="mt-10">
                <div class="flex items-center gap-3 mb-3">
                    <h1 class="text-2xl font-bold">All works</h1>
                    <Icon class="text-hover-color" name="material-symbols:workspace-premium" size="32px" />
                </div>
                <div class="grid grid-cols-3 font-bold text-xl mb-3">
                    <h1><span @click="setFilmsByFilter('Title')"
                            class="duration-200 hover:text-hover-color cursor-pointer">Title
                            (A-Z)</span>
                    </h1>
                    <h1 class="text-center"><span @click="setFilmsByFilter('AVG')"
                            class="duration-200 hover:text-hover-color cursor-pointer">AVG Rating</span></h1>
                    <h1 class="text-right"><span @click="setFilmsByFilter('Date')"
                            class="duration-200 hover:text-hover-color cursor-pointer">Date</span></h1>
                </div>
                <PersonWorks :films="filmsCredits" :person="person" class="mb-10" />
            </div>
            <div class="mb-10">
                <Carousel :films="filmsCredits.cast.filter(film => film.popularity > 20)"
                    v-if="person.known_for_department === 'Acting'" title="Popular films" icon="mdi:star-check-outline" />
                <Carousel
                    :films="filmsCredits.crew.filter(film => film.popularity > 20 && film.department === person.known_for_department)"
                    v-else title="Popular films" icon="mdi:star-check-outline" />
            </div>
        </div>
    </div>
    <div v-else>
        <UISpinner />
    </div>
</template>
