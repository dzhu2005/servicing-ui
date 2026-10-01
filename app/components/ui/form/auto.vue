<template>
  <UForm :schema="schema"  :state="model" @submit="onSubmit"
  :validateOn="['change']"
  class="grid gap-3 
  
min-[200px]:grid-cols-1
min-[420px]:grid-cols-2
min-[640px]:grid-cols-3
min-[860px]:grid-cols-4
min-[1080px]:grid-cols-5
min-[1300px]:grid-cols-6
min-[1520px]:grid-cols-7
min-[1740px]:grid-cols-8
min-[1960px]:grid-cols-9
min-[2180px]:grid-cols-10
min-[2400px]:grid-cols-11
min-[2620px]:grid-cols-12
min-[2840px]:grid-cols-13
min-[3060px]:grid-cols-14
min-[3280px]:grid-cols-15
min-[3500px]:grid-cols-16
min-[3720px]:grid-cols-17
min-[3940px]:grid-cols-18
min-[4160px]:grid-cols-19
min-[4380px]:grid-cols-20
  
  "
  >
    <div 
    v-for="f in form.schema" :key="f.field_name"
    :class="{ 'col-span-full' : f.type=='divider'  }"
    >
      <div v-if="f.type == 'email'">
        <ui-input-text
          :name="f.field_name"
          :label="f.label"
          v-model="model[f.field_name]"
        />
      </div>

      <div v-if="f.type == 'text'">
        <ui-input-text
          :name="f.field_name"
          :label="f.label"
          v-model="model[f.field_name]"
        />
      </div>

      <div v-if="f.type=='divider'"  >
        
      </div>

      <div v-if="f.type=='textarea'">
        <ui-input-textarea
         :name="f.field_name" 
        :label = "f.label"
        v-model="model[f.field_name]"
        />        
      </div>

      <div v-if="f.type=='int'">
        <ui-input-int       
        :name="f.field_name" 
        :label = "f.label"
        v-model="model[f.field_name]"
        />        
      </div>
      
      <div v-if="f.type=='number'">
        <ui-input-number
        :name="f.field_name"
        :label="f.label"
        v-model="model[f.field_name]" />
      </div>
  
      <div v-if="f.type=='rate'">
        <ui-input-rate  :name="f.field_name"
        :label="f.label"
        v-model="model[f.field_name]" />
      </div>

      <div v-if="f.type=='currency'">
        <ui-input-currency :name="f.field_name"
        :label="f.label"
        v-model="model[f.field_name]" />
      </div>


            <div v-if="f.type=='date'">
        <ui-input-date :name="f.field_name"
        :label="f.label"
        v-model="model[f.field_name]" />
      </div>

    </div>
  </UForm>


  

</template>

<script lang="ts" setup>
const z = useZod();
var model = defineModel();
const props = defineProps<{ form: DZFormType }>();


const getRequiredMessage = (validationOptions:DZSchemaValidationType[] )=>{
  if(validationOptions){
    let opt = validationOptions.find(x=>x.rule =='required');
    if(opt) return opt.message;
  }
  return '';
}





const setupZodOptions=()=>{
  let validationOptions = {};
  for (let i = 0; i < props.form.schema.length; i++) {
    let o = props.form.schema[i];
    if (o == null) continue;
    if (!o.field_name) continue;

    if (o.type == "email") {
      let rules = z.string().trim().email().nullable();
      if (o.validations != null) {
        if (o.validations.some((x) => x.rule == "optional"))
          rules = rules.or(z.literal(""));
      }
      validationOptions[o.field_name] = rules;
    }

    if (o.type == "text" || o.type=="textarea") {
      let rules = z.string().trim();    
      
      if (o.validations != null) {
        for (let i = 0; i < o.validations.length; i++) {
          if (o.validations[i].rule == "max") {
            let msg = o.validations[i]?.message || `Please enter no more than ${o.validations[i]?.option} characters.`;
            rules = rules.max(o?.validations[i].option,msg);
          }
          if (o?.validations[i].rule == "min"){
            let msg = 
              o.validations[i]?.message || `Please enter ${o.validations[i]?.option} or more characters.`;          
              rules = rules.min(o.validations[i].option ,msg) ;
          }
        }
      }

      if( o.validations == null || o.validations?.length==0 || o.validations?.some(x=>x.rule=='optional')){
        rules = rules.nullish();
      }
      validationOptions[o.field_name] = rules;
    }

    //#region int
    if(o.type=='int'){
      let rules = z.int();
      if(o.validations){
        for (let i = 0; i < o.validations.length; i++) {
          if(o.validations[i].rule=='max'){
            let msg = o.validations[i].message || `Please enter a number less than ${o.validations[i]?.option}. `
          rules = rules.max(o.validations[i]?.option , msg);
          }
          if(o.validations[i].rule=='min'){
            let msg = o.validations[i].message || `Please enter a number more than ${o.validations[i]?.option}. `
            rules =rules.min(o.validations[i]?.option , msg);
          }
        }
      }
    if( o.validations == null || o.validations?.length==0 || o.validations?.some(x=>x.rule=='optional')){
        rules = rules.nullish();
      }
      validationOptions[o.field_name] = rules;
    }
    //#endregion

    //#region number
    if(o.type=='number'){
      let rules = z.number();
      if(o.validations){
        for (let i = 0; i < o.validations.length; i++) {
          if(o.validations[i].rule=='max'){
            let msg = o.validations[i].message || `Please enter a number less than ${o.validations[i]?.option}. `
          rules = rules.max(o.validations[i]?.option , msg);
          }
          if(o.validations[i].rule=='min'){
            let msg = o.validations[i].message || `Please enter a number more than ${o.validations[i]?.option}. `
            rules =rules.min(o.validations[i]?.option , msg);
          }
        }
      }
        if( o.validations == null || o.validations?.length==0 || o.validations?.some(x=>x.rule=='optional')){
        rules = rules.nullish();
      }
      validationOptions[o.field_name] = rules;
    }
    //#endregion
    
    //#region rate
    if(o.type=='rate'){
      let rules = z.number().min(0).max(100);
      
        if( o.validations == null || o.validations?.length==0 || o.validations?.some(x=>x.rule=='optional')){
        rules = rules.nullish();
      }
      validationOptions[o.field_name] = rules;
    }
    //#endregion

    //#region currency
    if(o.type=='currency'){
      

      let rules = z.number(getRequiredMessage(o.validations));

      


      if( o.validations == null || o.validations?.length==0 || o.validations?.some(x=>x.rule=='optional')){
        rules = rules.nullish();
      }
      validationOptions[o.field_name] = rules;
    }
    //#endregion

    //#region date
    if(o.type=='date'){
      let rules = z.string();
      if( o.validations == null || o.validations?.length==0 || o.validations?.some(x=>x.rule=='optional')){
        rules = rules.nullish();
      }
      validationOptions[o.field_name] = rules;
    }
    //#endregion

  }
  return validationOptions;
}



const schema = z.object(setupZodOptions());

const onSubmit = () => {
  console.log("submit");
};




/*
This field is required.
Please specify a valid phone number.
Please enter at least 2 characters.
Please specify a valid Canadian postal code.
Please enter a valid email address.

*/

/*

Required field
No more than 100 characters
Invalid data format
Invalid URL
Can't be blank


Your password must contain at least 8 characters
The name field is required.

Please enter a valid email address.
It must be at least 6 characters long.

Value must be greater than or equlal to 6.
Value must be less than or equla to 6.
*/




/*

Please enter 2 or more characters.
Please enter no more than 5 characters.

*/




</script>
 