<template lang="html">
    <div class="link-card">
        <a :href="singleLink.url">
            <div class='link-icon-container'>
                <!-- <img class='link-icon' :src="src"> -->
                <Icon class="link-icon" :name="`simple-icons:${props.singleLink.icon}`" mode="svg" size="100%" />
                 
            </div>
            <div class="link-name">
                <p >{{ singleLink.name }}</p>

            </div>
        </a>
        
    </div>
</template>

<script setup>
const props = defineProps(['singleLink'])

onMounted(() => {
    cipherEffect(".summary-card p")
    cipherEffect(".summary-card h3")
    
})
</script>
<style lang="css" scoped>
    
    .link-card {
        width:90%;
        position: relative;
        color: white;
        margin: 5px 0;
        border-radius: 5px;
        box-sizing: border-box;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: black;

        /* box-sizing: border-box; */
        /* border: 2px solid rgba(255, 255, 255, 0.5); */
        cursor: pointer;
        

    }
    .link-card::after{
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
    .link-card:hover::after{
        background-size: 200% 200%;

        transition: all 0.4s;

    }

    a{
        padding:1% 10% 1% 0;
        position: relative;
        width: 100%;
        height: 100%;

        text-decoration: none;
        
        height: 100%;
        margin: 0;
        box-sizing: border-box;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    
    a:hover{
        text-decoration: none;
        color: white;
    }
    a:visited{
        text-decoration: none;
        color: white;
    }

    .link-icon-container {
        width: 100%;
        height: 100%;
        padding:10px;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex: 2;

        /* border: 1px solid yellow; */
        box-sizing: border-box;

    }
    .link-icon {
        position: relative;
        width: 80%;
        height: 80%;

        color:white;
        object-fit: cover;

    }
    .link-name{
        text-align: center;
        width: 100%;
        height: 100%;
        color:white;
        font-size: 1rem;
        /* border:1px solid red; */
        flex:5;
    }
</style>