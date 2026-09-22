<script setup lang="ts">
const userStore = useUserStore()
await userStore.loadUser()
</script>

<template>
  <div class="flex  gap-4 min-h-dvh">
    <layout-sidebar />
    <div class="flex-1 flex-col rounded-xl border border-slate-300 my-4 mx-4 bg-white">
      <layout-header />
      <main class="flex-1 p-4 text-sm"><slot /></main>      
    </div>
  </div>


<layout-app-footer />


</template>
