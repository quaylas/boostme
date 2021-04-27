import gql from 'graphql-tag';
​
export const QUERY_BENEFACTOR = gql`
    query getBenefactor($benefactorName: String!) {
        getBenefactor(benefactorName: $benefactorName){
            _id
            benefactorName
            about
            age
            donationTotal
            donations {
                _id
                donationDate
                donorName
                amount
                message
            }
        }
    }
`;
​
export const QUERY_BENEFACTORS = gql`
    query getFilteredBenefactors($searchTerm: String!) {
        getFilteredBenefactors(searchTerm: $searchTerm){
            _id
            benefactorName
            about
            age
            donationTotal
            donations {
                _id
                donationDate
                donorName
                amount
                message
            }
        }
    }
`;
​
export const QUERY_ALL_BENEFACTORS = gql`
query getBenefactors {
    getBenefactors {
        _id
        benefactorName
        about
        age
        donationTotal
        donations {
            _id
            donationDate
            donorName
            amount
            message
        }
    }
}
`;
​
export const QUERY_ALL_DONATIONS = gql`
    {
            _id
            donationDate
            donorName
            donorEmail
            benefactor
            amount
            message
    }
`;
​
export const QUERY_DONATIONS = gql`
    query getFilteredDonations($searchTerm: String!) {
        getFilteredDonations(searchTerm: $searchTerm) {
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
​
export const QUERY_DONATION = gql`
    query getDonation($_id: ID!) {
        getDonations(_id: $_id){
            donations {
                _id
                donationDate
                donorName
                donorEmail
                benefactor
                amount
                message
            }
        }
    }
`;
​
export const QUERY_ME = gql`
    {
        me {
            _id
            firstName
            lastName
            email
            orders {
                _id
                purchaseDate
                donations {
                    _id
                    donationDate
                    benefactor
                    amount
                    message
                }
            }
        }
    }
`;
​
export const QUERY_USER = gql`
    { 
        firstName
        lastName
        orders {
            _id
            purchaseDate
            donations {
                _id
                donationDate
                benefactor
                amount
                message
            }
        }
    }    
`;
​
export const QUERY_CHECKOUT = gql`
    query getCheckout($donations: [ID]!){
        checkout(donations: $donations){
            session
        }
    }
`;