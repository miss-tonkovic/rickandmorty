<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";
import CardComponent from "./CardComponent.vue";

const photos = ref([]);
const page = ref(1);

const loading = ref(false);
const loadMoreButton = ref(null);
const isButtonVisible = ref(false);

const fetchPhotos = async () => {
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character?page=${page.value}`
    );
    photos.value = [...photos.value, ...response.data.results];
    page.value++;
  } catch (error) {
    console.error("Error fetching photos:", error);
  }
};

const loadMore = async () => {
  loading.value = true;
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character?page=${page.value}`
    );
    photos.value = [...photos.value, ...response.data.results];
    page.value++;
  } catch (error) {
    console.error("Error fetching photos:", error);
  } finally {
    loading.value = false;
  }
};

const observer = new IntersectionObserver((entries) => {
  const entry = entries[0];
  if (entry.isIntersecting) {
    isButtonVisible.value = true;
  } else {
    isButtonVisible.value = false;
  }
});

const handleScroll = () => {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.scrollY;

  if (windowHeight + scrollTop >= documentHeight - 100 && !loading.value) {
    loadMore();
  }
};

onMounted(() => {
  fetchPhotos();
  observer.observe(loadMoreButton.value);
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
  >
    <CardComponent v-for="photo in photos" :key="photo.id" :photo="photo" />
  </div>
  <button
    ref="loadMoreButton"
    @click="loadMore"
    class="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
    v-if="!loading"
  >
    Load More
  </button>

  <div v-if="loading" class="text-center py-4">
    <p>Loading...</p>
  </div>
</template>
