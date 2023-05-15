import React,{Component} from "react";
import { ToastContainer, toast } from "react-toastify";

const MyContext = React.createContext();



class MyProvider extends Component{


    state = {
        stage:1,
        players:[],
        result:''
    }

    addPlayerHandler = (name) =>{
        const checkName = this.searchPlayer(name);
        if(checkName){
            this.setState((prevState) =>({
                players:[
                    ...prevState.players,
                    name
                ]
            }))
        }else{
            toast.info(name+" is already exist",{
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 2000
            });
        }
        
    }

    searchPlayer = (name) =>{
        const {players} = this.state;
        var flag = true;
        if(players.length>=1){
            for (var n of players){
                if(n.toLowerCase()===name.toLowerCase()){
                    // console.log("Name is alrady exist");
                    flag = false;
                }
            }
           return flag;
        }else{
            return true;
        }
        
    }

    removePlayerHandler = (index) =>{
        let newPlayers = this.state.players;
        newPlayers.splice(index,1);
        this.setState({players:newPlayers})
    }

    nextHandler = () =>{
        const {players} = this.state;
        if(players.length<2){
            toast.error("You need at least 2 player",{
                position: toast.POSITION.TOP_LEFT,
                autoClose: 2000
            });
        }else{
            this.setState({
                stage:2
            },()=>{
                setTimeout(() => {
                    this.generateLooser();
                }, 2000);
            })
        }
    }

    generateLooser = () =>{
        const {players} = this.state;
        if(players.length<1){
            toast.warning("All Players was selected and list is empty",{
                position: toast.POSITION.TOP_LEFT,
                autoClose: 2000
            });
            this.setState({
                result:''
            })
        }else{
            const index = Math.floor(Math.random()*players.length);
            this.setState({
                result: players[index]
            })
            this.removePlayerHandler(index);
            // console.log(players)
        }

        
        
    }

    resetGame = () =>{
        this.setState({
            stage:1,
            players:[],
            result:''
        })
    }

    render(){
        return(
            <>
            <MyContext.Provider value={{
                state: this.state,
                addPlayer: this.addPlayerHandler,
                removePlayer: this.removePlayerHandler,
                next: this.nextHandler,
                getNewLooser: this.generateLooser,
                resetGame: this.resetGame
            }}>
                {this.props.children}
            </MyContext.Provider>
            <ToastContainer/>
                
            </>
        )
    }
}

export {
    MyContext,
    MyProvider
}