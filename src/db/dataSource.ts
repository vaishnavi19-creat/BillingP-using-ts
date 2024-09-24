import { DataSource } from "typeorm";
import { CShopEntities } from "./entities/CShop.entities";
import { CShopTypeEntities } from "./entities/CShopType.entities";
import { CCustomerEntities } from "./entities/CCustomer.entities"; // Import  CCustomerEntities class

const AppDataSource = new DataSource({
    "name": "default",
    "type": "mysql",
    "host": "localhost",
    "username": "root",
    "password": "",
    "database": "my-d-shop",
    "synchronize": true,
    "logging": false,
    "entities": [
        CShopEntities,
        CShopTypeEntities,
        CCustomerEntities // Add CCustomerEntities to the list of entities
    ],
    "migrations": [
        "src/migrations/**/*.ts"
    ],
    "subscribers": [
        "src/subscriber/**/*.ts"
    ]
});

export default AppDataSource;
























// import { DataSource } from "typeorm";
// import { CShopEntities } from "./entities/CShop.entities";
// import { CShopTypeEntities } from "./entities/CShopType.entities";


// const AppDataSource =  new DataSource({
//     "name" : "default",
//     "type" : "mysql",
//     "host" : "localhost",
//     "username": "root",
//     "password": "",
//     "database": "my-d-shop",
//     "synchronize": true,
//     "logging": false,
//     "entities": [
//        CShopEntities, CShopTypeEntities
//        ],
//     "migrations": [
//        "src/migrations/**/*.ts"
//        ],
//     "subscribers": [
//        "src/subscriber/**/*.ts"
//        ]
// });

// export default AppDataSource;