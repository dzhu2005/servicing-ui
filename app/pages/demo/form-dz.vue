<template>
  <div class="p-4">
    <ui-form-auto v-model="data.user" :form="form" />

    <hr class="my-4" />
    <div>{{ data }}</div>
    <div>

      {{ width }} / {{ height }}

    </div>

    <div v-for="i in 20" :key="i">
      min-[{{ (200 * i) + (20 * (i-1)) }}px]:grid-cols-{{ i }}
      
    </div>
  </div>
</template>

<script lang="ts" setup>
const title = useTitle();
onMounted(() => {
  title.value.title = "JS >Form";
  title.value.description = "";
});

const data = ref({ user: { email: '', first_name: "John",

last_name : null,
notes: null,
age: 2,
lot_size: 4.5,
rate: 3.85,
price: 345.34,
DOB: new Date()
} });

const schema = ref<DZSchemaType[]>([
  {
    field_name: "email",
    type: "email",
    label: "email address",
    validations: [{ rule: "email", message: "Email is invalid" }, { rule: 'optional'}],
  },
  {
    field_name: 'first_name',
    type:'text',
    label:"First Name",
    validations:[{rule: 'required' }, { rule: 'min', option: 2 }, {rule: 'max', option: 5}]
  },
  { 
    type: 'divider'
  },
    {
    field_name: 'last_name',
    type:'text',
    label:"last Name (optional)",
    
  },
  {
    field_name: "notes",
    type: "textarea",
    label: "notes",
    validations:[{rule: 'optional' }, { rule: 'min', option: 2 }, {rule: 'max', option: 5}]
  },
  {
    field_name: "age",
    type: 'int',
    label:'age',
    validations:[{rule: 'min', option: 30 }, { rule:'max', option: 130}, {rule: 'optional'}]
  },
  {
    field_name: "lot_size",
    type: "number",
    label:" Lot size",
    validations:[{rule: 'max', option: 10},{rule:'min', option:0}]
  },
  {
    field_name: 'rate',
    type: 'rate',
    label: 'Rate'
  },
  {
    field_name: 'price',
    type: 'currency',
    label: 'price',
    validations:[{rule: 'required', message: 'Price is required'}]
  },
  {
    field_name: 'BOD',
    type:'date',
    label: 'Birth Day'
  }
]);

const form = ref<DZFormType>({
  layout: { type: "auto" },
  schema: schema,
});



const { width, height } = useWindowSize()

</script>
 