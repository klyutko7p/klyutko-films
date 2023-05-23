<script setup lang="ts">
let isActivatedBurgerMenu = ref(false)
</script>

<template>
    <div
        class="w-full border-b-2 border-hover-color z-10 max-h-[100px] py-5 px-24 shadow-2xl bg-secondary-color text-white flex items-center justify-between max-sm:space-x-5 max-sm:px-3">
        <img src="~/assets/images/klyutko-logo.svg" alt="klyutko-logo" class="cursor-pointer max-h-[80px]"
            @click="$router.push('/')">
        <nav class="flex max-md:hidden">
            <NuxtLink to="/" active-class="text-hover-color"
                class="text-2xl flex items-center space-x-5 hover:bg-gray-color cursor-pointer p-3 rounded-lg duration-200">
                <Icon name="material-symbols:android-google-home" class="text-3xl" />
            </NuxtLink>
            <div class="flex items-center justify-center">
                <NuxtLink to="/search" active-class="text-hover-color"
                    class="text-2xl flex items-center space-x-5 hover:bg-gray-color cursor-pointer p-3 rounded-lg duration-200">
                    <Icon name="ic:sharp-search" class="text-3xl" />
                </NuxtLink>
                <NuxtLink to="/filters" active-class="text-hover-color"
                    class="text-2xl flex items-center space-x-5 hover:bg-gray-color cursor-pointer p-3 rounded-lg duration-200">
                    <Icon name="ic:baseline-filter-alt" class="text-3xl" />
                </NuxtLink>
                <NuxtLink to="/bookmarks" active-class="text-hover-color"
                    class="text-2xl flex items-center space-x-5 hover:bg-gray-color cursor-pointer p-3 rounded-lg duration-200">
                    <div>
                        <Icon name="bi:bookmark-heart-fill" class="text-3xl relative" />
                    </div>
                </NuxtLink>
            </div>
        </nav>
        <nav class="hidden max-md:block">
            <div class="max-lg:block hidden space-y-2" v-if="!isActivatedBurgerMenu" @click="isActivatedBurgerMenu = true"
                data-aos="flip-down">
                <div class="w-8 h-1 bg-white"></div>
                <div class="w-8 h-1 bg-white"></div>
                <div class="w-8 h-1 bg-white"></div>
            </div>
            <div v-if="isActivatedBurgerMenu">
                <div class="max-lg:block hidden space-y-2">
                    <h1 @click="isActivatedBurgerMenu = false" data-aos="flip-down" class="text-5xl">
                        X
                    </h1>
                </div>
                <div data-aos="fade-right"
                    class="fixed bg-primary-color top-0 gradient-border-r left-0 h-full w-1/2 z-10 flex flex-col items-center justify-center gap-16 text-center p-5">
                    <img src="~/assets/images/klyutko-logo.svg" @click="$router.push('/'), isActivatedBurgerMenu = false"
                        class="cursor-pointer w-full h-16" alt="" />
                    <NuxtLink @click="isActivatedBurgerMenu = false" to="/search" active-class="text-hover-color"
                        class="text-2xl flex items-center space-x-5 hover:bg-gray-color cursor-pointer p-3 rounded-lg duration-200">
                        <h1>Search</h1>
                        <Icon name="ic:sharp-search" class="text-3xl" />
                    </NuxtLink>
                    <NuxtLink @click="isActivatedBurgerMenu = false" to="/filters" active-class="text-hover-color"
                        class="text-2xl flex items-center space-x-5 hover:bg-gray-color cursor-pointer p-3 rounded-lg duration-200">
                        <h1>Filters</h1>
                        <Icon name="ic:baseline-filter-alt" class="text-3xl" />
                    </NuxtLink>
                    <NuxtLink @click="isActivatedBurgerMenu = false" to="/bookmarks" active-class="text-hover-color"
                        class="text-2xl flex items-center space-x-5 hover:bg-gray-color cursor-pointer p-3 rounded-lg duration-200">
                        <h1>Favorites</h1>
                        <Icon name="bi:bookmark-heart-fill" class="text-3xl relative" />
                    </NuxtLink>
                    <h1 class="uppercase mr-10 text-center">© developed by Daniel klyutko</h1>
                </div>
            </div>
        </nav>
    </div>
</template>



<style scoped></style>