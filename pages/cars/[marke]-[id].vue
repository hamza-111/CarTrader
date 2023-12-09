<script setup>
const route = useRoute()
const { toTitleCase } = useUtilities()
useHead({
    title : toTitleCase(route.params.marke)
})
// const {cars} = useCars()
// const car = computed((c)=> {
//     return cars.find((c)=> {
//         return c.id === parseInt(route.params.id)
//     })
// })

// if(!car.value) {
//     throw createError({
//         statusCode : 404,
//         message: `There is no car with ID ${route.params.id}`,
//     })
// }

const {data:car} = await useFetchCar(route.params.id)

definePageMeta({
    layout:"custom"
})
</script>
<template>
    <div v-if="car">
        <cars-details :car="car"></cars-details>
    </div>
</template>