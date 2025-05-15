<template lang="html">
    <div class="card">
        <img :src="contributor.image" :alt="contributor.name" />
        <div class="info">
            <h3>{{ contributor.name }}</h3>
            <p>{{ contributor.phrase }}</p>
        </div>
    </div>
</template>
<script setup>
const props = defineProps(['contributor'])


</script>
<style lang="css" scoped>
.card {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    width: 100%;
    max-width: 400px;
}

.card img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 1rem;
}

.card .info {
    flex: 1;
}

.card h3 {
    margin: 0;
    font-size: 1.2rem;
}

.card p {
    margin: 0.5rem 0 0;
    color: #555;
}
</style>