import React, { Component } from 'react';
import MeteorologicalVariables from './MeteorologicalVariables';
import MetClone1 from './MetClone1';
import MetClone2 from './MetClone2';
import MeteorologicalIndices from './MeteorologicalIndices';
import PolicyComputation from './PolicyComputation';
import CropModelling from './CropModelling';
import LossesComputation from './LossesComputation';
import PayoutOptimization from './PayoutOptimization';
import Climate from './Climate';
import Climate6 from './Climate6';
import ReactShadowScroll from 'react-shadow-scroll';
import {useSelector, useDispatch} from 'react-redux';
import Visualization from './Visualization';

    function choice({value:choiceNumber, refVis }){

        if(choiceNumber===0){
            return  <div> 
             <MeteorologicalVariables/> 
        </div>
        }

        if(choiceNumber===1){
            return  <div> 
             <CropModelling/> 
        </div>
        }

        if(choiceNumber===2){
            return  <div> 
             <MeteorologicalIndices/> 
        </div>
        }

        if(choiceNumber===3){
            return  <div className = "ClimateCMIP5"> 
             <PolicyComputation/> 
        </div>
        }

        if(choiceNumber===4){
            return  <div> 
             <Climate/> 
        </div>
        }

        if(choiceNumber===5){
            return  <div> 
             <Climate6/> 
        </div>
        }

        if(choiceNumber===6){
            return  <div> 
             <LossesComputation/> 
        </div>
        }

        if(choiceNumber===7){
            return  <div> 
             <PayoutOptimization/> 
        </div>
        }
        if(choiceNumber===8){
            return  <div> 
             <MetClone1/> 
        </div>
        }

        if(choiceNumber===9){
            return  <div> 
             <MetClone2/> 
        </div>
        }

        if(choiceNumber===10){
            return  <div> 
             <Visualization refVis={refVis}/> 
        </div>
        }

    }
    function FormsManager({refVis}){
        const value = useSelector(state=>state.moduleSelection);

        return ( 
            <div className ="activeModule">     
                       
                    <div> 
                        {choice({value,refVis}) }
                    </div>  
                         
            </div>
            
            );
    }

export default FormsManager;