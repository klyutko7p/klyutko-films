import { defineStore } from "pinia";

export const useVideosStore = defineStore("videos", () => {
  const urlLink = "https://api.themoviedb.org/3/movie/";
  const API_KEY = "?api_key=a0620608f8e0ad4da9adb563a7f5a2d5";

  let videos = ref();

  async function fetchVideosById(id: number) {
    let { data: videosData } = await useFetch(
      urlLink + id + "/videos" + API_KEY + "&language=en-US"
    );
    videos.value = videosData.value;
  }

  const getVideos = computed(() => videos.value.results);

  return { fetchVideosById, getVideos };
});
