import { defineStore } from "pinia";

export const useCreditsStore = defineStore("credits", () => {
  const urlLink = "https://api.themoviedb.org/3/movie/";
  const API_KEY = "?api_key=a0620608f8e0ad4da9adb563a7f5a2d5";

  let credits = ref();

  async function fetchCreditsById(id: number) {
    let { data: creditsData } = await useFetch(
      urlLink + id + "/credits" + API_KEY + "&language=en-ENG"
    );
    credits.value = creditsData.value;
  }

  const getCredits = computed(() => credits.value);

  return { fetchCreditsById, getCredits };
});
