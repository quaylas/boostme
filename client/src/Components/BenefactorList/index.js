import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { QUERY_BENEFACTORS, QUERY_ALL_BENEFACTORS } from '../../utils/queries';
import BenefactorListItem from '../BenefactorListItem';

import { useStoreContext } from '../../utils/GlobalState';

import { idbPromise } from '../../utils/helpers';
import { UPDATE_BENEFACTORS } from '../../utils/actions';


function BenefactorList() {
    const [state, dispatch] = useStoreContext();
    const { loading, data } = useQuery(QUERY_ALL_BENEFACTORS);

    useEffect(() => {
        if(data) {
            console.log(data);
            dispatch({
                type: UPDATE_BENEFACTORS,
                benefactors: data.getBenefactors
            });

            data.getBenefactors.forEach((benefactor) => {
                idbPromise('benefactors', 'put', benefactor);
            });
        } else if (!loading) {
            idbPromise('benefactors', 'get').then((benefactors) => {
                dispatch({
                    type: UPDATE_BENEFACTORS,
                    benefactors: benefactors
                });
            });
        }
    }, [data, loading, dispatch]);

    function filterBenefactors() { 
        return state.benefactors; //wrap in if statement based on searchTerm
            

        // add filter functionality here in the event of a searchTerm
    }

    return (
        
        <div className="benefactorListOuter">
                {state.benefactors.length ? (
                    <>
                    <h4>Who would you like to donate to?</h4><br></br>
                    <div className="benefactorListInner">
                        {filterBenefactors().map(benefactor => (
                            <BenefactorListItem
                                key={benefactor._id}
                                _id={benefactor._id}
                                name={benefactor.benefactorName}
                                age={benefactor.age}
                                about={benefactor.about}
                                />
                        ))}
                    </div>
                    </>
                ) : (<div>No benefactors to list!</div>)}
                { loading ? <div>Please give us a second to load ...</div> : null }
                
        </div>
    
    );
};



export default BenefactorList;