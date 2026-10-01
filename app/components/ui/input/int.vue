<template>
     <UFormField size="sm" :name="name" :label="label" 
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
     <UInputNumber  class="w-full" v-model="model" />
     </UFormField>
</template>

<script lang="ts" setup>
const model = defineModel();
defineProps<{
  label: string
  name: string
}>();
</script>

<style scoped>

</style>