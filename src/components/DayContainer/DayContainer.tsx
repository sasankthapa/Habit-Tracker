import React from 'react';
import './DayContainer.css'
import ItemContainer from '../ItemContainer/ItemContainer';
import AddItemContainer from '../ItemContainer/AddItemContainer/AddItemContainer';

const DayContainer:React.FC<DayContainerProps> = ({date,habits,createHabitFromDay,updateHabitOnDay}) => {
    const doneHabits:Array<JSX.Element>=[];
    const failedHabits:Array<JSX.Element>=[];

    const handleOnClick=(name:string,good:boolean)=>{
        updateHabitOnDay(date,name,!good); 
    }

    habits.forEach((habit)=>{
        if(new Date(habit.startDate)>new Date(date)) return;
        if(habit.daily && habit.daily[date]!==null){
            if(habit.daily[date]){
                return doneHabits.push(<ItemContainer key={habit.name+date} name={habit.name} good={true} handleOnClick={handleOnClick}/>)
            }
        }    
        return failedHabits.push(<ItemContainer key={habit.name+date} name={habit.name} good={false} handleOnClick={handleOnClick}/>)
    })


    return <div className="days-container">
        <div className="holder holder-place-bottom holder-reverse">
            {doneHabits}
            <AddItemContainer handleEnter={(name)=>createHabitFromDay(date,name,true)}/>
        </div>
        <div className="date">{date}</div>
        <div className="holder holder-place-top">
            {failedHabits}
            <AddItemContainer handleEnter={(name)=>createHabitFromDay(date,name,false)}/>
        </div>
    </div>
}

export default DayContainer;
