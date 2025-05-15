<template lang="html">
    <div id="news-bg">
        <div id="myCanvas"></div>
        <div id="overlay"></div>
    </div>
    <div id="event">
        <div id="header">
            <div id="author">
                {{ authorLabel }}
                <router-link v-if="card" :to=" { name: `authors-author`, params: { 'author': card.author } }">
                    <div id="author-image">
                        <img :src="`/images/authors/${authorCard.image}`" alt="">
                    </div>
                    <div id="author-name">{{ card.author }}</div>
                </router-link>
            </div>
            <div id="date">{{ card.date }}</div>

        </div>
        <div id="content">
            <div v-if="'image' in card" id="cover-container">
                <img id="cover" :src="`/images/${card.image}.png`" alt="">
            </div>
            <h1 ref="title">{{ card.title }}</h1>
            <div id="markdown" v-html="sanitizedMarkdown"></div>
        </div>
        <div v-if="'tags' in card" id="footer">{{ card.tags }}</div>
    </div>
</template>
<script setup>
import DOMpurify from 'dompurify'
import {marked} from 'marked'
const { $hydra1,$showCanvas } = useNuxtApp()
const id = useRoute().params.id

const props = defineProps({
    'category': { type: String, required: true },
    'authorLabel': { type: String, default: 'Author:'
    }
})

const title = useTemplateRef('title')

const {data: cardData} = (await useFetch(`/api/${props.category}`))
const {data: authorCardData} = (await useFetch(`/api/authors`))
const {data: markdown} = (await useFetch(`/api/markdown?category=${props.category}&id=${id}`))

const card = computed(() => {
    return cardData.value[id]
})

watch(card, (newValue) => {
    if (newValue.image) {
        title.value.style.setProperty('border-top', '1px solid transparent')
    }
})

const authorCard = computed(() => {
    return authorCardData.value[card.value.author]
})


const sanitizedMarkdown = ref('')

onMounted(() => {
    // NOTE: Not possible to use computed(), DOMpurify not working with SSR
    sanitizedMarkdown.value = DOMpurify.sanitize(marked(markdown.value))  
    
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
    #header{

        width: 80%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1vh 1vw;
        margin-top:2vh;
        background: rgba(0, 0, 0, 0.5);
        font-size:1rem;

        border:1px solid grey;
        box-sizing: border-box;
    }

    #author{
        position: relative;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        gap: 10px;
    }

    a{
        text-decoration: none;
        display: flex;
        align-items: center;
        gap:10px;
        border: 1px solid grey;
        padding: 5px;
        animation: borders 5s infinite linear;
        transition: all 0.1s linear;

    }

    @keyframes borders{
        0%{
            border: 1px solid grey;
        }
        50%{
            border: 1px solid white;
        }
        100%{
            border: 1px solid grey;
        }
    }
    a:hover{
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        transition: all 0.1s linear;
    }

    #author-image{
        height: 100%;
        aspect-ratio: 1/1;
        
        
        border:1px solid grey;
        box-sizing: border-box;
        border-radius: 50%;

    }

    #author-image img{
        height: 5vh;
        aspect-ratio: 1/1;
        border-radius: 50%;

        
        object-fit: cover;
    }

    #author-name{
        text-align: center;
        width: 100%;
        height: 100%;
        color:white;
        font-size: 1rem;
        /* border:1px solid red; */
       

    }

    #cover-container{
        width:100%;
        height:40vh;
        border:1px solid grey;

        box-sizing: border-box;
        background: radial-gradient(circle, white, transparent);

    }

    #cover{
        position:relative;
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    #content{
        width: 80%;
        padding: 2vh 2vw;
        margin-top:0.5vh;

        border:1px solid grey;
        box-sizing: border-box;
        background: rgba(0, 0, 0, 0.8);

    }

    h1{
        border-left:1px solid grey;
        border-bottom:1px solid grey;
        border-right:1px solid grey;
        box-sizing: border-box;
        font-size: 2rem;
        margin: 0;
        text-align: center;
    }

    #markdown{
        background: rgba(0, 0, 0, 0.8);
        padding:10px;

    }


    #footer{
        width: 80%;
        padding: 1vh 1vw;
        margin-top:0.5vh;
        background: rgba(0, 0, 0, 0.8);



        border:1px solid grey;
        box-sizing: border-box;
    }
</style>