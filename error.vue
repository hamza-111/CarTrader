<script setup>
const error = useError()
const handelError = () => {
    clearError({
      redirect:'/'
    })
}
</script>
<template>
    <div class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <h1 class="text-9xl font-bold text-gray-900">{{ error.statusCode }}</h1>
        <p class="text-9xl text-gray-600">{{ error.message }}</p>
        <button @click="handelError" class="bg-blue-500 rounded text-white mt-7 text-2xl px-7 py-2">Go back</button>
      </div>
    </div>
  </template>
  