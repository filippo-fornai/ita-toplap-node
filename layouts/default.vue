<template lang="html">
    <div>
        <header>
            <nav>
                <div>
                    <router-link to="/">Home</router-link>
                    <router-link to="/news/">News</router-link>
                    <router-link to="/events/">Workshops/Events</router-link>
                    <router-link to="/articles/">Articles</router-link>
                    <router-link to="/resources/">Resources</router-link>
                    <router-link to="/about/">About</router-link>
                    
                </div>
            </nav>
        </header>
        
        <slot /> 
    </div>
</template>

<script setup>

</script>

<style lang="css" scoped>

header {
    position: sticky;
    top: 0;

    background-color: rgba(0, 0, 0, 0.9);
    color: white;
    border: 2px solid white;
    box-sizing: border-box;


    width: 100%;
    z-index: 10007;
    box-shadow: 0px 0px 50px black;
}

nav div {
    position: relative;

    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
}


nav div a {
    height: 4vh;

    position: relative;
    padding: 10px;
    text-decoration: none;
    color: white;
    border-right-width: 2px;
    border-right-style: solid;
    border-right-color: white;
    background-color: black;
    box-sizing: border-box;
    transition:all 0.1s linear

}
a:visited{
    text-decoration: none;
}
a:hover{
    color: black;
    font-weight: bold;
    background: white;
    transition:all 0.1s linear
}
.active{
    color: black;
    font-weight: bold;
    background: white;
    transition:all 0.1s linear
}
.router-link-active{
    color: black;
    font-weight: bold;
    background: white;
    transition:all 0.1s linear
}

.router-link-exact-active{
    color: black;
    font-weight: bold;
    background: white;
    transition:all 0.1s linear
}
</style>
