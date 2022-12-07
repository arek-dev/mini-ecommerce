import { gql } from "@apollo/client";

export const getCategories = gql`
  query {
    categories {
      name
    }
  }
`;

export const getProductsList = gql`
query productsList($title: String!) {
    category(input: { title: $title }) {
      name
      products {
        id
        name
        brand
        inStock
        gallery
        category
        attributes {
          id
          name
          type
        }
        prices {
          currency { 
            label
          }
          amount
        }
      }
    }
  }
`;

export const getProduct = gql`
  query product($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
        }
        amount
      }
      brand
    }
  }
`;

export const getCurrencies = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

