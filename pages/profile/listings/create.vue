<script setup>
    definePageMeta({
        layout:'custom',
    })
    const user = useSupabaseUser()
    const supabase = useSupabaseClient()
    
    const {makes} = useCars()
    const info = useState('adInfo', ()=> {
        return {
            make : '',
            model : '',
            year:'',
            mile:'',
            price:'',
            city:'',
            seats:'',
            features:'',
            description:'',
            image:null
        }
    })
    const onchangeInput = (data, name)=> {
        info.value[name] = data
    }
    const inputs = [
        {
            id : 1,
            title:"Model *",
            name : "model",
            placeholder : "civic"

        },
        {
            id : 2,
            title : "Year *",
            name : "year",
            placeholder : "2019"

        },
        {
            id : 3,
            title : "Price *",
            name : "price",
            placeholder : "10000 €"

        },
        {
            id : 4,
            title : "Miles *",
            name : "mile",
            placeholder : "10000"

        },
        {
            id : 5,
            title : "City",
            name : "city",
            placeholder : "Tunisia"

        },
        {
            id : 6,
            title : "Number of Seats *",
            name : "seats",
            placeholder : "5"

        },
        {
            id : 7,
            title : "Features *",
            name : "features",
            placeholder : "Leather interior no accidens",

        },
    ]

    const isDisabled = computed(()=> {
        for(let key in info.value) {
            if(!info.value[key]) {
                return true
            }
        }
        return false
    })
    const errorMessage = ref("")
    const handelSubmit = async ()=> {
        const fileName = Math.floor(Math.random() * 100000000000000)
        const {data, error} = await supabase.storage.from("images").upload("public/" + fileName, info.value.image)
        if(error) {
            return errorMessage.value = "can not upload the image"
        }
        const body = {
            ...info.value,
            city : info.value.city.toLowerCase(),
            features : info.value.features.split(", "),
            numberOfSeat : parseInt(info.value.seats),
            mile : parseInt(info.value.mile),
            year : parseInt(info.value.year),
            price : parseInt(info.value.price),
            name: `${info.value.make} ${info.value.model}`,
            listerId : user.value.id,
            image : data.path
        }

        delete body.seats
        try {
            const response = await $fetch("/api/car/listings", {
                method : "post",
                body
            })
            navigateTo('/profile/listings')
        } catch (err) {
            errorMessage.value = err.statusMessage
            await supabase.storage.from("images").remove(data.path)
        }
    }
</script>
<template>
    <div class="">
        <div class="mt-24">
            <h1 class="text-6xl mt-24">Create new listing {{ user.id }}</h1>
        </div>
        <div class="shadow rounded p-3 mt-5 flex flex-wrap justify-between">
            <carsAdSelect :options="makes" title="Make *" name="make" @change-input="onchangeInput"></carsAdSelect>
            <carsAdInput v-for="input in inputs" :key="input.id" :title="input.title" :name="input.name" :placeholder="input.placeholder" @change-input="onchangeInput" />
        </div>
        <div class="shadow rounded p-3 mt-5 flex flex-wrap justify-between">
            <carsAdTextarea title="Description *" name="description" @change-input="onchangeInput" />
        </div>
        <div class="shadow rounded p-3 mt-5 flex flex-wrap justify-between">
            <carsAdImage @change-input="onchangeInput" />
        </div>
        <div>
            <button class="bg-blue-400 rounded text-white py-2 px-7 mt-3" @click="handelSubmit" :disabled="isDisabled">Submit</button>
            <p v-if="errorMessage" class="mt-3 text-red-500">{{ errorMessage }}</p>
        </div>
    </div> 
</template>