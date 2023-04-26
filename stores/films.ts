import { defineStore } from "pinia";

export const useFilmsStore = defineStore("films", () => {
  const urlLink = "https://api.themoviedb.org/3/movie";
  const API_KEY = "?api_key=a0620608f8e0ad4da9adb563a7f5a2d5";

  let popularFilms = ref();
  let ratedFilms = ref();
  let upcomingFilms = ref();
  let nowPlayingFilms = ref();

  async function fetchPopularFilms() {
    let { data } = await useFetch(
      urlLink + "/popular" + API_KEY + "&language=en-US"
    );
    popularFilms.value = data.value;
  }

  const getPopularFilms = computed(() => popularFilms.value.results);

  return { fetchPopularFilms, getPopularFilms };
});
