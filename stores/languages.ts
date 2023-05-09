import { defineStore } from "pinia";

export const useLanguagesStore = defineStore("languages", () => {
  const urlLink = "https://api.themoviedb.org/3/configuration/languages";
  const API_KEY = "?api_key=a0620608f8e0ad4da9adb563a7f5a2d5";

  let languages = ref();

  async function fetchLanguages() {
    let { data } = await useFetch(urlLink + API_KEY);
    languages.value = data.value;
  }

  const getLanguages = computed(() => languages.value);

  return { fetchLanguages, getLanguages };
});
