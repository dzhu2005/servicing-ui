<template>
      <div class="flex gap-2 items-center my-2   ">
    <ui-btn-primary>Submit</ui-btn-primary>
    <ui-btn-primary-sm>Submit</ui-btn-primary-sm>  
    <ui-btn-link>Submit</ui-btn-link>
    <ui-btn-link-sm>Submit</ui-btn-link-sm>
  </div>

  <div class="flex gap-2 items-center mb-2">
    <ui-btn-primary icon="lucide:arrow-big-right">Submit</ui-btn-primary>
    <ui-btn-primary-sm  icon="lucide:arrow-big-right">Submit</ui-btn-primary-sm>

    <ui-btn-link  icon="lucide:arrow-big-right">Submit</ui-btn-link>
    <ui-btn-link-sm  icon="lucide:arrow-big-right">Submit</ui-btn-link-sm>

  </div>

 


  <div class="flex gap-2 items-center mb-2">
      <div class="flex items-center gap-4">
    <USkeleton class="size-12 rounded-full" />

    <div class="grid gap-2">
      <USkeleton class="h-4 w-[250px]" />
      <USkeleton class="h-4 w-[200px]" />
    </div>
  </div>

  </div>


</template>
<script setup lang="ts">

</script>