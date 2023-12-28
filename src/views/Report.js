import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Report = (props) => {
    
    const navigate = useNavigate();
        
    const onButtonClick = () => {
        // when the user do click on this button we have to compile the user information and send it to an Officer
    
    }
    
    

    return <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <div>Denunciar</div>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={"Log in"} />
        </div>
    </div>
}

export default Report