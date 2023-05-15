import React,{useContext, useState, useRef} from "react";
import { Button, Form, Alert } from "react-bootstrap";

import { MyContext } from "../context";

const Stage1 = () =>{
    const textInput = useRef();
    const context = useContext(MyContext)
    const [error, setError] = useState([false, ' '])
    const [state, setState] = useState({
        flag:false,
        message:''
    })

    const handleSubmit = (e) =>{
        e.preventDefault();
        const value = textInput.current.value;
        const validate = validateInput(value);
        if(validate){
            setError([],'')
            setState({message:'', flag: false})
            textInput.current.value = '';
            context.addPlayer(value);
            //console.log("Add Data")
        }else{
            console.log(error)
        }
    }

    const validateInput = (value) =>{
        const v = value.trim();
        if(v===''){
            // setError(true,"Sorry, you need to add something")
            setState({message: 'Sorry, you need to add something',flag:true})
            return false;
        }
        if(v.length<=2){
            // setError(true,"Sorry, you need 3 character at least")
            setState({message: 'Sorry, you need 3 character at least', flag:true})
            return false;
        }
        return true;
    }
    //console.log(context.state);

    return(
        <>
            <Form onSubmit={handleSubmit} className="mt-4">
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        name = "player"
                        ref={textInput} 
                    />

                </Form.Group>
                {state.flag ? <Alert>
                    {state.message}
                    </Alert> : null
                }
             

                <Button className="miami" variant="primary" type="submit">
                    Add Player
                </Button>
                { context.state.players && context.state.players.length> 0 ? 
                    <>
                        <hr/>
                        <div>
                            <ul className="list-group">
                                {   context.state.players.map((player, index)=>(
                                    <li key={index} className="list-group-item d-flex justify-content-between 
                                    align-item-center list-group-item-action">
                                        {player}
                                        <span className="badge badge-danger"
                                        onClick={()=> context.removePlayer(index)}
                                        >X

                                        </span>

                                    </li>
                                ))

                                }
                            </ul>
                            <div className="action_button"
                            onClick={()=> context.next()}
                            >
                                Next Stage
                            </div>
                        </div>
                    </>
                :null

                }
            </Form>
        </>
    )
}

export default Stage1;