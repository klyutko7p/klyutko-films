<script setup lang="ts">
defineProps({
    credits: { type: Object as PropType<Credit>, required: true },
})
</script>

<template>
    <div class="mb-5 flex items-center gap-3">
        <h1 class="text-white text-2xl font-bold">Cast and Crew</h1>
        <Icon name="material-symbols:cinematic-blur" size="32px" class="text-hover-color" />
    </div>
    <h1 class="font-bold text-lg mb-3">Actors squad</h1>
    <div class="flex items-center justify-center gap-16 flex-wrap text-center">
        <FilmCarouselCast :authors="credits.cast" />
    </div>
    <h1 class="font-bold text-lg mb-3">Crew squad</h1>
    <div class="flex items-center justify-center gap-16 flex-wrap text-center">
        <FilmCarouselCrew :authors="credits.crew.slice(0, 20)" />
    </div>
</template>

