<template>
  <div class="p-4">
    <ui-form-auto v-model="data.user" :form="form" />

    <hr />
    <div>{{ data }}</div>
  </div>
</template>

<script lang="ts" setup>
const title = useTitle();
onMounted(() => {
  title.value.title = "JS >Form";
  title.value.description = "";
});

const data = ref({ user: { first_name: "John", user_type_dd: 2 } });

const schema = ref<DZSchemaType[]>([
  {
    field_name: "email",
    type: "email",
    label: "email address",
    validations: [{ rule: "email", message: "Email is invalid" }],
  },
  {
    field_name: "user_type_dd",
    type: "dd",
    label: "user type"
  },
]);

const form = ref<DZFormType>({
  layout: { type: "auto" },
  schema: schema,
});
</script>
 