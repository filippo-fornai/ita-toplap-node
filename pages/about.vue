<template>
    <div id="about">
        <!-- Section 1: About TOPLAP -->
        <section>
            <h1>What is TOPLAP?</h1>
            <p>
                TOPLAP is a community and movement dedicated to live coding and algorithmic music. 
                It promotes creativity through code and encourages collaboration and experimentation.
            </p>
            <p>
                Founded in 2004, TOPLAP has grown into a global network of artists, musicians, and technologists 
                who explore the intersection of code and performance. It serves as a platform for sharing knowledge, 
                tools, and techniques for live coding.
            </p>
            <p>Learn more about TOPLAP:</p>
            <ul>
                <li><a href="https://toplap.org" target="_blank">Official Website</a></li>
                <li><a href="https://github.com/toplap" target="_blank">GitHub</a></li>
            </ul>
        </section>

        <!-- Section 2: What is Live Coding? -->
        <section>
            <h2>What is Live Coding?</h2>
            <p>
                Live coding is a creative practice where artists write and modify code in real-time to generate music, visuals, or other forms of art. 
                It emphasizes the process of creation, making the act of coding itself a performance.
            </p>
            <p>
                In live coding performances, the audience often sees the code being written and executed, creating a unique and transparent 
                connection between the artist's thought process and the resulting output. This approach fosters experimentation and improvisation.
            </p>
        </section>

        <!-- Section 3: Italian Node Contributors -->
        <section>
            <h2>Italian Node Contributors</h2>
            <div class="contributors">
                <AboutCard v-for="contributor in data" :key="contributor.name" :contributor="contributor"></AboutCard>
            </div>
        </section>
    </div>
</template>

<script setup>
const {data,status,error} = (await useFetch('/api/contributors'))


</script>

<style scoped>
#about {
    padding: 2rem;
}

section {
    margin-bottom: 2rem;
}

.contributors {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}


</style>
