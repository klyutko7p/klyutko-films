import { defineStore } from "pinia";

export const useReviewsStore = defineStore("reviews", () => {
  const urlLink = "https://api.themoviedb.org/3/movie/";
  const API_KEY = "?api_key=a0620608f8e0ad4da9adb563a7f5a2d5";

  let reviews = ref();

  async function fetchReviewsById(id: number) {
    let { data: reviewsData } = await useFetch(
      urlLink + id + "/reviews" + API_KEY + "&language=en-US"
    );
    reviews.value = reviewsData.value;
  }

  const getReviews = computed(() => reviews.value.results);

  return { fetchReviewsById, getReviews };
});
