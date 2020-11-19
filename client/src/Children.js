import React, { useContext, useState } from 'react';
import BlockchainContext from "./BlockchainContext.js";

function Children() {

    const {web3, accounts, contract} = useContext(BlockchainContext);

    const [vaalue, setVaalue] = useState();

    const valueof = async() => {
        const yep = await contract.methods.getdata().call();
        setVaalue(yep);
    }

    return (
    
        <div className="children">
            <div>Your value is:{vaalue}</div>
            <button  onClick={() => valueof()} value={vaalue}>value</button>
    
            </div>
       
    )
}

export default Children
