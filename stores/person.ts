import { defineStore } from "pinia";

export const usePersonsStore = defineStore("persons", () => {
  const urlLink = "https://api.themoviedb.org/3/person/";
  const API_KEY = "?api_key=a0620608f8e0ad4da9adb563a7f5a2d5";

  let person = ref();
  let filmsCredits = ref();
  let images = ref();
  let popularFilms = ref();
  let social = ref();

  async function fetchPersonById(id: number) {
    let { data: personData } = await useFetch(
      urlLink + id + API_KEY + "&language=en-US"
    );
    let { data: filmsCreditsData } = await useFetch(
      urlLink + id + "/movie_credits" + API_KEY + "&language=en-US"
    );
    let { data: imagesData } = await useFetch(
      urlLink + id + "/images" + API_KEY + "&language=en-US"
    );
    let { data: socialData } = await useFetch(
      urlLink + id + "/external_ids" + API_KEY + "&language=en-US"
    );
    social.value = socialData.value;
    filmsCredits.value = filmsCreditsData.value;
    images.value = imagesData.value;
    person.value = personData.value;
  }

  const getPerson = computed(() => person.value);
  const getPersonFilmsCredits = computed(() => filmsCredits.value);
  const getPersonImages = computed(() => images.value);
  const getPersonSocial = computed(() => social.value);

  return {
    fetchPersonById,
    getPerson,
    getPersonFilmsCredits,
    getPersonImages,
    getPersonSocial,
  };
});
