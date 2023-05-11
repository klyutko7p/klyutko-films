<template>
    <swiper :effect="'cards'" :grabCursor="true" :modules="modules"
        class="max-w-[320px] max-sm:max-w-[200px] max-sm:h-[300px] h-[420px]">
        <swiper-slide v-for="image in images.profiles" v-if="images.profiles.length > 0">
            <img :src="IMG_URL + image.file_path" loading="lazy" alt="">
        </swiper-slide>
        <swiper-slide v-else>
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                class="h-full w-full" alt="">
        </swiper-slide>
    </swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/effect-cards'

import { EffectCards } from 'swiper'
let modules = [EffectCards]
const IMG_URL = "http://image.tmdb.org/t/p/original"

defineProps({
    images: { type: Object as PropType<Image>, required: true },
})

</script>

<style scoped>
.swiper-slide {
    border-radius: 18px;
    font-size: 22px;
    font-weight: bold;
    color: #fff;
}
</style>