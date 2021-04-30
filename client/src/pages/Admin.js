import React, { useState } from "react";
import Auth from "../utils/auth";
import { useMutation } from '@apollo/react-hooks';
import { ADD_BENEFACTOR } from "../utils/mutations";

function Admin(props) {
    const [formState, setFormState] = useState({ benefactorName: '', age: 0, about:'' });
    const [addBenefactor, { error }] = useMutation(ADD_BENEFACTOR);

    const handleFormSubmit = async event => {
        event.preventDefault();
        try {
            const mutationResponse = await addBenefactor({
        variables: {
            benefactorName: formState.benefactorName, 
            age: parseInt(formState.age),
            about: formState.about
        }
        });
        console.log(mutationResponse);
        } catch (e) {
            console.log(e)
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setFormState({
        ...formState,
        [name]: value
        });
    };

    if (Auth.getProfile().data.email.includes('admin@boostme.com')){
    return (
        <div className="container my-1">

        <h2>Add Benefactor</h2>
        <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
            <label htmlFor="benefactorName">Full Name:</label>
            <input
                placeholder="Full Name"
                name="benefactorName"
                type="benefactorName"
                id="benefactorName"
                onChange={handleChange}
            />
            </div>
            <div className="flex-row space-between my-2">
            <label htmlFor="age">Age:</label>
            <input
                placeholder="Age"
                name="age"
                type="age"
                id="age"
                onChange={handleChange}
            />
            </div>
            <div className="flex-row space-between my-2">
            <label htmlFor="about">About:</label>
            <textarea
                placeholder="Tell us about the benefactor!"
                name="about"
                type="about"
                id="about"
                onChange={handleChange}
            />
            </div>
            {
            error ? <div>
                {error.message.includes('duplicate key error') ? <p className='error-text'>That benefactor is already in our system!</p> : <p className="error-text" >Something went wrong! Please try again later.</p>}
                
            </div> : null
            }
            <div className="flex-row flex-end">
            <button type="submit">
                Submit
            </button>
            </div>
        </form>
        </div>
        );
    } else {
        return (
            <div>
                <h1>404 Page Not Found</h1>
                <h1>
                <span role="img" aria-label="Face With Rolling Eyes Emoji">
                    🙄
                </span>
                </h1>
            </div>
        );
    }

}

export default Admin;
