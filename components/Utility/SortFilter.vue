<template lang="html">
    <slot ></slot>
</template>
<script setup>
const emit = defineEmits(['updateSort', 'updateFilter'])
const totalFilters = ref({})
const sort = ref('')

const updateSort = (sortOrder) => {
    sort.value = sortOrder
    emit('updateSort', sortOrder)
}

const updateFilter = (title,selectedFilters) => {
    // console.log(title, selectedFilters)
    totalFilters.value[title] = selectedFilters
    emit('updateFilter', totalFilters.value)
}

// provide
provide('updateSort', updateSort)
provide('updateFilter', updateFilter)

</script>
<style lang="css">

</style>