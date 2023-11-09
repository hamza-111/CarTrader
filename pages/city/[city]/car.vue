
<script setup>
  const route = useRoute();
  const {toTitleCase} = useUtilities()
  useHead({
      title: `${route.params.make ? toTitleCase(route.params.make):'Cars'} in ${toTitleCase(route.params.city)}`
  });
  definePageMeta({
      layout:"custom"
  })
</script>
<template>
    <div>
    <!-- CARS PAGE -->
    <div class="mt-32 flex">
      <NuxtErrorBoundary>
        <!-- CAR SIDE BAR -->
      <CarsSideBar></CarsSideBar>
      <!-- CAR SIDE BAR -->
  
      <!-- CAR CARDS -->
      <div class="w-full">
        <!-- CAR CARD -->
        <NuxtPage />
        <!-- CAR CARD -->
      </div>
      <!-- CAR CARDS -->
      <template #error="{error}">
        <div class="text-center mx-auto flex flex-col">
          <h1 class="text-3xl font-bold mb-4">Sorry, somthing went rong</h1>
          <code>{{ error }}</code>
          <button @click="error.value = null" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4">Go back</button>
        </div>
      </template>

      </NuxtErrorBoundary>
    </div>
  </div>
  <!-- CARS PAGE -->  
</template>