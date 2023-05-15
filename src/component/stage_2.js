import React, { useContext } from "react";
import { MyContext } from "../context";


const Stage2 = () =>{
    const content = useContext(MyContext)
    return(
        <>
        <div className="result_wrapper">
            <h3>The Looser is: </h3>
            {content.state.result}
        </div>
        <div
            className="action_button"
            onClick={() => content.resetGame()}
        >
            Reset Game
        </div>

        <div
            className="action_button btn_2"
            onClick={() => content.getNewLooser()}
        >
            Get New Player
        </div>
           

        </>
    )
}

export default Stage2;