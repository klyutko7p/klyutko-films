import { defineStore } from "pinia";

export const useFilmsStore = defineStore("films", () => {
  const urlLink = "https://api.themoviedb.org/3/movie/";
  const API_KEY = "?api_key=a0620608f8e0ad4da9adb563a7f5a2d5";

  let popularFilms = ref();
  let ratedFilms = ref();
  let upcomingFilms = ref();
  let nowPlayingFilms = ref();
  let film = ref();

  async function fetchCompilationFilms() {
    let { data: popularData } = await useFetch(
      urlLink + "popular" + API_KEY + "&language=en-US"
    );
    let { data: ratedData } = await useFetch(
      urlLink + "top_rated" + API_KEY + "&language=en-US"
    );
    let { data: upcomingData } = await useFetch(
      urlLink + "upcoming" + API_KEY + "&language=en-US"
    );
    let { data: nowPlayingData } = await useFetch(
      urlLink + "now_playing" + API_KEY + "&language=en-US"
    );
    popularFilms.value = popularData.value;
    ratedFilms.value = ratedData.value;
    upcomingFilms.value = upcomingData.value;
    nowPlayingFilms.value = nowPlayingData.value;
  }

  async function fetchFilmById(id: number) {
    let { data: filmData } = await useFetch(
      urlLink + id + API_KEY + "&language=en-US"
    );
    film.value = filmData.value;
  }

  const getPopularFilms = computed(() => popularFilms.value.results);
  const getRatedFilms = computed(() => ratedFilms.value.results);
  const getUpcomingFilms = computed(() => upcomingFilms.value.results);
  const getNowPlayingFilms = computed(() => nowPlayingFilms.value.results);
  const getFilmById = computed(() => film.value);

  return {
    fetchCompilationFilms,
    fetchFilmById,
    getRatedFilms,
    getUpcomingFilms,
    getNowPlayingFilms,
    getPopularFilms,
    getFilmById,
  };
});
