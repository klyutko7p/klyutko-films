import { defineStore } from "pinia";

export const useGenresStore = defineStore("genres", () => {
  const urlLink = "https://api.themoviedb.org/3/genre/movie/list";
  const API_KEY = "?api_key=a0620608f8e0ad4da9adb563a7f5a2d5";

  let genres = ref();

  async function fetchGenres() {
    let { data } = await useFetch(urlLink + API_KEY + "&language=en-US");
    genres.value = data.value;
  }

  const getGenres = computed(() => genres.value.genres);

  return { fetchGenres, getGenres };
});
