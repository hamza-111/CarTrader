<script setup>
    const city = ref("")
    const cityError = ref(false)
    //const router = useRouter()
    const handelRouter = () => {
        if(!city.value) {
            cityError.value = true
            return
        }
        //router.push(`/city/${city.value}/car`)
        navigateTo(`/city/${city.value}/car`)
    }
    const handleInput = () => {
        cityError.value = false; // Reset the error when user starts typing again
    }
</script>
<template>
            <div class="font-serif w-[1000px] rounded-full text-2xl bg-white flex justify-between overflow-hidden drop-shadow-2xl mx-auto">
            <input @input="handleInput" :class="cityError ? 'border-b-red-500 border-b-4' : ''" v-model="city" type="text" class="py-3 px-4 w-full text-2xl rounded-full focus:outline-none" placeholder="search by serie...">
            <button class="bg-sky-500 px-10 text-white" @click="handelRouter">Search</button>
          </div>
</template>