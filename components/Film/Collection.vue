<script setup lang="ts">
defineProps({
    film: { type: Object as PropType<Film>, required: true }
})
const IMG_URL = "http://image.tmdb.org/t/p/original"
</script>

<template>
    <div class="mt-10" v-if="film.belongs_to_collection">
        <h1 class="text-4xl text-center font-bold mb-10">Part of the <span class="text-hover-color">{{
            film.belongs_to_collection.name
        }}</span> </h1>
        <div :style="{ backgroundImage: `url(${IMG_URL + film.belongs_to_collection.backdrop_path})` }"
            class="mb-10 h-[250px] bg-[50%] bg-cover bg-no-repeat p-5 rounded-[40px] flex items-center">
            <UIMainButton @click="$router.push(`/collection/${film.belongs_to_collection.id}`)">
                VIEW THE COLLECTION
            </UIMainButton>
        </div>
    </div>
</template>


