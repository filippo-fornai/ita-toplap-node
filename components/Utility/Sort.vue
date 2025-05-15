<template lang="html">
    <div id="sort-outer-container">
        <h2 style="background:black; width: 100%; text-align: center;">Sort by:</h2>
        <select v-model="order" name="" id="sort-select" @change="(e) => updateSort(e.target.value)">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
        </select>
    </div>
</template>
<script setup>
    const props = defineProps({
        initialOrder: {
            type: String,
            default: 'newest'
        }
    })
    const order = ref(props.initialOrder)
    const updateSort = inject('updateSort')
</script>
<style lang="css">
    #sort-outer-container {
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

    }
    #sort-select {
        position: relative;
        width: 90%;
        padding: 5px;
        border-radius: 5px;
        border: 1px solid rgba(123, 123, 123, 1);
        color: white;
        background-color: black;
        cursor: pointer;

    }
    #sort-select:hover {
        border : 1px solid white;
        transition: all 0.4s;
    }
    
</style>