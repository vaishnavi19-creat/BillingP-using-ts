import { CCustomerEntities } from "../entities/CCustomer.entities";
import AppDataSource from "../dataSource";
import { SignUpReq, SignUpResp, getAllCustomers, getCustomerDetailsByCustomerEmailIdResp, getCustomerDetailsByCustomerNameResp } from "../../interfaces/CCustomer.interface";  

export class CCustomerModel {
    addCustomer(request: SignUpReq) {
        throw new Error("Method not implemented.");
    }  
    protected repository;
    addNewCustomer: any;
    constructor() {
        this.repository = AppDataSource.getRepository( CCustomerEntities );  
    }

    public async signUp(objNewCustomer: SignUpReq): Promise<SignUpResp> {
        try {
            console.log('Jumped in CCustomerModel => signUp()');
    
           
            const { customerId, customerName, customerAddress, customerMobileNo, customerEmailId, customerGSTNo, customerlogo } = await this.repository.save(objNewCustomer);
            return { customerId, customerName, customerAddress, customerMobileNo: customerMobileNo,  customerEmailId, customerGSTNo, customerlogo };
        
        } catch (error) {
            throw new Error(error);
        }
    }
    



















    // public async signUp( objNewCustomer: SignUpReq): Promise<SignUpResp> {  
    //     try{
    //         console.log('Jumped in CCustomerModel => signUp()');  

    //         const { customerId, customerName, customerAddress, customerMobileNo, customerEmailId, customerGSTNo} = await this.repository.save( objNewCustomer );  

    //         return { customerId, customerName,customerAddress, customerMobileNo, customerEmailId,customerGSTNo};  
    //     } catch( error ) {
    //         throw new Error( error );
    //     }
    // }

    public async getCustomerDetailsByName({ customerName}: { customerName: string;}): Promise<getCustomerDetailsByCustomerNameResp> {  
        try{
            console.log('Jumped in CCustomerModel => getCustomerDetailsByName()');  

            return await this.repository.findOne({
                select: {
                    customerId: true,
                    customerName: true,
                    customerOwnerName: true
                },
                where: {
                    customerName: customerName,
                    // customerAddress: customerAddress  
                }
            });

        } catch(error) {
            throw new Error( error );
        }
    }

    public async getCustomerDetailsByMobileNumber(customerMobileNumber: string): Promise<getCustomerDetailsByCustomerNameResp> {  
        try{
            console.log('Jumped in CCustomerModel => getCustomerDetailsByMobileNumber()'); 

            return await this.repository.findOne({
                select: {
                    customerId: true,
                    customerName: true,
                    customerOwnerName: true,
                    customerMobileNumber: true
                },
                where: {
                    customerMobileNumber: customerMobileNumber  
                }
            });

        } catch(error) {
            throw new Error( error );
        }
    }

    public async getCustomerDetailsByEmailId(customerEmailId: string): Promise<getCustomerDetailsByCustomerEmailIdResp> {  
        try{
            console.log('Jumped in CCustomerModel => getCustomerDetailsByEmailId()'); 

            return await this.repository.findOne({
                select: {
                    customerId: true,
                    customerName: true,
                    customerOwnerName: true,
                    customerEmailId: true
                },
                where: {
                    customerEmailId: customerEmailId  
                }
            });

        } catch(error) {
            throw new Error( error );
        }
    }

    public async getAllCustomers(limit: number = 10, pageNumber: number = 1): Promise<getAllCustomers[]> {  
        try{
            console.log('Jumped in CCustomerModel => getAllCustomers()');  
            const skip = (limit * pageNumber) - limit;

            return await this.repository
            .createQueryBuilder('customer')  
            .leftJoinAndSelect('customer.customerTypeStatic', 'customerType')  
            .select(['customer.customerId', 'customer.customerName', 'customer.customerOwnerName', 'customer.customerMobileNumber', 'customer.customerEmailId', 'customer.GSTNo', 'customer.logo', 'customerType.customerTypeShortDescription'])  // Updated fields
            .skip(skip)
            .take(limit)
            .getMany();

        } catch(error) {
            throw new Error( error );
        }
    }
}
