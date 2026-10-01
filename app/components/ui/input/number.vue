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
     <UInput :model-value="text" class="w-full" inputmode="decimal" @update:model-value="onInput" />
     </UFormField>
</template>

<script lang="ts" setup>
const model = defineModel<number | undefined>();
defineProps<{
  label: string
  name: string
}>();

// Raw text shown in the input, so partial entries like "-" or "1." aren't lost
const text = ref(model.value == null ? '' : String(model.value));

// Keep only digits, one leading minus and one decimal point
function sanitize(value: string) {
  const negative = value.trimStart().startsWith('-');
  const [whole = '', ...rest] = value.replace(/[^\d.]/g, '').split('.');
  const decimal = rest.length ? '.' + rest.join('') : '';
  return (negative ? '-' : '') + whole + decimal;
}

function onInput(value: string | number) {
  const cleaned = sanitize(String(value ?? ''));
  // Force the input to re-render even when the cleaned value equals the previous text
  text.value = String(value);
  nextTick(() => (text.value = cleaned));

  const parsed = parseFloat(cleaned);
  model.value = Number.isNaN(parsed) ? undefined : parsed;
}

watch(model, (value) => {
  if (value !== parseFloat(text.value)) {
    text.value = value == null ? '' : String(value);
  }
});
</script>

<style scoped>

</style>
