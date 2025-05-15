<template lang="html">
    <div id="news-bg">
        <div id="myCanvas"></div>
        <div id="overlay"></div>
    </div>
    <div id="news-page">
        <!-- <div style="height:1000px; border:1px solid yellow"></div> -->
        <div id="news-page-content">
            <div id="news-page-info">
                <h1>News</h1>
                <p>Welcome to the news page!</p>
                <p>Here you will find the latest updates and announcements.</p>
                <p>Stay tuned for more information!</p>
            </div>
        
            <div id="news-cards">
                
                <NewsCard v-for="card in cards" :card="card"></NewsCard>
            </div>
        </div>
        
    </div>
</template>
<script setup>
const props = defineProps(['file'])

const { $hydra1,$showCanvas } = useNuxtApp()

const {data,status,error} = await useFetch('/api/news')

const cards = computed(() => {
    return sortObjectArrayDate(data.value, 'newest')
})

onMounted(async () => {

    // Append the Hydra canvas to the div with id "myCanvas"
    $showCanvas()
    $hydra1.eval('osc(10, 0.1, 0.8).rotate(-Math.PI/2).color(-1, 1).out()')
    document.getElementById("myCanvas").appendChild($hydra1.canvas);

})



</script>
<style lang="css" scoped>
    #news-page{
        width: 100%;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        background: #222;
        color: white;
    }

    #news-bg{
        position: fixed;
        top: 4vh;
        height: 96vh;
        width: 100%;

        
        /* border: 2px solid green; */
        box-sizing: border-box;
    }


    #myCanvas{
        position:relative;
        width: 100%;
        height: 100%;
        z-index: -1;
        display: flex;
    }

    #overlay{
        position:absolute;
        top:0;

        width: 100%;
        height: 100%;
        z-index: 0;
        background: linear-gradient(black, rgba(0, 0, 0, 0.5));
        /* background: red; */
        z-index: 2;

    }
    
    #news-page-content{        
        width: 100%;

        
    }
    
    #news-page-info{
        position: relative;
        top: 0;
        /* background: black; */
        z-index:1;
        width: 100%;
        margin-bottom: 20px;
        padding-left: 10px;
        box-sizing: border-box;
    }

    #news-cards{
        position: relative;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        z-index:1;
    }
    

</style>