import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
const toast = useToast();

export const useFilmsStore = defineStore("films", () => {
  const urlLink = "https://api.themoviedb.org/3/movie/";
  const urlLinkSearch = "https://api.themoviedb.org/3/search/movie";
  const API_KEY = "?api_key=a0620608f8e0ad4da9adb563a7f5a2d5";

  let popularFilms = ref();
  let ratedFilms = ref();
  let upcomingFilms = ref();
  let nowPlayingFilms = ref();
  let film = ref();
  let recommendationsFilms = ref();
  let searchedFilms = ref();
  let favoritesFilms = ref<Array<Film>>([]);
  let page = ref(1);

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
    let { data: recommendationsData } = await useFetch(
      urlLink + id + "/recommendations" + API_KEY + "&language=en-US"
    );
    film.value = filmData.value;
    recommendationsFilms.value = recommendationsData.value;
  }

  function setFavoriteFilms(film: Film) {
    if (favoritesFilms.value.includes(film)) {
      toast.error(`You already add ${film.title}`);
    } else {
      favoritesFilms.value.push(film);
      toast.success(`You add ${film.title}`);
    }
  }

  async function loadMoreSearchFilms(query: string) {
    page.value += 1;
    let { data: filmsData } = await useFetch(
      urlLinkSearch +
        API_KEY +
        "&language=en-US" +
        `&query=${query}` +
        "&include_adult=false",
      {
        params: {
          page: page.value,
        },
      }
    );
    searchedFilms.value = searchedFilms.value.concat(filmsData.value.results);
  }

  async function searchFilmsByQuery(query: string) {
    let { data: filmsData } = await useFetch(
      urlLinkSearch +
        API_KEY +
        "&language=en-US" +
        `&query=${query}` +
        "&include_adult=false"
    );
    searchedFilms.value = filmsData.value.results;
  }

  function removeFavoriteFilm(film: Film) {
    favoritesFilms.value.forEach((filmObj, index) => {
      if (filmObj.id === film.id) {
        favoritesFilms.value.splice(index, 1);
        toast.warning(`You remove ${film.title}`);
      }
    });
  }

  const getPopularFilms = computed(() => popularFilms.value.results);
  const getRatedFilms = computed(() => ratedFilms.value.results);
  const getUpcomingFilms = computed(() => upcomingFilms.value.results);
  const getNowPlayingFilms = computed(() => nowPlayingFilms.value.results);
  const getFilmById = computed(() => film.value);
  const getRecommendationsFilms = computed(
    () => recommendationsFilms.value.results
  );
  const getFavoritesFilms = computed(() => favoritesFilms.value);
  const getSearchedFilms = computed(() => searchedFilms.value);

  return {
    fetchCompilationFilms,
    fetchFilmById,
    setFavoriteFilms,
    removeFavoriteFilm,
    loadMoreSearchFilms,
    searchFilmsByQuery,
    getRatedFilms,
    getUpcomingFilms,
    getNowPlayingFilms,
    getPopularFilms,
    getFilmById,
    getRecommendationsFilms,
    getFavoritesFilms,
    getSearchedFilms,
  };
});
