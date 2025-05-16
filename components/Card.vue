<template lang="html">
    <div ref='cardContainer' class="card-container card">
        <router-link :to=" { name: `${category}-id`, params: { id: card.id }}" class="card-link">
            <div id="card-image-container">
                <img v-if="visible" id="card-image" :src="src" alt="Card Image">
            </div>
            <div id="card-info">
                <div class="card-title">{{ card.title }}</div>
                <div class="card-description">{{ card.description }}</div>
                <div class="card-date" ref="cardDate">{{ card.date }}</div>
                <div class="card-tags">{{ card.tags }}</div>

            </div>
        </router-link>
        
    </div>
</template>
<script setup>
const props = defineProps(['card','category'])

const src = ref(`${useRuntimeConfig().app.baseURL}images/${props.card.image}.png`)
const visible = ref(true)

const cardContainer = useTemplateRef('cardContainer')
const cardDate = useTemplateRef('cardDate')


const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
}



onMounted(() => {    

    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            visible.value = true
        } else{
            visible.value = false
        }
    })
    }, options)

    observer.observe(cardContainer.value)

    let eventDate = new Date(props.card.date)
    let today = new Date()
    let hours = today.getHours() * 60 * 60 * 1000
    let minutes = today.getMinutes() * 60 * 1000
    let seconds = today.getSeconds() * 1000
    today = today - (hours + minutes + seconds)
    
    let diff = Math.abs( eventDate 
    - (today) ) / (1000 * 60 * 60 * 24);
    if ((eventDate >= today) && (diff < 7)) {
        cardContainer.value.classList.add('animation-now')
        cardDate.value.classList.add('date-now')
    }
})
</script>
<style lang="css" scoped>
    .card-container{
        position: relative;
        width: 100%;
    }
    #card-image-container{
        position: absolute;
        object-fit: cover;
    }
    #card-image{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    #card-info{
        font-size: 1rem;
        position:absolute;
        bottom:0;
        left: 0;
        height: 40%;
        width:100%;
        background: rgba(0, 0, 0, 0.85);
        overflow: auto;
        
    }


#card-info::-webkit-scrollbar {
  width: 8px; /* vertical scrollbar width */
  height: 8px; /* horizontal scrollbar height */
}

#card-info::-webkit-scrollbar-track {
  background: #1e1e1e; /* background of the scrollbar track */
}

#card-info::-webkit-scrollbar-thumb {
  background-color: #888; /* scrollbar color */
  border-radius: 6px;
  border: 2px solid #1e1e1e; /* optional padding effect */
  box-sizing: border-box;

}
.card {
    position: relative;
    aspect-ratio: 16/9;
    box-shadow: 0 0 3px rgba(255, 255, 255, 0.5);
    overflow: hidden;
    border: 2px solid #353535;
    transition: transform 0.3s ease-in-out;

}

.animation-now{
    animation: shadow-now 1s ease-in-out infinite;
    transform: scale(1.02);
}

.card:hover {
    animation: shadow 1s ease-in-out infinite;
    transform: scale(1.02);
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

@keyframes shadow-now {
    0% {
        box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
    }
    50% {
        box-shadow: 0 0 10px rgba(255, 0, 0, 1);
    }
    100% {
        box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
    }
}

.date-now{
    animation: date-now 1s ease-in-out infinite;
}

@keyframes date-now {
    0% {
        color: rgba(255, 255, 255, 1);
    }
    50% {
        color: rgba(255, 255, 255, 0.7);

    }
    100% {
        color: rgba(255, 255, 255, 1);

    }
    
}

a{
    text-decoration: none;
    color: white;
}
</style>