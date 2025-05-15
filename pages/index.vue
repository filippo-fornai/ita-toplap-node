<template lang="html">
    <div id="home-container">
        <div id="myCanvas">
            <div id="overlay">
                <div id="flex-supp">
                    <div id="overlay-title">
                        <h2>Welcome to the italian TOPLAP node site </h2>
                    </div>
                    <div id="overlay-description">
                        <p>Brief explanation of what is TOPLAP</p>
                    </div>
                    <div id="toplap-icon-container" >
                        <div id="toplap-icon-overlay-2">
                        </div>
                        <div id="toplap-icon-overlay-1">
                        </div>
                        <div id="toplap-icon">
                            <img src="/toplap.svg" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="home-info">
            <div id="news">
                <SummaryCardList :title="'News'" :file="'news'" :beforeToday="false" :cardsAmount="3" :cutDescription="60" :clickable="true" showImage="true" :order="'newest'"/>
            </div>
            <div id="events">
                <SummaryCardList :title="'Events'" :file="'events'" :beforeToday="true" :cardsAmount="5" :cutDescription="40" :clickable="true" showImage="true" :order="'oldest'"/>
            </div>
            <div id="links">
                <LinkList :title="'Links'" :file="'aboutLinks'"/>
            </div>
        </div>
    </div>
</template>
<script setup>

definePageMeta({
    layout: 'home',
})

onMounted(() => {
    // Append the Hydra canvas to the div with id "myCanvas"
    const { $hydra1,$showCanvas } = useNuxtApp()
    
    $showCanvas()
    $hydra1.eval('osc(10, 0.1, 0.8).rotate(0, 0.1).kaleid().color(-1, 1).out()')


    document.getElementById("myCanvas").appendChild($hydra1.canvas);
    
    cipherEffect("#overlay-title h1")
    cipherEffect("nav a")
    cipherEffect("#overlay-description p")
})
</script>
<style lang="css" scoped>
    

    #home-container{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: black;
    }
    #myCanvas{
        position: relative;
        width: 100%;
        height: 54vh;
        
        display: flex;
        justify-content: center;
        align-items: flex-end;

    }
    #overlay{
        position: absolute;
        width: 90%;
        height: 48vh;
        background-color: rgb(0, 0, 0,0.8); /* semi-transparent black */
        z-index: 2; /* make sure it's above the Hydra canvas */
        
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin:10px
    }
    
    #flex-supp{
        position: relative;
        width: 96%;
        height: 96%;
        
        display: flex;
        flex-direction: row;
    }

    #overlay-title, #overlay-description, #toplap-icon-container{
        width: 100%;
        flex: 1;
    }
    #overlay-title{
        flex-grow:1.5;
        font-size: 2rem;
        /* background: red; */
    }

    #toplap-icon-overlay-2{
        position: absolute;
        height: 100%;
        width: 100%;
        background:radial-gradient(at 50% 50%,transparent 20%,rgba(0,0,0,1) );
        z-index: 4;
    }
    
    #toplap-icon-overlay-1{
        position: absolute;
        height: 100%;
        width: 100%;
        z-index: 3;
        box-sizing: border-box;
        border: 3px solid rgba(0,0,0,0.5);
        background: linear-gradient(
            rgba(0,0,0,0.5) 0px,
            rgba(0,0,0,0.5) 3px,
            transparent 3px,
            transparent 9px
        );
        background-size: 100% 9px;

        animation: 15s linear infinite;
        animation-name: pan-overlay;
    }

    @keyframes pan-overlay {
    from{
        background-position: 0% 0%;
    }
    to{
        background-position: 0% -100%;
    }
}

    #toplap-icon-container{
        position:relative;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        background: linear-gradient(
            90deg,
            rgba(0,255,0,0.1) 0%,
            rgba(0,255,0,0.05) 33%,
            rgba(255,255,255,0.05) 33.1%,
            rgba(255,255,255,0.05) 66%,
            rgba(255,0,0,0.05) 66.1%,
            rgba(255,0,0,0.2) 100%  
        );
    }
    #toplap-icon{
        position: absolute;

        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 4;
    }
    
    #home-info{
        position: relative;
        width: 100%;
        height: 100%;
        background-color: rgb(0, 0, 0,0.8); /* semi-transparent black */
        z-index: 2; /* make sure it's above the Hydra canvas */
        
        display: flex;
        flex-direction: row;

    }
    #news, #events, #links{
        /* width: 100%; */
        height: 100%;
        border:2px solid white;
        flex: 1;
    }

    #news{
        flex-grow: 3;
        /* height: 1000px; */
    }
    #events{
        flex-grow: 2;
    }
    
</style>