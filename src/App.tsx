import React, {useEffect, useState} from 'react';
import './App.css';
import CanvasContainer from './components/CanvasContainer/CanvasContainer';
import DayContainer from './components/DayContainer/DayContainer';

function App() {
    const [startDate,setStartDate] = useState<Date>(new Date());
    const [habits, setHabits] = useState<Habit[]>([])

    useEffect(()=>{
        const localStartDate=localStorage.getItem('startDate');
        const localHabits=localStorage.getItem('habits');
        if(localStartDate){
            setStartDate(new Date(localStartDate));
        }else{
            localStorage.setItem('startDate', new Date().toDateString())
        }
        if(localHabits){
            setHabits(JSON.parse(localHabits));
        }else{
            localStorage.setItem('habits', JSON.stringify([]))
        }
    },[])
    
    const createHabitFromDay = (date:string,habitName:string,good:boolean)=>{
        const updatedHabits=[...habits];
        updatedHabits.push({
            name:habitName,
            startDate:new Date(date).toDateString(),
            daily:{
                [date]:good
            }
        })
        setHabits(updatedHabits);
        localStorage.setItem('habits', JSON.stringify(updatedHabits))
    }

    const updateHabitOnDay = (date:string,habitName:string,value:boolean) =>{
        const updatedHabits=habits.map((elem) => {
            if(elem.name===habitName){
                if(elem.daily)
                    elem.daily[date]=value;
                else 
                    elem.daily={
                        [date]:value
                    }
            }
            return elem;
        })
        setHabits(updatedHabits);
        localStorage.setItem('habits', JSON.stringify(updatedHabits))
    }

    const dayContainers:Array<JSX.Element>=[];
    const today=new Date();
    const nextDay= new Date(startDate);

    do{
        dayContainers.push(<DayContainer 
            date={nextDay.toDateString()} 
            habits={habits} 
            createHabitFromDay={createHabitFromDay}
            updateHabitOnDay={updateHabitOnDay}/>)
        nextDay.setDate(nextDay.getDate()+1);
    }while(today.getTime()>=nextDay.getTime())

    return(
        <div className="App">
            <div className="main-container">
                {dayContainers}
            </div>
            <CanvasContainer />
        </div>
    );
}

export default App;
