import { defineStore } from "pinia";

export const useCollectionsStore = defineStore("collections", () => {
  const urlLink = "https://api.themoviedb.org/3/collection/";
  const API_KEY = "?api_key=a0620608f8e0ad4da9adb563a7f5a2d5";

  let collection = ref();

  async function fetchCollectionById(id: number) {
    let { data: collectionData } = await useFetch(
      urlLink + id + API_KEY + "&language=en-ENG"
    );
    collection.value = collectionData.value;
  }

  function getAVG(films: Array<Film>) {
    films = films.filter((film) => film.vote_average > 0);
    return films
      .reduce((acc, val) => acc + val.vote_average / films.length, 0)
      .toFixed(1);
  }

  const getCollection = computed(() => collection.value);

  return { fetchCollectionById, getCollection, getAVG };
});
