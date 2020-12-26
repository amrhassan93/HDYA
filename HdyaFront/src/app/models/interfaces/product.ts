export interface Product {
    id?:number;
    name:string;
    price:number;
    details:string;
    age_from:number;
    age_to:number;
    gender:string;
    occassions:Array<number>;
    category:number;
    relationships:Array<number>;
    is_featured:boolean;
    created_at?:string;
    updated_at?:string;
    productpicture_set:Array<object>;
}
   
    
