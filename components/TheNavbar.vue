<template>
    <div class="w-full max-h-[100px] py-5 px-24 shadow-2xl bg-secondary-color text-white flex items-center justify-between">
        <img src="~/assets/images/klyutko-logo.svg" alt="klyutko-logo" class="cursor-pointer max-h-[80px]"
            @click="$router.push('/')">
        <nav class="flex max-sm:hidden">
            <NuxtLink to="/" active-class="text-hover-color"
                class="text-2xl flex items-center space-x-5 hover:bg-gray-color cursor-pointer p-3 rounded-lg duration-200">
                <Icon name="material-symbols:android-google-home" class="text-3xl" />
            </NuxtLink>
            <div class="flex items-center justify-center">
                <NuxtLink to="/search" active-class="text-hover-color"
                    class="text-2xl flex items-center space-x-5 hover:bg-gray-color cursor-pointer p-3 rounded-lg duration-200">
                    <Icon name="ic:sharp-search" class="text-3xl" />
                </NuxtLink>
                <NuxtLink to="/bookmarks" active-class="text-hover-color"
                    class="text-2xl flex items-center space-x-5 hover:bg-gray-color cursor-pointer p-3 rounded-lg duration-200">
                    <Icon name="bi:bookmark-heart-fill" class="text-3xl" />
                </NuxtLink>
            </div>
        </nav>
        <nav class="hidden max-sm:block">

        </nav>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>