<template>
  <UFormField
    size="sm"
    :name="name"
    :label="label"
    :ui="{
      label: 'text-[12px] font-semibold capitalize ',
      labelWrapper: '',
      wrapper: 'm-0 p-0',
      container: 'p-0 m-0',
      description: 'm-0',
      error: 'm-0',
      help: 'm-0',
    }"
  >
    <UInput
      :model-value="text"
      class="w-full"
      placeholder="YYYY-MM-DD"
      maxlength="10"
      @update:model-value="onInput"
      @blur="onBlur"
    >
      <template #trailing>
        <UPopover v-model:open="open">
          <UButton
            variant="link"
            size="sm"
            color="neutral"
            icon="i-lucide-calendar"
          />
          <template #content>

 
                <div>
              <UCalendar
                :number-of-months="numberOfCalendar"
                v-model="calendarValue"
                class="p-2"
              />

              <div class="flex justify-between gap-4 p-2">
                <ui-btn-primary-sm @click="onClear">Clear</ui-btn-primary-sm>

                <ui-btn-primary-sm @click="onToday">Today</ui-btn-primary-sm>
              </div>
            </div>
              
  




           
          </template>
        </UPopover>
      </template>
    </UInput>
  </UFormField>
</template>

<script lang="ts" setup>
import { type CalendarDate, getLocalTimeZone, parseDate, today } from "@internationalized/date";
const { width } = useWindowSize();

const numberOfCalendar = computed(() => {
  // if( width.value > 1000) return 3;
  // if( width.value > 600) return 2;
  return 1;
});

const model = defineModel<string | undefined>();
defineProps<{
  label: string;
  name: string;
}>();

const open = ref(false);

// Parse a "YYYY-MM-DD" string; returns undefined for partial or impossible dates like "2023-02-30"
function toCalendarDate(value: string | undefined) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  try {
    const date = parseDate(value);
    // parseDate clamps out-of-range days, so round-trip to reject them
    return date.toString() === value ? date : undefined;
  } catch {
    return undefined;
  }
}

// Raw text shown in the input, so partial entries like "1999-01" aren't lost while typing
const text = ref(model.value ?? "");

function onInput(value: string | number) {
  // Keep only digits and dashes
  const cleaned = String(value ?? "").replace(/[^\d-]/g, "");
  // Force the input to re-render even when the cleaned value equals the previous text
  text.value = String(value);
  nextTick(() => (text.value = cleaned));

  if (!cleaned) {
    model.value = undefined;
    return;
  }
  const date = toCalendarDate(cleaned);
  if (date) model.value = date.toString();
}

// Discard an incomplete/invalid entry once the user is done typing
function onBlur() {
  text.value = model.value ?? "";
}

const calendarValue = computed({
  get: () => toCalendarDate(model.value),
  set: (date: CalendarDate | undefined) => {
    model.value = date?.toString();
    open.value = false;
  },
});

function onToday() {
  calendarValue.value = today(getLocalTimeZone());
}

function onClear() {
  calendarValue.value = undefined;
}

watch(model, (value) => {
  if ((value ?? "") !== text.value) {
    text.value = value ?? "";
  }
});
</script>

<style>
</style>
