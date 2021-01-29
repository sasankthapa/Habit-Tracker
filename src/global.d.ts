interface Habit{
    name:string;
    startDate:string;
    daily?:{
        [date:string]:boolean
    }
}

interface DayContainerProps {
    date:string;
    habits:Habit[];
    createHabitFromDay:(date:string,habitName:string,good:boolean)=>void
    updateHabitOnDay:(date:string,habitName:string,value:boolean)=>void;
}

interface ItemContainerProps {
    name:string;
    good:boolean;
    handleOnClick:(name:string,good:boolean)=>void;
}

interface AddItemContainerProps {
    handleEnter:(name:string)=>void
}
