<template>
  <div class="p-4">
    <UForm>
      <ui-input-text label="First name" v-model="textValue" />
      <ui-input-text label="First name" v-model="textValue" />
    </UForm>

  </div>
</template>

<script lang="ts" setup>
const uiStore = useUiStore()
uiStore.setTitle('Form')
 

  const textValue=ref('')
</script>
 