<template>




<div class="flex gap-2 items-center my-2   ">

  <ui-btn-link to="/demo/components">Components</ui-btn-link>
  <ui-btn-link to="/demo/form">Form</ui-btn-link>

</div>



















</template>

<script lang="ts" setup>
 const uiStore = useUiStore()
uiStore.setTitle('Call Centre Dashboard')

</script>
 