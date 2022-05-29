import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
    query products {
        products {
            _id
            name
            price
            description
            category {
                _id
                name
            }
            deptCode
            type
            quantity
            skuSeq
            sku
        }
    }
`
