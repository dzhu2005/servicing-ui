<template>

      <UForm :schema="schema" :state="model" @submit="onSubmit">


        <div v-for="f in form.schema" :key="f.field_name">
          <ui-input-text :name="f.field_name" 
          :label="f.label" 
          v-model="model[f.field_name]" />
        </div>
 

      </UForm>
</template>

<script lang="ts" setup>
 const z = useZod();
var model = defineModel();
const props = defineProps<{ form: DZFormType }>();



let validationOptions ={};
props.form.schema.forEach(o=>{
  
  if( o.validations){
    o.validations.forEach(v=>{

      let rules = undefined;
      if(v.rule=='email'){
        rules = z.email( v.message );         
      }


      validationOptions[o.field_name] = rules;
    })
  }
  
 
  
})


const schema = z.object(validationOptions)
// const schema = z.object({
//   'email': z.email('Invalid email'),
//   'password': z.string('Password is required').min(8, 'Must be at least 8 characters')
// })
 

const onSubmit=()=>{
  console.log( 'submit' )
}


</script>
 