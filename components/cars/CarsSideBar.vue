<script setup>
const {makes} = useCars()
const route = useRoute()
const router = useRouter()
const modal = ref({
  make : false,
  location : false,
  price : false
})
const priceRange = ref({
  min:"",
  max:""
})
const priceRangeText = computed(()=> {
  const minPrice = route.query.minPrice
  const maxPrice = route.query.maxPrice
  if(!minPrice && !maxPrice) return 'Any'
  else if(!minPrice && maxPrice) return `<$${maxPrice}`
  else if(minPrice && !maxPrice) return `>$${minPrice}`
  else if(minPrice && maxPrice) return `$${minPrice}-$${maxPrice}`
})
const city = ref("")
  const updateModal= (key)=> {
    return modal.value[key] = !modal.value[key]
  }
  const handelLocation = ()=> {
    if(!city.value) return
    if(!isNaN(parseInt(city.value))) {
      throw createError({
        statusCode:400,
        message:`${city.value} is not a valid city`
      })
    }
      navigateTo(`/city/${city.value}/car/${route.params.make}`)
  }
  const handelMake = (make)=> {
    updateModal("make")
    navigateTo(`/city/${route.params.city}/car/${make}`)
  }
  const handelPrice = ()=> {
    updateModal("price")
    if(priceRange.value.min && priceRange.value.max) {
      if(priceRange.value.min > priceRange.value.max) return
    }
    router.push({
      query: {
        minPrice : priceRange.value.min,
        maxPrice : priceRange.value.max
      }
    })
    
  }

</script>
<template>
         <!-- CAR SIDE BAR -->
         <div class="shadow border w-64 mr-10 z-30 h-[190px]">
        <div class="p-5 flex justify-between relative cursor-pointer border-b">
          <h3>Location</h3>
          <h3 class="text-blue-400 capitalize" @click="updateModal('location')">{{route.params.city}}</h3>
          <div class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white" v-if="modal.location">
            <input type="text" class="border p-1 rounded" v-model="city" />
            <button @click="handelLocation" class="bg-blue-400 w-full mt-2 rounded text-white p-1">
              Apply
            </button>
          </div>
        </div>
  
        <div class="p-5 flex justify-between relative cursor-pointer border-b">
          <h3>Make</h3>
          <h3 class="text-blue-400 capitalize" @click="updateModal('make')">{{$route.params.make || "Any"}}</h3>
          <div v-if="modal.make" class="absolute shadow border left-56 p-5 top-1 w-[600px] bg-white -m-1 flex justify-between flex-wrap">
            <h4 class="w-1/3" v-for="make in makes" :key="make" @click="handelMake(make)">{{ make }}</h4>
          </div>
        </div>
  
        <div class="p-5 flex justify-between relative cursor-pointer border-b">
          <h3>Price</h3>
          <h3  @click="updateModal('price')" class="text-blue-400 capitalize">{{ priceRangeText }}</h3>
        <div class="absolute shadow border left-56 p-5 top-1 bg-white -m-1" v-if="modal.price">
          <input class="border p-1 rounded mb-3" type="number" placeholder="MIN" v-model="priceRange.min" />
          <input class="border p-1 rounded" type="number" placeholder="MAX" v-model="priceRange.max" />
          <button @click="handelPrice" class="bg-blue-400 w-full mt-2 rounded text-white p-1">Apply</button>

        </div>
        </div>
      </div>
      <!-- CAR SIDE BAR --> 
</template>