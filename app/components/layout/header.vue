<template>
      <header class="flex gap-1  p-4 justify-between items-center border-b border-slate-300 ">        
        <UButton 
        color="neutral"
        @click=" userStore.sidebarOpenFlag = !userStore.sidebarOpenFlag"  variant="ghost">
          <UIcon v-if="userStore.sidebarOpenFlag" class="size-6" name = "lucide:panel-left-close" />
          <UIcon v-else class="size-6" name="lucide:panel-left-open" />
        </UButton>        



        <div>
          
          <div class=" font-semibold">{{ uiStore.ui.header.title }}</div>

        </div>



        <div><UButton color="neutral" variant="ghost" icon="lucide:bell" /></div>        
      </header>
</template>

<script lang="ts" setup>
const userStore = useUserStore()
const uiStore = useUiStore()
</script>

<style>

</style>