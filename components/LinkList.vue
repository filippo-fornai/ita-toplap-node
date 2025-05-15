<template lang="html">
    <div class="links-container">
        <h1 class="links-title" :data-value="title"> {{ title }}</h1>
        <div class="links-list">
            <AboutLink v-for="singleLink in data" :key="singleLink.name" :singleLink="singleLink"/>
        </div>
    </div>
    
</template>
<script setup>
const props = defineProps(['title','file'])

const { data,status,error }= useFetch(`/api/${props.file}`)


</script>
<style lang="css">
    .links-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .links-list {
        width: 100%;
        margin:10px 0;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>