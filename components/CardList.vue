<template>
    <div class="card-gallery">
        <Card  v-for="card in shownCards" :key="card" :card="card" :category="props.file"/>
    </div>        
</template>

<script setup>
// const props = defineProps(['file','order', 'beforeToday'])
const props = defineProps({
    file: { type: String, required: true },
    order: { type: String, default: 'newest' },
    beforeToday: { type: Boolean, default: false },
    filterTags: { type: Array, default: () => [] },
})

// const {data,status,error} =  useFetch(`/api/${props.file}`,
//     {
//         transform: (raw) => {
//             return props.beforeToday
//             ? filterObjectArrayBeforeToday(raw)
//             : raw
//         }
//     }
// )
const url = computed(()=>{
    return `/api/dated/${props.file}?order=${props.order}&beforeToday=${props.beforeToday}`
})
const {data,status,error} = await useFetch(url,{default: () => []})
const shownCards = computed(() => {
    let list = data.value || []

    if (props.filterTags.length) {
        return filterObjectArrayTags(list, props.filterTags)
    }

    return list
})


</script>

<style lang="css">
.cardlist-container {
    position: relative;
    width: 100%;
    
    height: 100%;
    box-sizing: border-box;
    border: 2px solid white;

    display: flex;
    flex-direction: row;
    
}
#filters-container {
    flex: 1;
}
#filters {
    position: sticky;
    top: 0;
    width: 100%;
    border: 2px solid green;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.card-gallery{
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, .5fr));
    
    padding: 15px;
    /* border: 2px solid red; */
    box-sizing: border-box;
}
/* .card {
    position: relative;
    aspect-ratio: 16/9;
    box-shadow: 0 0 3px rgba(255, 255, 255, 0.5);
    overflow: hidden;
    border: 2px solid #353535;
    transform: scale(1) 0.4s ease-in-out;
    transition: transform 0.3s ease-in-out;

}

@keyframes shadow {
    0% {
        box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
    }
    50% {
        box-shadow: 0 0 10px rgba(255, 255, 255, 1);
    }
    100% {
        box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
    }
}

.card:hover {
    animation: shadow 1s ease-in-out infinite;
    transform: scale(1.02);
} */
</style>