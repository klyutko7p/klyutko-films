<script setup lang="ts">
defineProps({
    videos: { type: Array as PropType<Video[]>, required: true },
})
let YOUTUBE_URL = "https://www.youtube.com/embed/"

</script>

<template>
    <div class="mt-10" v-if="videos.length > 0">
        <div class="mb-5 flex items-center gap-3">
            <h1 class="text-white text-2xl font-bold">Official Trailer</h1>
            <Icon name="iconoir:cinema-old" size="32px" class="text-hover-color" />
        </div>
        <div>
            <div v-for="video in videos.filter(item => item.official === true || item.type === 'Trailer').slice(0, 1)">
                <iframe width="100%" height="600px" :src="YOUTUBE_URL + video.key" frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                </iframe>
            </div>
        </div>
    </div>
</template>
