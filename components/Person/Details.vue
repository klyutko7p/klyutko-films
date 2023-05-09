<script setup lang="ts">

defineProps({
    person: { type: Object as PropType<Person>, required: true },
    images: { type: Object as PropType<Image>, required: true },
    social: { type: Object as PropType<Social>, required: true }
})

const FACEBOOK_URL = "https://www.facebook.com/"
const TWITTER_URL = "https://twitter.com/"
const INSTAGRAM_URL = "https://www.instagram.com/"

</script>


<template>
    <UIPhotoSwiper :images="images" />
    <div>
        <h1 class="text-center font-bold text-4xl">{{ person.name }}</h1>
        <div class="flex items-center justify-center gap-10 m-3">
            <a target="_blank" v-if="social.instagram_id" :href="INSTAGRAM_URL + social.instagram_id">
                <Icon name="skill-icons:instagram" size="32px" class="cursor-pointer hover:scale-110 duration-200" />
            </a>
            <a target="_blank" v-if="social.facebook_id" :href="FACEBOOK_URL + social.facebook_id">
                <Icon v-if="social.facebook_id" name="logos:facebook" size="32px"
                    class="cursor-pointer hover:scale-110 duration-200" />
            </a>
            <a target="_blank" v-if="social.twitter_id" :href="TWITTER_URL + social.twitter_id">
                <Icon name="skill-icons:twitter" size="32px" class="cursor-pointer hover:scale-110 duration-200" />
            </a>
            <a target="_blank" v-if="person.homepage" :href="person.homepage">
                <Icon name="logos:web-dev-icon" size="32px" class="cursor-pointer hover:scale-110 duration-200" />
            </a>
        </div>
        <h1 class="text-2xl text-center text-gray-400 mb-5">{{ person.known_for_department }}, {{ person.deathday ? new
            Date(person.deathday).getFullYear() - new
                Date(person.birthday).getFullYear() + " Age" : new Date().getFullYear() - new
                    Date(person.birthday).getFullYear() + " Age" }}
        </h1>
        <div class="flex items-center gap-3 mb-3" v-if="person.biography">
            <h1 class="text-2xl font-bold">Details</h1>
            <Icon class="text-hover-color" name="mdi:account-details" size="32px" />
        </div>
        <h1 class="text-xl italic">{{ person.biography }}</h1>
        <div class="m-10 text-2xl text-center flex items-center justify-around">
            <div class="space-y-5 w-full" v-if="person.birthday">
                <Icon name="iconoir:birthday-cake" size="56px" />
                <div>
                    <h1 class="text-xl font-bold">Birthday</h1>
                    <h1>{{ new Date(person.birthday).toLocaleDateString("en-EN", {
                        year: "numeric", month: "long", day:
                            "numeric"
                    }) }}</h1>
                </div>
            </div>
            <div class="space-y-5 w-full" v-if="person.deathday">
                <Icon name="healthicons:death-alt2-outline" size="56px" />
                <div>
                    <h1 class="text-xl font-bold">Deathday</h1>
                    <h1>{{ new Date(person.deathday).toLocaleDateString("en-EN", {
                        year: "numeric", month: "long", day:
                            "numeric"
                    }) }}</h1>
                </div>
            </div>
            <div class="space-y-5 w-full" v-if="person.gender">
                <Icon name="mdi:gender-male-female" size="56px" />
                <div>
                    <h1 class="text-xl font-bold">Gender</h1>
                    <h1>{{ person.gender === 1 ? "Female" : "Male" }}</h1>
                </div>
            </div>
            <div class="space-y-5 w-full" v-if="person.place_of_birth">
                <Icon name="maki:city-11" size="56px" />
                <div>
                    <h1 class="text-xl font-bold">Place of birth</h1>
                    <h1>{{ person.place_of_birth }}</h1>
                </div>
            </div>
        </div>
    </div>
</template>
