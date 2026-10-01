<template>
<div class="flex gap-2 items-center my-2   ">

  <ui-btn-link to="/demo/page-types/">Grid</ui-btn-link>
  <ui-btn-link to="/demo/page-types/">Deal</ui-btn-link>
</div>

</template>

<script lang="ts" setup>
const title =useTitle()
onMounted(()=>{
  title.value.title = "Page Types";
  title.value.description = ""
})
</script>

<style>

</style>