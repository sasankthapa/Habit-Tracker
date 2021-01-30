import React, {ChangeEvent, useEffect, useRef, useState} from 'react';

const AddItemContainer:React.FC<AddItemContainerProps> = ({handleEnter}) =>{

    const addItem = useRef<HTMLDivElement>(null);
    const textAreaRef= useRef<HTMLTextAreaElement>(null);
    const [addingNew,setAddingNew] = useState<boolean>(false);
    const [textInput,setTextInput] = useState<string>('');
    var classes="item-container"

    if(!addingNew){
        classes+=" add";
    }

    const handleOnChange=(e:ChangeEvent<HTMLTextAreaElement>)=>{
        setTextInput(e.target.value);
    }

    useEffect(()=>{
        if(textAreaRef.current){
            textAreaRef.current.focus()
        } 
        addItem.current?.addEventListener('focusout',()=>{
            setAddingNew(false);
            setTextInput('');
        })
    },[addingNew])

    const textArea=<textarea 
                ref={textAreaRef}
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

    return <div ref={addItem} className={classes} onClick={()=>setAddingNew(true)}>
        {addingNew?textArea:"+"}
    </div>
}

export default AddItemContainer;
