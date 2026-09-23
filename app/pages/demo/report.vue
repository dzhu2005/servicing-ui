<template>
  <div>
    Executive Reporting Dashboard
  </div>
</template>

<script lang="ts" setup>
const title =useTitle()
onMounted(()=>{
  title.value.title = "Executive. Reporting Dashboard";
  title.value.description = undefined
})
</script>

<style>

</style>