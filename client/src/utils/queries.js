import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query products {
    products {
      _id
      name
      price
      image
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
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const GET_ME = gql`
  {
    me {
      _id
      firstName
      lastName
      email
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          price
          description
          image
          quantity
          category {
            _id
            name
						}
        }
      }
      address {
        _id
        street
        aptNo
        city
        state
        zipCode
        country
      }
    }
  }
`;
