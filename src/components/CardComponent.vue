<script setup>
import { defineProps } from "vue";

defineProps({
  photo: {
    type: Object,
    required: true,
  },
});

const convertToNormalDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
};
</script>
<template>
  <div class="mb-4 p-4 bg-white rounded-lg shadow-md">
    <img
      :src="photo.image"
      :alt="photo.name"
      class="w-full h-auto rounded-md"
    />
    <h2 class="text-xl font-semibold">{{ photo.name }}</h2>
    <p>Status: {{ photo.status }}</p>
    <p>Created: {{ convertToNormalDate(photo.created) }}</p>
    <p>Location: {{ photo.location.name }}</p>
  </div>
</template>
