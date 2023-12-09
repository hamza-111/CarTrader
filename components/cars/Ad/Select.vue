<script setup>
    const props = defineProps({
        title : String,
        name : String,
        options : Array
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
        <select  v-model="selected"  @change="onChange" id="" name="" class="p-2 border w-100 rounded">
            <option v-for="(option, index) in options" :key="index" :value="option">{{ option }}</option>
        </select>
    </div>
</template>