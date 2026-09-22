export interface Lender {
  id: number
  name: string
  icon: string
  userType: string
  color: string
}

export interface UserInfo {
  id: number
  name: string
}

export interface User {
  userInfo: UserInfo
  lenders: Lender[],
  userColor: {
    primary: string
  }
  userMenu: UserMenu
}

export interface UserColor{
  primary: string
}

export interface UserMenuItem{
  label:string, icon: string, badge:string,chip:Boolean
}
export interface UserMenu{
  items: UserMenuItem[]
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const pending = ref(false)
  const error = ref<Error | null>(null)
  const selectedLender = ref<Lender | null>(null);
  const sidebarOpenFlag = ref<Boolean>(true);


  async function loadUser() {
    if(pending.value === true) return;
    if(user.value!==null) return;

    pending.value = true
    error.value = null
    try {
      user.value = {
        userInfo: {
          id: 1,
          name: 'John Doe'          
        },
        lenders: [
          { id: 1, name: 'Meridian Bridge Capital', icon: 'ME', userType: 'BPO Platform Admin', color: '#0075de' ,  },
          { id: 2, name: 'Northgate Credit Union', icon: 'NR', userType: 'BPO Platform Admin', color: 'red' },
          { id: 3, name: 'Clearwater Prets', icon: 'CL', userType: 'User', color: '#775500' }
        ],
        userColor:{
          primary: '#0075de'
        },
        userMenu:{
          items:[
            {label: 'Call Centre Dashboard', icon:'i-lucide-inbox',badge:'',chip:false, to:'/demo/call-centre-dashboard' },
            {label: 'Executive Reporting Dashboard', icon: 'lucide:layout-dashboard', badge:'', chip:false, to:'/demo/report'},
            {label: 'Settings', icon:'i-lucide-settings', badge:'', chip:false},
            {label: 'Administroation',icon:'lucide:settings-2',badge:'',chip:false},

          ]
        }
      }

      await selectLender(user.value.lenders[0]);


    } catch (e) {
      error.value = e as Error
    } finally {
      pending.value = false
    }
  }




  async function selectLender(n:Lender){
    selectedLender.value = n;
    user.value.userColor.primary=selectedLender.value.color;
  }
  const lenderDropdownOptions = computed<DropdownMenuItem[]>(()=>{
    return [
      user.value?.lenders?.map((lender,index)=>(
        {
          
          label: lender.name,
          avatar:{
            text: lender.icon,
            color: 'secondary'
          },
          kbds: ['meta', String(index+1)],
          onSelect(){
            selectLender( lender)
          }
        }
      ))
    ]
  })

  

  return { user, pending, error, loadUser, lenderDropdownOptions, selectLender , selectedLender,sidebarOpenFlag}
})
