<script setup lang="ts">

let sort = ref('popularity.desc')


</script>

<template>
    <div>
        <div class="flex items-center gap-3">
            <h1 class="text-2xl font-bold">Sort</h1>
            <Icon name="ic:baseline-keyboard-arrow-down" size="32px" />
        </div>
        <div>
            <select v-model="sort"
                class="w-full text-xl bg-transparent border-2 text-black border-hover-color mb-3 mt-3 rounded-full p-3">
                <option value="popularity.desc" selected>Popularity +</option>
                <option value="popularity.asc" selected>Popularity -</option>
                <option value="release_date.desc" selected>
                    Release date +
                </option>
                <option value="release_date.asc" selected>
                    Release date -
                </option>
                <option value="revenue.desc" selected>Revenue +</option>
                <option value="revenue.asc" selected>Revenue -</option>
                <option value="vote_average.desc" selected>
                    Vote average +
                </option>
                <option value="vote_average.asc" selected>
                    Vote average -
                </option>
                <option value="original_title.desc" selected>
                    Title (A-Z)
                </option>
                <option value="original_title.asc" selected>Title (Z-A)</option>
            </select>
        </div>
        <div>
            <div class="flex items-center gap-3">
                <h1 class="text-2xl font-bold">Filters</h1>
                <Icon name="ic:baseline-keyboard-arrow-down" size="32px" />
            </div>
        </div>
    </div>
</template>
