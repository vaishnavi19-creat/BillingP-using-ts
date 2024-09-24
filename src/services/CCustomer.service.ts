import { errorTypeEnum } from "../enums/errorType.enum";
import { CCustomErrors } from "../helpers/CCustomErrors.helper";
import { SignUpResp } from "../interfaces/CCustomer.interface";
import { CCustomerModel } from "../db/models/CCustomer.model";

const objCustomerModel = new CCustomerModel();

export class CCustomerService {
    [x: string]: any;

    async addNewCustomer(request: SignUpResp) {
        try {
            console.log('In CCustomerService => signUp() ');

            const existingCustomerMobileNo = await this.getCustomerDetailsByCustomerMobileNo(request.customerMobileNo);
            if (existingCustomerMobileNo) {
                console.log('Caught in input validation error from CCustomerService => signUp() existing mobile number');
                const duplicateMobileNoError = {
                    errors: [
                        {
                            value: existingCustomerMobileNo.customerMobileNo,
                            msg: `The customer mobile number ${existingCustomerMobileNo.customerMobileNo} already exists. Please try with another number.`,
                            param: "customerMobileNo",
                            location: "body"
                        }
                    ]
                };
                throw new CCustomErrors(
                    new Error(`The mobile number ${existingCustomerMobileNo.customerMobileNo} already exists.`),
                    errorTypeEnum.INPUT_VALIDATION_ERROR,
                    duplicateMobileNoError
                );
            }

            // Validate email ID uniqueness
            const existingCustomerEmailId = await this.getCustomerDetailsByCustomerEmailId(request.customerEmailId);
            if (existingCustomerEmailId) {
                console.log('Caught in input validation error from CCustomerService => signUp() existing email id');
                const duplicateEmailIdError = {
                    errors: [
                        {
                            value: existingCustomerEmailId.customerEmailId,
                            msg: `The customer email id ${existingCustomerEmailId.customerEmailId} already exists. Please try with another email id.`,
                            param: "customerEmailId",
                            location: "body"
                        }
                    ]
                };
                throw new CCustomErrors(
                    new Error(`The email id ${existingCustomerEmailId.customerEmailId} already exists.`),
                    errorTypeEnum.INPUT_VALIDATION_ERROR,
                    duplicateEmailIdError
                );
            }

            // Save the new customer
            const savedCustomer = await objCustomerModel.addCustomer(request);
            console.log(JSON.stringify(savedCustomer));
            
            return savedCustomer;
        } catch (error) {
            throw error;
        }
    }


    
    async getCustomerDetailsByName(customerName: string) {
        // Updated the method to only check customer by name (removed zip code validation)
        try {
            console.log('Validating existing customer from CCustomerService => getCustomerDetailsByName()');
            return await objCustomerModel.getCustomerDetailsByName({ customerName }); // Removed zip code from parameters
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }

    async getCustomerDetailsByCustomerMobileNo(customerMobileNo: string) {
        try {
            console.log('Validating existing mobile number from CCustomerService => getCustomerDetailsByCustomerMobileNo()');
            return await objCustomerModel.getCustomerDetailsByMobileNumber(customerMobileNo);
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }

    async getCustomerDetailsByCustomerEmailId(customerEmailId: string) {
        try {
            console.log('Validating existing email id from CCustomerService => getCustomerDetailsByCustomerEmailId()');
            return await objCustomerModel.getCustomerDetailsByEmailId(customerEmailId);
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }

    async getAllCustomer(limit: number = 10, pageNumber: number = 1) {
        try {
            console.log('Retrieving all customers from CCustomerService => getAllCustomer()');
            return await objCustomerModel.getAllCustomers(limit, pageNumber);
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }
}




