 
export interface UI{
  header:{
    title: string
  }
}

export const useUiStore = defineStore('ui',()=>{

  const ui = ref<UI>({
    header:{
      title: ''
    }
  })

  function setTitle(n:string){
    ui.value.header.title = n; 
  }
  
  
  return { ui , setTitle}
})
