
<script setup>
const props = defineProps({
    listing : Object
})
const config = useRuntimeConfig()
const emits = defineEmits(["deleteCar"])
</script>
<template>
    <div class="shadow rounded flex justify-between mb-4 overflow-hidden">
        <div class="flex">
            <img :src="`${config.public.supabase.url}/storage/v1/object/public/images/${listing.image}`" alt="" class="w-80 h-44 mr-3">
            <div class="p-3">
                <h1 class="text-2xl">{{ listing.name }}</h1>
                <p class="text-blue-400">${{ listing.price }}</p>
            </div>
        </div>
        <div class="p-3 flex">
            <NuxtLink class="text-blue-400 mr-4" :to="`/profile/listings/view/${listing.id}`">view</NuxtLink>
            <p  @click="emits('deleteCar', listing.id)" class="cursor-pointer text-red-400">Delete</p>
        </div>
    </div>
</template>