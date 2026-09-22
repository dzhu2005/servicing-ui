<template>
  <div class="p-4">
    <UForm :schema="schema" :state="state" @submit="onSubmit">
      <ui-input-text name="email" label="Email address" v-model="state.email" />
      <ui-input-text name="password" label="password" v-model="state.password" />


      <ui-btn-primary type="submit">Submit</ui-btn-primary>
    </UForm>

  </div>

  <div>{{ state }}</div>
</template>

<script lang="ts" setup>
const uiStore = useUiStore()
uiStore.setTitle('Form')
 

  
const z = useZod();

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string('Password is required').min(8, 'Must be at least 8 characters')
})


type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined
})


const onSubmit=(event: FormSubmitEvent<Schema>)=>{
  console.log( 'submit')
}



</script>
 