<template lang="html">
    <div class="summary-card card-normal" ref="summaryCardTag">
        <router-link class="supp" v-if="pageLinked" :to="link">
            <div v-if="props.card.image && showImage" id="sx">
                <img class="summary-card-img" :src="`/images/${card.image}.png`" alt="Image" />
            </div>
            <div id="dx">
                <h3 class="summary-card-h3" ref="titleTag">{{ title }}</h3>
                <p class="summary-card-p" ref="descriptionTag">{{ description }}</p>
            </div>
        </router-link>
        <div v-else class="supp-2">
            <div v-if="props.card.image && showImage" id="sx">
                <img class="summary-card-img" :src="`/images/${card.image}.png`" alt="Image" />
            </div>
            <h3 class="summary-card-h3" ref="titleTag">{{ title }}</h3>
            <p class="summary-card-p" ref="descriptionTag">{{ description }}</p>
        </div>
    </div>
</template>
<script setup>
const props = defineProps(['category','card','clickable','showImage','cutDescription'])
const title = ref(props.card.title)
const description = ref(props.card.description)
const titleTag = useTemplateRef('titleTag')
const descriptionTag = useTemplateRef('descriptionTag')
const pageLinked = ref(true)
if ((props.category === 'news')){
    pageLinked.value = props.card.page
}


const summaryCardTag = useTemplateRef('summaryCardTag')
const link = '/' + props.category + '/'+ (props.linkedMain ? '' : props.card.id)

if ( (props.cutDescription > 0) && (pageLinked.value) ) {
    description.value = props.card.description.slice(0, props.cutDescription)
    description.value = description.value + (props.card.description.length > props.cutDescription ? '...' : '')
} else {
    description.value = props.card.description
}


onMounted(() => {
    
    if (pageLinked.value) {
        summaryCardTag.value.classList.add('card-pulsing')

        const el = summaryCardTag.value

        el.addEventListener('mouseenter', () => {
            let after = window.getComputedStyle(el, '::after')
            const bgSize = after.getPropertyValue('background-size')
            el.style.setProperty('--bg-size', bgSize)

            el.classList.remove('card-pulsing')
            
            
            // Store value in a custom property
            // console.log('hovered',el.style.getPropertyValue('--bg-size'))
            after = window.getComputedStyle(el, '::after')
            // console.log('::after bgsize',after.getPropertyValue('background-size'))
            el.classList.add('card-hovered')

            
        })

        el.addEventListener('mouseleave', () => {
            const after = window.getComputedStyle(el, '::after')
            const bgSize = after.getPropertyValue('background-size')
            // console.log('mouseleave',bgSize)
            el.style.setProperty('--bg-size', bgSize)

            el.classList.add('card-unhovered')
            el.classList.remove('card-hovered')

            el.addEventListener(
                'animationend',
                () => {
                    // Remove animation and set background size from current animation frame
                    el.classList.remove('card-unhovered')
                    el.style.setProperty('--bg-size', "50% 50%")

                    el.classList.add('card-pulsing')

                
                },
                { once: true } // Remove event listener after
            )
        })
    }
    cipherEffect(titleTag.value)
    cipherEffect(descriptionTag.value)
    
    // console.log(data.value)
})
</script>
<style lang="css" scoped>

    .summary-card {

        width:90%;
        position: relative;
        color: white;
        margin: 15px;
        padding:5px;
        border-radius: 5px;
        box-sizing: border-box;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: black;

        /* box-sizing: border-box; */
        /* border: 2px solid rgba(255, 255, 255, 0.5); */

    }

    .card-normal::after{
        content: '';
        position: absolute;
        height: 100%;
        width: 100%;
        /* border-radius:5px; */
        background:
        radial-gradient(at 0% 0%,white,white 20%,transparent 20.1%) 0 0 no-repeat,
        radial-gradient(at 100% 0%,white,white 20%,transparent 20.1%) 100% 0 no-repeat,
        radial-gradient(at 0% 100%,white,white 20%,transparent 20.1%) 0 100% no-repeat,
        radial-gradient(at 100% 100%,white,white 20%,transparent 20.1%) 100% 100% no-repeat;
        background-size: var(--bg-size, 50% 50%);
        z-index: -1;
        padding: 2px;
    }
    
    .card-pulsing::after {
        animation:pulse 2s ease-in-out infinite;
    }

    .card-hovered::after{
        animation:fill 0.3s linear forwards;
    }

    .card-unhovered::after{
        animation:defill 0.3s linear forwards;
    }

    @keyframes pulse {
        0% {
            background-size: 50% 50%;
        }
        50% {
            background-size: 55% 55%;
        }
        100% {
            background-size: 50% 50%;
        }
    } 


    @keyframes fill {
        0% {
            background-size:var(--bg-size);
        }
        100% {
            background-size: 200% 200%;
        }
    }

    @keyframes defill {
        0% {
            background-size:var(--bg-size);
        }
        100% {
            background-size: 50% 50%;
        }
    }



    .supp{
        width: 100%;
        text-align: center;
        text-decoration: none;
        color: white;

        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        
    }
    .supp-2{
        width: 100%;
        text-align: center;
        text-decoration: none;
        color: white;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
    }
    #sx{
        flex: 1;
        margin: 5px;
    }
    #dx{
        flex:2;
        box-sizing: border-box;
    }
    .summary-card-img {
        width: 100%;
        border-radius: 5px;
        object-fit: contain;
        box-sizing: border-box;
        padding: 2px;
        border: 1px solid white;
    }
    .summary-card-h3 {
        font-size: 1.5rem;
        margin: 10px 0;
    }
    .summary-card-p {
        font-size: 1rem;
        margin: 0;
    }

</style>