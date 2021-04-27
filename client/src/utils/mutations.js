import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_DONATION = gql`
  mutation addDonation($benefactor: String!, $amount: Float!, $message: String){
    addDonation(benefactor: $benefactor, amount: $amount, message: $message){
      _id
      donationDate
      donorName
      donorEmail
      benefactor
      amount
      message
    }
  }
`;

export const ADD_BENEFACTOR = gql`
  mutation addBenefactor($benefactorName: String!, $about: String!, $age: Int!){
    addBenefactor(benefactorName: $benefactorName, about: $about, age: $age){
      _id
      benefactorName
      age
      about
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($donations: [ID]!) {
    addOrder(donations: $donations) {
      purchaseDate
      donations {
        _id
        donationDate
        donorName
        donorEmail
        amount
        message
      }
    }
  }
`;

export const DELETE_DONATION = gql`
  mutation deleteDonation($_id:ID!) {
    deleteDonation(_id:$_id){
      email
      donations{
        _id
        donationDate
        benefactorName
        amount
        message
      }
    }
  }
`;