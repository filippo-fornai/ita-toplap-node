<template lang="html">
    <div id="sort-filter-cardlist-container">

        <div id="sort-filter-container">
            <div id='hydra-canvas' ref="hydra-canvas-div"></div>
            <div id="overlay"></div>
            <router-link to="/articles/build" id="build-link">article builder</router-link>

            <UtilitySortFilter @updateFilter="filterData" @updateSort="sortData">
                
                <!-- momentarily disabled, static page can fetch data order in another way  -->
                <!-- <UtilitySort :initialOrder></UtilitySort> -->
                
                <h2 style="text-align: center;background: black; z-index: 1;">Filters:</h2>
                <div id="filters-container">
                    <UtilityFilter :file="'software'"></UtilityFilter>
                    <UtilityFilter :file="'artTypes'"></UtilityFilter>
                </div>
                
            </UtilitySortFilter>
        </div>

        <div id="cardlist-container">
            <CardList file="articles" 
            ref="cardList" 
            :order
            :beforeToday="false"
            :filterTags
            ></CardList>

        </div>
    
    </div>
</template>
<script setup>
const hydraCanvasDiv = useTemplateRef('hydra-canvas-div')

const { $hydra1,$showCanvas } = useNuxtApp()
const filterTags = ref([])
const order = ref('newest')
const initialOrder = ref(order.value)

const filterData = (categorizedTags) => {
    let combinedTags = Object.values(categorizedTags).flat();
    filterTags.value = combinedTags

}

const sortData = (newOrder) => {
    order.value = newOrder
}

onMounted(() => {
    $showCanvas()
    $hydra1.eval('osc(10,0.1, 10).rotate(Math.PI/2).out();')
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
#build-link{
    padding:5px 0;
    margin: 10px;
    position:relative;
    width: 90%;
    color: white;
    text-decoration: none;
    text-align: center;
    font-weight: bold;
    border: 1px solid white;
    background: linear-gradient(to right,white,black 10%,black 90%,white);
    background-size: 100%;
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