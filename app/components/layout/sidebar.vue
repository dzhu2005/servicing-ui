<template>
    <USidebar
    style="--sidebar-width: 18rem; --sidebar-width-icon: 4rem;" 
     variant="inset"
      v-model:open="userStore.sidebarOpenFlag"
      collapsible="icon"
      rail
      :ui="{
        container: 'shadow-[0px_0px_15px_2px_rgba(0,_0,_0,_0.1)] m-4 bg-[#f5f4f2] h-auto rounded-2xl border border-gray-200 ',
        inner: 'bg-elevated/25 divide-transparent',
        body: 'py-0',
        header: 'flex flex-col pt-4 lg:pt-0',
        footer: 'pb-0'
      }"
    >
      <template #header>
        <UDropdownMenu
        v-model="userStore.selectedLender"
          :items="userStore.lenderDropdownOptions"
          :content="{ align: 'start', collisionPadding: 12 }"
          :ui="{ content: 'w-(--reka-dropdown-menu-trigger-width) bg-white  min-w-65 ' }"
        >
          <div v-if="userStore.sidebarOpenFlag" class="w-full">
            <div class="border border-slate-300 rounded-lg p-2 flex gap-2 items-center w-full cursor-pointer bg-white">            
              <div class="p-2 rounded-md text-white text-xs font-extrabold" :style="'background-color:' + userStore.user.userColor.primary">
                {{  userStore.selectedLender.icon }}
              </div>
              <div class="text-sm flex-1 truncate" v-text="userStore.selectedLender.name"></div>
              <div> <UIcon name="lucide:chevron-down" /> </div>
            </div>
            
          </div>
          <div v-else>
            <div class="border border-slate-300 rounded-lg flex gap-2 items-center w-full cursor-pointer">            
              <div class="p-1.5 rounded-md text-white text-xs font-extrabold" :style="'background-color:' + userStore.user.userColor.primary">
                {{  userStore.selectedLender.icon }}
              </div>
            </div> 
          </div>
        </UDropdownMenu>       
        <div class=" border-b border-slate-300  my-2 w-full" ></div>
      </template>

      <template #default="{ state }">
                <div class="w-full mt-1.5">
          <div v-if="userStore.sidebarOpenFlag">
            <UDashboardSearchButton class="w-full cursor-pointer" />          
          </div>
          <div v-else>
            <div class="border border-slate-300 flex justify-center items-center  p-1.5 cursor-pointer rounded-lg">
              <UIcon name="i-lucide-search" />
            </div>
          </div>
        </div>

         <UNavigationMenu
          :key="state"
          :items="userStore.user.userMenu.items" 
          :collapsed="!userStore.sidebarOpenFlag"
          :tooltip="true"          
          color="primary"          
          variant="pill" 
          :popover="true"
          orientation="vertical"
          :ui="{ 
            link: 'data-active:bg-[#0076de] data-active:text-white text-slate-700  rounded-lg  hover:bg-[#0076de]/10 hover:text-black',
            linkLeadingIcon: 'text-normal',            
            }"
        />  
      </template>

      <template #footer>
        
        <div class="flex flex-col w-full cursor-pointer ">
          <div class=" border-b border-slate-300  my-2 w-full" ></div>
                   <UDropdownMenu
          :items="userItems"
          :content="{ align: 'center', collisionPadding: 12 }"
          :ui="{ content: 'w-(--reka-dropdown-menu-trigger-width) min-w-48 ' }"
        >
          <UButton
            v-bind="user"
            :label="userStore.user.userInfo.name"
            trailing-icon="i-lucide-chevrons-up-down"
            color="neutral"
            variant="ghost"
            square
            class="w-full data-[state=open]:bg-elevated overflow-hidden p-1.5 hover:bg-[#0076de]/10 cursor-pointer "
            :ui="{          
                trailingIcon: 'text-dimmed ms-auto'
            }"
          />
        </UDropdownMenu> 

        </div>

      </template>
    </USidebar>
</template>

<script lang="ts" setup>
const userStore = useUserStore()
 


const userItems = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: 'Profile',
      icon: 'i-lucide-user'
    },
    {
      label: 'Language',
      icon: 'lucide:languages',
      children:[
        {label: 'English'},
        {label:'French'}
    ]
    }
  ], 
  [
    {
      label: 'Support',
      icon: 'lucide:headset',
      to: '/support',
      
    },
    {
      label: 'Log out',
      icon: 'i-lucide-log-out'
    }
  ]
]);


const user = computed<any>(()=>{
  return {
    name: userStore.user?.userInfo.name,
    avatar: {
      text: "JD",
      color: 'primary'
    }
  }
});


defineShortcuts(extractShortcuts(userStore.lenderDropdownOptions))
defineShortcuts({ meta_k: () => { alert('search') } })
</script>
 