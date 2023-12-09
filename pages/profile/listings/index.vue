<script setup>
definePageMeta({
  layout: "custom",
});
//const { listings } = useCars();
const user = useSupabaseUser()
const {data:listings} = await useFetch(`/api/car/listings/user/${user.value.id}`)
const handelDelete = async (id) => {
    await $fetch(`/api/car/listings/${id}`, {
        method : "delete"
    })
    listings.value = listings.value.filter((listing) => listing.id !== id)
    //refresh()
}
</script>
<template>
  <div>
    <div class="flex justify-between items-center mt-24">
      <h1 class="text-6xl">My listings</h1>
      <NuxtLink
        to="/profile/listings/create"
        class="w-9 h-9 bg-blue-400 flex justify-center items-center rounded-full text-white font-bold cursor-pointer"
        >+</NuxtLink
      >
    </div>

    <div class="shadow rounded p-3 mt-5">
      <car-listings
        v-for="listing in listings"
        :key="listing.id"
        :listing="listing"
        @deleteCar="handelDelete"
      ></car-listings>
    </div>
  </div>
</template>
