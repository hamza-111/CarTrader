<script setup>
    const props = defineProps({
        listing : Object
    })
    
</script>
<template>
    <div class="shadow rounded flex justify-between mb-4 overflow-hidden">
        <div class="flex">
            <img :src="listing.url" alt="" class="w-80 h-44 mr-3">
            <div class="p-3">
                <h1 class="text-2xl">{{ listing.name }}</h1>
                <p class="text-blue-400">${{ listing.price }}</p>
            </div>
        </div>
        <div class="p-3 flex">
            <NuxtLink :to="`/profile/listings/view/${listing.id}`">view</NuxtLink>
            <p class="cursor-pointer text-red-400">Delete</p>
        </div>
    </div>
</template>