<template lang="html">
    <div id="news-bg">
        <div id="myCanvas"></div>
        <div id="overlay"></div>
    </div>
    <div id="event">
        <div id="content">
            <div id="sx">
                <div id="tag">
                    <div id="image">
                        <img :src="`${useRuntimeConfig().app.baseURL}images/authors/${card.image}`" alt="">
                    </div>
                    <h1 id="tag-name">{{card.name}}</h1>
                </div>
                <div id="bio">{{ card.bio }}</div>
            </div>
            <div id="dx">
                <h2>Links</h2>
                <AboutLink v-for="singleLink in card.links" :key="singleLink.name" :singleLink="singleLink"/>
            </div>
        </div>
    </div>
</template>
<script setup>
const author = useRoute().params.author

const {data:card} = (await useFetch(`/api/authors/${author}`))

const { $hydra1,$showCanvas } = useNuxtApp()

onMounted(async () => {

    // Append the Hydra canvas to the div with id "myCanvas"
    $showCanvas()
    $hydra1.eval('osc(10, 0.1, 0.8).rotate(-Math.PI/2).color(-1, 1).out()')
    document.getElementById("myCanvas").appendChild($hydra1.canvas);
})
</script>
<style lang="css" scoped>
    #news-bg{
        position: fixed;
        top: 4vh;
        height: 96vh;
        width: 100%;
        z-index: -1;

        
        /* border: 2px solid green; */
        box-sizing: border-box;
    }
    #myCanvas{
        position:relative;
        width: 100%;
        height: 100%;
        display: flex;
        z-index:-3;
    }

    #overlay{
        position:absolute;
        top:0;

        width: 100%;
        height: 100%;
        background: linear-gradient(black, rgba(0, 0, 0, 0.5));
        /* background: red; */
        z-index: -2;

    }
    #event{
        position: relative;
        z-index: 3;
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;

        color: white;
    }

    #content{
        width: 80%;
        padding: 2vh 2vw;
        margin-top:0.5vh;

        border:1px solid grey;
        box-sizing: border-box;
        background: rgba(0, 0, 0, 0.8);
        
        display: flex;
        flex-direction: row;

        z-index:-1;
        
    }

    #sx{
        flex:4;
        width: 100%;
        height: 100%;
        /* border:1px solid orange; */
        box-sizing: border-box;

    }

    #tag{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        
        /* border:1px solid blue; */
        border-left:1px solid grey;
        border-bottom:1px solid grey;
        border-top:1px solid grey;

        box-sizing: border-box;
    }

    #image{
        flex:1;
        width: 100%;
        height: 100%;
        border-right:1px solid grey;
    }

    img{
        width: 100%;
        height: 100%;
        object-fit: contain;
       
    }
    #tag-name{
        text-align: center;
        flex:2;
        font-size: 3vh;
        font-weight: bold;
    }



    #dx{
        flex:1;
        width: 100%;
        height: 100%;
        border:1px solid grey;
        padding:20px;
        box-sizing: border-box;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

    }

    #bio{
        padding:20px 10px 0 0;
        font-size:1rem;
    }

   
</style>