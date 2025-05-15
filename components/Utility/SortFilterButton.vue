<template lang="html">
    <input type="button" 
    :class="[ buttonSelected ? 'selected' : 'notSelected']"
    :value="value" 
    @click="handleClick">
</template>
<script setup>
const props = defineProps(['value'])
const buttonSelected = ref(false)

const emit = defineEmits(['updateFilter'])
const handleClick = () => {
    buttonSelected.value = !buttonSelected.value
    emit('updateFilter', props.value, buttonSelected.value)
}
</script>
<style lang="css" scoped>
    .selected{
        color: black;
        font-weight: bold;
        background-color: white;
        border: 2px solid black;
        transition: all 0.3s ease-in-out;
        box-sizing: border-box;
        padding:5px 10px;
        cursor: pointer;

    }

    .notSelected{
        color: white;
        font-weight: bold;

        background-color: black;
        border: 2px dashed rgba(123, 123, 123, 1);
        border-radius:20px;
        transition: all 0.3s ease-in-out;
        box-sizing: border-box;
        padding:5px 10px;
        cursor: pointer;


    }

    .selected:hover{
        color: white;
        background-color: rgba(123, 123, 123, 1);
        border: 2px solid rgba(123, 123, 123, 1);
        transition: all 0.2s ease-in-out;
        box-sizing: border-box;


    }
    .notSelected:hover{
        
        color: black;
        background-color: white;
        border: 2px dashed white;

        transition: all 0.2s ease-in-out;
        box-sizing: border-box;


    }
    
</style>