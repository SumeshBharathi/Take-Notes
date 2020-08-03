import React from 'react'
import moment from 'moment'

export default function ListView({value,Callfunc,index,Selectflag}) {

    return (
        <div class=" col p-3 m-1" id="item" style={{borderBottom:'0.5px grey solid', backgroundColor: Selectflag === index ? '#E3DFDF' : null}} onClick={() => Selectflag !== index ? Callfunc(index) : null}>
           <div class="row pl-2">
           { value.name}
           </div>
           <div class="row pr-2" style={{fontSize:13, textAlign:'right', display:'block',color:'#989695 '}}>
           Created {  moment(value.created).fromNow() }
           </div>                                     
        </div>
    )
}
