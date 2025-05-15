<template lang="html">
    <div class="cards-container">
        <h1 class="cards-title" :data-value="title"> {{ title }}</h1>
        <div class="cards-list">
            <SummaryCard v-for="card in cards" :key="card.id" :category="props.file" :card="card" :clickable="clickable" :showImage="showImage" :cutDescription="cutDescription"/>
            <SummaryCardFinal :page="file" />
        </div>

    </div>
    
</template>
<script setup>
    const props = defineProps(['title','file','cardsAmount','clickable','beforeToday','showImage','order','cutDescription'])
    
    let url = `/api/dated/${props.file}?`
    url += `end=${props.cardsAmount}`
    url += `&order=${props.order}`
    url += `&beforeToday=${props.beforeToday}`
    const {data:cards,status,error} = await useFetch(url,{default: () => []})
    
    // const cards = computed(() => {
    //     sortObjectArrayDate(data.value, props.order)
    //     if (props.beforeToday) {
    //         return filterObjectArrayBeforeToday(data.value).slice(0, props.cards)
    //     }
    //     return data.value.slice(0, props.cards)
    // })
</script>
<style lang="css">
    .cards-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .cards-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>