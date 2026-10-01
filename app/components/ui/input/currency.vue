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
     <UInput
     icon="lucide:dollar-sign"
     :model-value="text" class="w-full" inputmode="decimal" @update:model-value="onInput" @blur="onBlur" />
     </UFormField>
</template>

<script lang="ts" setup>
const model = defineModel<number | undefined>();
defineProps<{
  label: string
  name: string
}>();

// Display a number with exactly 2 decimals, e.g. 20 -> "20.00"
function format(value: number | undefined) {
  return value == null ? '' : value.toFixed(2);
}

// Raw text shown in the input, so partial entries like "-" or "1." aren't lost while typing
const text = ref(format(model.value));

// Keep only digits, one leading minus and one decimal point
function sanitize(value: string) {
  const negative = value.trimStart().startsWith('-');
  const [whole = '', ...rest] = value.replace(/[^\d.]/g, '').split('.');
  const decimal = rest.length ? '.' + rest.join('') : '';
  return (negative ? '-' : '') + whole + decimal;
}

// Round to 2 decimals (half away from zero); the exponent shift avoids float errors like 1.005 -> 1.00
function roundToCents(value: string) {
  if ((value.split('.')[1] ?? '').length <= 2) return value;
  const negative = value.startsWith('-');
  const rounded = Number(Math.round(Number(value.replace('-', '') + 'e2')) + 'e-2');
  return (negative && rounded !== 0 ? '-' : '') + rounded.toFixed(2);
}

function onInput(value: string | number) {
  const cleaned = roundToCents(sanitize(String(value ?? '')));
  // Force the input to re-render even when the cleaned value equals the previous text
  text.value = String(value);
  nextTick(() => (text.value = cleaned));

  const parsed = parseFloat(cleaned);
  model.value = Number.isNaN(parsed) ? undefined : parsed;
}

// Pad to 2 decimals once the user is done typing
function onBlur() {
  text.value = format(model.value);
}

watch(model, (value) => {
  if (value !== parseFloat(text.value)) {
    text.value = format(value);
  }
});
</script>

<style scoped>

</style>
