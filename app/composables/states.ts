
export interface titleModel{
  title : String,
  description?: String
}
export const useTitle = () => useState<titleModel>('title',()=>{

    return {
      title: '',
      description: ''
    }

})