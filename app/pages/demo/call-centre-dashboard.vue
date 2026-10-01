<template>




<div class="flex gap-2 items-center my-2   ">

  <ui-btn-link to="/demo/components">Components</ui-btn-link>
  <ui-btn-link to="/demo/form">Form</ui-btn-link>

  <ui-btn-link to="/demo/page-types">Page Types</ui-btn-link>
</div>



















</template>

<script lang="ts" setup>
const title =useTitle()
onMounted(()=>{
  title.value.title = "Call Centre Dashboard";
  title.value.description = undefined
})

</script>
 