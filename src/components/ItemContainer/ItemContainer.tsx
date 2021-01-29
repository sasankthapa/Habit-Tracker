import React from 'react'
import './ItemContainer.css'

const ItemContainer:React.FC<ItemContainerProps> = ({name,good,handleOnClick}) => {
    let classes="item-container";
    if(good){
        classes+=" good";
    }else{
        classes+=" bad";
    }

    return <div className={classes} onClick={()=>handleOnClick(name,good)}>
        {name}
    </div>
}

export default ItemContainer;
