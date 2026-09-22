<template>
     <UFormField size="sm" :label="label" 
      :ui="{
        label: 'text-[12px] font-semibold capitalize ',
        labelWrapper:'',
        wrapper:'m-0 p-0',
        container:'p-0 m-0',
        description: 'm-0',
        error: 'm-0',
        help: 'm-0'
      }"     
     >
      <UInput v-model:value="model"  />
     </UFormField>
</template>

<script lang="ts" setup>
const model = defineModel();
defineProps<{
  label: string
}>();
</script>

<style scoped>

</style>