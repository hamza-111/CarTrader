<script setup>
  const {cars} = useCars()
  import heartFilled from '@/assets/heartFilled.png'
  import heartOutline from '@/assets/heartOutline.png'

  const favorite = useLocalStorage("favorite", {})
  const handlerFavorite = (id)=> {
    if(id in favorite.value) {
      delete favorite.value[id];
    }
    else {
      favorite.value = {
        ...favorite.value,
        [id]:true
      }
    }
  }

</script>
<template>
    <div>
      <!-- CAR CARDS -->
      <div class="w-full">
        <!-- CAR CARD -->
        <ClientOnly>
          <div  v-for="car in cars" :key="car.id"
                  class="relative shadow border w-full overflow-hidden mb-5 cursor-pointer h-[200px]"
                >
                <img :src="favorite[car.id] ? heartFilled : heartOutline" alt="" class="absolute w-7 right-5 top-2 z-20" @click="handlerFavorite(car.id)" />
                  <div class="flex h-full">
                    <NuxtImg
                      :src="car.url"
                      alt=""
                      class="w-[300px] h-full"
                    />
                    <div class="p-4 flex flex-col"  @click="navigateTo(`/cars/${car.name}-${car.id}`)">
                      <div>
                        <h1 class="text-2xl text-blue-700">{{car.name}}</h1>
                        <p class="text-gray-700">
                          {{car.description}}
                        </p>
                      </div>
                      <h1 class="mt-auto text-xl">${{car.price}}</h1>
                    </div>
                  </div>
                </div>
        </ClientOnly>
        <!-- CAR CARD -->
      </div>
      <!-- CAR CARDS -->
    </div>
</template>