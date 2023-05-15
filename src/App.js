
import React,{useContext} from "react";
import { MyContext } from "./context";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'react-toastify/dist/ReactToastify.css';
import './style/app.css';

import Stage1 from "./component/stage_1";
import Stage2 from "./component/stage_2";


const App = () => {
    const context = useContext(MyContext);
    //console.log(context)
  return(
    <div className="wrapper">
      <div className="center-wrapper">
        {/* <h1>Find the looser!</h1> */}
        <h1>Who is the looser?</h1>
        {
          context.state.stage ===1 ? 
          <Stage1/>
          :
          <Stage2/>
        }
      </div>
      
    </div>
  )
 
}
export default App;
