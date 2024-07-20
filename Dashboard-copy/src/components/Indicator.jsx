import React from 'react'
import { FcCheckmark } from "react-icons/fc";
import { IoWarningOutline } from "react-icons/io5";
import { MdOutlineQuestionMark } from "react-icons/md";
import { TiCancel } from "react-icons/ti";
import { MdDangerous } from "react-icons/md";



const Indicator = ({current, layLength}) => {
    const style = { fontSize: "1em" }
    if(current.mtrs == 0 || current.palla == 0){
        return(
            <div className="flex flex-col justify-center">
                <MdOutlineQuestionMark  className=' text-orange-300' style={style} title='field(s) missing'/>
            </div>
        )
    }
    if(current.wastage>layLength){
        return(
            <div className="flex flex-col justify-center">
                <IoWarningOutline title='Wastage is larger than layLength' style={style} color='orange'/> 
                
            </div>
        )
    }
    else if(current.wastage<0){
        return (
            <div className="flex flex-col justify-center">
                <MdDangerous color='red' style={style} title='invalid input '/>
            </div>
        )
    }
    else{
        return(
            <div className="flex flex-col justify-center">
                <FcCheckmark style={style} title='good to go'/>
            </div>
        )
    } 
}

export default Indicator