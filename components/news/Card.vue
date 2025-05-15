<template lang="html">
    <div class="news-card">
        <div id="news-card-new" v-if="cardNew">
            <h3 id="news-card-new-tag">New ! ! !</h3>
        </div>
        <div v-if="src" class="news-card-img-container">
            <img :src="src" alt="" class="news-card-img">
        </div>
        <div id="news-card-info" ref="newsCardInfoTag">
            <h2 class="news-card-h3" ref="titleTag">{{ card.title }}</h2>
            <p class="news-card-date" ref="dateTag">{{ card.date }}</p>
            <p class="news-card-p" ref="descriptionTag">{{ card.description }}</p>
            
        </div>
        <div class="news-card-link-container" v-if="card.page">
            <router-link :to="'/news/'+card.id">Read more . . .</router-link> 
        </div>
        
    </div>
</template>
<script setup>
const props = defineProps(['card'])

const src = ref('')
const cardNew = ref(false)
const newsCardInfoTag = useTemplateRef('newsCardInfoTag')

let diff = Math.abs(new Date(props.card.date) - new Date()) / (1000 * 60 * 60 * 24)
if (diff < 7) {
    cardNew.value = true
}

onMounted(()=>{
    if ("image" in props.card) {
        src.value = `/images/${props.card.image}.png`

        newsCardInfoTag.value.style['border-top'] = '1px solid white'
        newsCardInfoTag.value.style['border-radius'] = '0 0 10px 10px'
}
})

</script>
<style lang="css" scoped>
    #news-card-new{
        width: 100%;
        background-color: #FF0000;
        display: flex;
        border-radius: 10px 10px 0 0;
        border-bottom: 1px solid white;
        box-sizing: border-box;

        justify-content: center;
        align-items: center;
    }

    .news-card{
        z-index:1;
        width: 60%;
        height: 100%;
        margin-bottom: 20px;
        box-sizing: border-box;
        border: 1px solid white;
        border-radius: 10px;
        
    }
    #news-card-info{
        position: relative;
        box-sizing: border-box;
        font-size:1rem;

        background: rgba(0, 0, 0, 0.8);

        padding:10px;
        border-radius: 10px;        
    }

    .news-card-h3{
        color: white;
        font-size: 1.5em;
        margin: 0;
    }
    .news-card-img-container{
        position:relative;
        width: 100%;

        display: flex;
        justify-content: center;
       
        background: linear-gradient(to left,rgba(0,0,0,0.1),black 30%,black 70%,rgba(0,0,0,0.1));

    }
    .news-card-img{
        border-left: 1px solid white;
        border-right: 1px solid white;

        box-sizing: border-box;
        width: 60%;
        /* height: 100%; */
        object-fit: cover;
    }

    .news-card-link-container{
        position: relative;
        
        width: 100%;

        border-top:1px solid white;
        display: flex;
        justify-content: center;
        align-items: center;

    }
    
    
    a{

        width: 100%;
        font-size: 1.2em;
        border-radius: 0 0 10px 10px;

        color: white;
        font-weight: bold;
        background: black;

        text-decoration: none;
        text-align: center;
        padding:10px;
        transition: all 0.2s ease-in-out;
        animation: subtle-bg 10s linear infinite;
    }
    
    
    a:hover{
        color: black;
        background: white;
        transition: all 0.2s ease-in-out;
    }
</style>