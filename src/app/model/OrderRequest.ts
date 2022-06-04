import { ProductBucket } from "./products-bucket";

export class OrderRequest{
    constructor(
        private name:string,
        private address:string,
        private telephone:string,
        private products: Array<ProductBucket>,
        private email?:string
    ){

    }
}