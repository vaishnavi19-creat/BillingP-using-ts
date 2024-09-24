import { body } from "express-validator";

export class CCustomerValidator {
    // Fixing the validateCustomer method
    static validateCustomer() {
        console.log('Validating validateCustomer request....');
        return [
            body('Name', 'Please provide a valid name.').notEmpty().trim().escape().isString().withMessage('Name is required'),
            body('MobileNo', 'Please provide a valid mobile number.').notEmpty().trim().escape().matches(/^(\+91)?\d{10}$/).withMessage('Mobile number must start with +91 (optional) and contain exactly 10 digits.'),
            body('Email', 'Please provide a valid email address.').notEmpty().trim().escape().isEmail().withMessage('Invalid email format'),
            body('Address', 'Please provide a valid address.').notEmpty().trim().escape().isString().withMessage('Address is required').isLength({ min: 10, max: 500 }).withMessage('Address should be between 10 and 500 characters'),
            body('GSTNo', 'Please provide a valid GST number.').trim().escape().isAlphanumeric().withMessage('GST number is required').isLength({ min: 15, max: 15 }).withMessage('GST number must be 15 characters').matches(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{2}/).withMessage('GST number must be in the correct format'),
            body('logo', 'Please provide a valid logo URL.').optional().trim().escape().isURL().withMessage('Logo must be a valid URL'),
        ];
    }

    static validateNewCustomer() {
        console.log('Validating validateNewCustomer request....');
        return [
            ...this.validateCustomer(),
        ];
    }
}


