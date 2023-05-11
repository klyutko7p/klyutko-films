<script setup lang="ts">
defineProps({
    reviews: { type: Array as PropType<Review[]>, required: true },
})
const IMG_URL = "http://image.tmdb.org/t/p/original"

function getURL(url: string) {
    if (url.includes("https")) {
        return url.slice(1)
    } else return IMG_URL + url
}

</script>

<template>
    <div class="mt-10" v-if="reviews.length > 0">
        <div class="mb-5 flex items-center gap-3">
            <h1 class="text-white text-2xl font-bold">Reviews</h1>
            <Icon name="material-symbols:rate-review-outline" size="32px" class="text-hover-color" />
        </div>
        <div v-for="review in reviews" class="mb-10 border-2 border-hover-color rounded-2xl p-10">
            <div class="flex items-center justify-between max-sm:block border-b-2 border-hover-color">
                <div class="flex items-center gap-3">
                    <div :style="{
                            backgroundImage: `url('${review.author_details.avatar_path ? getURL(review.author_details.avatar_path) : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}')`
                        }" class="w-[90px] mb-3 bg-cover bg-center h-[90px] rounded-[50%]">
                    </div>
                    <div>
                        <h1 class="font-bold text-2xl">{{ review.author }}</h1>
                        <h1 v-if="review.author_details.rating" class="text-2xl"><span class="text-hover-color font-bold">
                                {{
                                    review.author_details.rating }}</span> of 10
                        </h1>
                    </div>
                </div>
                <hr>
                <div class="text-lg">
                    <h1>{{ new Date(review.created_at).toLocaleDateString("en-EN",
                        { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }) }}</h1>
                    <a target="_blank" class="hover:text-hover-color duration-200 font-bold" :href="review.url">Check for
                        full review</a>
                </div>
            </div>
            <h1 class="whitespace-pre-line mt-5 text-lg">{{ review.content }}</h1>
        </div>
    </div>
</template>
