<template lang="html">
    <div id="sort-filter-cardlist-container">

        <div id="sort-filter-container">
            <div id="hydra-canvas" ref="hydra-canvas-div"></div>
            <div id="overlay"></div>
            
            <UtilitySortFilter @updateFilter="filterData" @updateSort="sortData">
                            
                <h2 style="text-align: center;background: black; z-index: 1;">Filters:</h2>
                <div id="filters-container">
                    <UtilityFilter :file="'software'"></UtilityFilter>
                    <UtilityFilter :file="'artTypes'"></UtilityFilter>
                    <UtilityFilter :file="'regions'"></UtilityFilter>
                </div>
                
                 
            </UtilitySortFilter>
        </div>

        <div id="cardlist-container">
            <CardList file="events" 
            ref="cardList" 
            order="oldest" 
            :beforeToday="true"
            :filterTags
            :sortOrder
            ></CardList>
        </div>
    
    </div>
</template>
<script setup>
const hydraCanvasDiv = useTemplateRef('hydra-canvas-div')

const { $hydra1,$showCanvas } = useNuxtApp()
const filterTags = ref([])
const sortOrder = ref('oldest')


const filterData = (categorizedTags) => {
    let combinedTags = Object.values(categorizedTags).flat();
    filterTags.value = combinedTags

}

const sortData = (order) => {
    sortOrder.value = order
}

onMounted(() => {
    $showCanvas()
    $hydra1.eval('osc(10,0.1, 0.8).rotate(Math.PI/2).out()')
    hydraCanvasDiv.value.appendChild($hydra1.canvas);
})


</script>
<style lang="css" scoped>
#hydra-canvas {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
    background-color: black;
    
}
#overlay {
    margin:0;
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.1));
}
#sort-filter-cardlist-container {
    width: 100%;

    box-sizing: border-box;
    /* border: 2px solid white; */

    display: flex;
    flex-direction: row;
    align-items: flex-start;
}

#sort-filter-container {
    position: sticky;
    top: 4vh;
    height: 96vh;
    
    /* border: 2px solid green; */
    box-sizing: border-box;
    border-right: 2px solid white;

    flex: 1;

    display: flex;
    flex-direction: column;

    /* firefox */
    scrollbar-width: thin;
    scrollbar-color: #888 #1e1e1e;
}
#filters-container {
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1;
    padding: 0 10px 0 10px;
    margin: 0 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
}

/* webkit based
#sort-filter-container::-webkit-scrollbar {
    width: 4px; 
    height: 8px;
}

#sort-filter-container::-webkit-scrollbar-track {
    background: #1e1e1e;
}

#sort-filter-container::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 6px;
    border: 1px solid #1e1e1e;
} */

#cardlist-container {
    flex:4;
}
</style>