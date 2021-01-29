import React, {ChangeEvent, useState} from 'react';

const AddItemContainer:React.FC<AddItemContainerProps> = ({handleEnter}) =>{

    const [addingNew,setAddingNew] = useState<boolean>(false);
    const [textInput,setTextInput] = useState<string>('');
    var classes="item-container"

    if(!addingNew){
        classes+=" add";
    }

    const handleOnChange=(e:ChangeEvent<HTMLTextAreaElement>)=>{
        setTextInput(e.target.value);
    }

    return <div className={classes} onClick={()=>setAddingNew(true)}>
        {addingNew?<textarea 
                onChange={handleOnChange}
                onKeyDown={(e)=>{
                    if(e.keyCode===13){
                        if(textInput.trim().length>0)
                            handleEnter(textInput)
                        setAddingNew(false);
                        setTextInput('')
                    }
                    }
                }
                value={textInput} 
                maxLength={15} 
                rows={1} 
                className="input-text-area"
            />
            :"+"
        }
    </div>
}

export default AddItemContainer;
