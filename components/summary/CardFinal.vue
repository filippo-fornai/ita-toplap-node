<template lang="html">
    <router-link :to="'/'+page">
        <div class="summary-card">
            More info
        </div>
    </router-link>
</template>
<script setup>
const props = defineProps(['page'])

</script>
<style lang="css" scoped>
    .summary-card {
        width:100%;
        position: relative;
        color: black;
        border-radius: 5px;
        box-sizing: border-box;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: white;

        /* box-sizing: border-box; */
        /* border: 2px solid rgba(255, 255, 255, 0.5); */

    }
    .summary-card:hover{
        background: black;
        color: white;
        transition: all 0.4s;
    }
    .summary-card::after{
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
        background-size: 50% 50%;
        z-index: -1;
        padding: 2px;
        transition: all 0.4s;


        
    }
    .summary-card:hover::after{
        background-size: 200% 200%;
        transition: all 0.4s;

    }

    

    a{
        width: 90%;
        text-decoration: none;
        color: white;
        font-size: 1.5rem;
        font-weight: bold;
        margin: 15px 0;

    }
</style>