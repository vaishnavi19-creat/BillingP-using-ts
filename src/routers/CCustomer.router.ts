import { CBaseRouter } from "./CBase.router";
import { Express } from "express";
import { CCustomerController} from "../controllers/CCustomer.controller";
import { CCustomerValidator } from "../validators/CCustomer.validator";


class CCustomerRouter extends CBaseRouter {

    constructor() {
        super();
        this.getRoutes();
        this.postRoutes();
        this.putRoutes();
        this.deleteRoutes();
    }

    getRoutes() {
        // console.log('In getRoute() from CSignUpRouter');
        // this.router.get( '/getAllShops', CShopValidator.validateGetAllShops(), CShopController.getAllShops );
    }
    postRoutes() {
        console.log('In postRoute() from CCustomerRouter');
        this.router.post( '/new-customer', CCustomerValidator.validateNewCustomer(), CCustomerController.addCustomer );
    }

    putRoutes() {
        console.log('In putRoute() from CCustomerRouter');
    
        // PUT route for updating both new and old customers(created different endpoint)
        this.router.put('/customer', CCustomerValidator.validateCustomer(), CCustomerController.updateorcreateCustomer);
    }
    

    // patchRoutes() {
    //     console.log('In patchRoute() from CCustomerRouter');
    //     this.router.patch( '/new-customer', CCustomerValidator.validateNewcustomer(), CCustomerController.updateCustomer );
    // }
    deleteRoutes() {
        console.log('In deleteRoute() from CCustomerRouter');
    
        // DELETE route for deleting customers (both new and old)
        this.router.delete('/customer', CCustomerValidator.validateCustomer(), CCustomerController.deleteCustomer);
    }
    
}

export default new CCustomerRouter().router;