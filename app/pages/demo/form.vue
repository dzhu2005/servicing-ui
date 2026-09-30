<template>
  <div class="p-4">
    <UForm :schema="schema" :state="state" @submit="onSubmit">
      <div class="grid grid-cols-1 gap-2">

      <ui-input-text name="email" label="Email address" v-model="state.email" />
      <ui-input-text name="password" label="password" v-model="state.password" />



      </div>
      
      <div class=" mt-4">
<ui-btn-primary type="submit">Submit</ui-btn-primary>
      </div>
      
    </UForm>

  </div>

  <div>{{ state }}</div>
</template>

<script lang="ts" setup>
const title =useTitle()
onMounted(()=>{
  title.value.title = "Form";
  title.value.description = ""
})


const data = {
  first_name : 'John',
  user_type_dd: 2
};

 
const z = useZod();
let validationOptions ={}
validationOptions['email'] = z.email('Invalid')
const schema = z.object(validationOptions)
// const schema = z.object({
//   'email': z.email('Invalid email'),
//   password: z.string('Password is required').min(8, 'Must be at least 8 characters')
// })


type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined
})

const onSubmit=()=>{
   console.log( 'submit')
}


</script>
 