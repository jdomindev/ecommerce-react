import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
    addUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($email: String, $password: String, $firstName: String, $lastName: String) {
    updateUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
        _id
        firstName
        lastName
        email
      }
    }
`;

export const UPDATE_ADDRESS = gql`
  mutation updateAddress($street: String, $aptNo: String, $city: String, $state: String, $zipCode: String, $country: String) {
    updateAddress(street: $street, aptNo: $aptNo, city: $city, state: $state, zipCode: $zipCode, country: $country) {
        _id
        street
        aptNo
        city
        state
        zipCode
        country
      }
    }
`;


export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;
