<script setup>
    definePageMeta({
        layout : 'custom',
    })
    const route = useRoute()
    const {data:messages } = await useFetch(`/api/car/listings/${route.params.id}/message`)
</script>
<template>
    <div class="rounder shadow mt-20">
        <div>
            <messageCard v-for="message in messages" :key="message.id" :message="message"></messageCard>
        </div>
    </div>
</template>