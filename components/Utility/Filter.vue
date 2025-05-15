<template lang="html">
    <div id="filter-outer-container">
        <div ref='titleTag' id="title" class="style-black" @click="toggleList">{{ data.title }}</div>
        <div id="filter-container" ref="filterContainer" >
            <div id="tags-wrapper">
                <UtilitySortFilterButton v-for="tag in tags" :value="tag" @updateFilter="updateFilter"/>
            </div>
        </div>
    </div>
</template>
<script setup>
const filterContainer = useTemplateRef('filterContainer')
const titleTag = useTemplateRef('titleTag')

const emit = defineEmits(['updateFilter'])

const props = defineProps(['file'])
const selectedFilters = ref([])
const openList = ref(false)
const updateFilterOuter = inject('updateFilter')

const {data,status,error} = (await useFetch(`/api/filters/${props.file}`))
// console.log(`/api/filters?name=${props.file}`)

// const title = computed(() => data.value.title)
const tags = computed(() => data.value.tags.sort())


const updateFilter = ((value,selected) => {
    if (selected) {
        selectedFilters.value.push(value)
    } else {
        const index = selectedFilters.value.indexOf(value)
        if (index > -1) {
            selectedFilters.value.splice(index, 1)
        }
    }

    // styling
    if (selectedFilters.value.length !== 0) {
        titleTag.value.classList.add('style-white')
        titleTag.value.classList.remove('style-black')
    }else {
        titleTag.value.classList.add('style-black')
        titleTag.value.classList.remove('style-white')
    }

    updateFilterOuter(data.value.title, selectedFilters.value)
})


// Animation for opening and closing the filter list
const options = {
                duration: 100,
                easing: 'linear',
                fill: 'forwards'
            }

const toggleList = () => {
    if (openList.value) {
        close(filterContainer)
    } else {
        open(filterContainer)
    }
}

function open(filterContainer) {
    filterContainer.value.animate(
        [
            { maxHeight: filterContainer.value.scrollHeight + 'px' },
        ],
        options
    )
    openList.value = true
}

function close(filterContainer) {
    filterContainer.value.animate(
        [
            { maxHeight: 0 + 'px' },
        ],
        options
    )
    openList.value = false
}
onMounted(()=>{
    window.addEventListener('resize', () => {
    if (openList.value) {
        close(filterContainer)
    }
})
})


</script>
<style lang="css" scoped>
    .style-black {
        background-color: black;
        color: white;
        border-top: 1px solid white;
        transition: all 0.4s;

    }
    .style-white {
        background-color: white;
        color: black;
        border-top: 1px solid black;
        transition: all 0.4s;
    }

    #title{
        cursor: pointer;
        padding: 10px 0;
        box-sizing: border-box;
    }
    #title.style-white:hover {
        font-weight: bold;
        color: white;
        background:rgba(64,64,64,1);
        transition: all 0.2s;
    }
    #title.style-black:hover {
        font-weight: bold;
        color: rgba(64,64,64,1);
        background:white;
        transition: all 0.2s;
    }
    
    #filter-outer-container {
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: start;
    }
    

    #filter-container {
        overflow: hidden;
        transition: all 0.4s;
        max-height: 0;

        background: linear-gradient(to bottom,rgba(0,0,0,1),rgba(0,0,0,0.5));
    }

    #tags-wrapper{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 5px;

        padding: 10px 0;
    }
    
</style>