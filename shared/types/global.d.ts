
export interface DZSchemaDDOptionType{
    label: string,
    value: number
}
export interface DZSchemaValidationType{
        rule: 'max'| 'min' | 'length' | 'required' | 'email' | 'optional'
        option?: number,
        message?: string
    }
 export interface DZSchemaType{
        field_name?: string, //support path, for example user.name.first_name
        label?: string,
        type: 'divider' | 'email' | 'text' | 'textarea' | 'int' | 'number' | 'perctange' | 'rate' | 'date' | 'date-range' | 'currency' | 'bool' | 'dd' | 'dd-searchable' | 'dd-multiple' | 'dd-multiple-searchable'
        
        dd_menu?: string,
        dd_options?: DZSchemaDDOptionType[],        
        validations?: DZSchemaValidationType[]
    }
export interface DZFormLayoutType{
    type: "auto" | undefined,
}
export interface DZFormType{
    schema: DZSchemaType[],
    layout: DZFormLayoutType
}
 