<script setup>
    const props = defineProps({
        title : String,
        name : String,
        placeholder : String
    });
    const emits = defineEmits(['changeInput'])
    const selected = ref()
    const onChange = () => {
        emits('changeInput', selected.value, props.name);
    }
</script>
<template>
    <div class="flex flex-col w-[48%] mt-2">
        <label for="" class="text-cyan-500 mb-1 text-sm">{{ title }}</label>
        <input type="text" class="p-2 border w-100 rounded" :placeholder="placeholder" :name="name" @input="onChange" v-model="selected" />
    </div>
</template>