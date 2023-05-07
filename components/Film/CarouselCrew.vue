<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
const IMG_URL = "http://image.tmdb.org/t/p/w500"

function getMainAuthors(crew: Array<Crew>) {
    return crew.sort((a, b) => a.popularity < b.popularity ? 1 : -1)
}

defineProps({
    authors: { type: Array as PropType<Crew[]>, required: true }
})
</script>

<template>
    <swiper :slidesPerView="7" :spaceBetween="10" class="mySwiper mb-10">
        <swiper-slide v-for="author in getMainAuthors(authors)">
            <div :style="{
                    backgroundImage: `url('${author.profile_path ? IMG_URL + author.profile_path : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}')`
                }" class="w-[110px] bg-cover bg-center h-[110px] border-2 border-white mx-auto rounded-[50%]">
            </div>
            <div>
                <h1 class="text-lg">{{ author.name }}</h1>
                <h1 class="text-base text-gray-500">{{ author.job ? author.job : "-" }}</h1>
            </div>
        </swiper-slide>
    </swiper>
</template>
