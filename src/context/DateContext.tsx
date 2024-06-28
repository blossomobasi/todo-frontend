import { createContext, useContext, useEffect, useState } from "react";
import { useTodos } from "../hooks/todo/useTodos";
import { dateFormatter } from "../utils";

type DateContextType = {
    startDate: Date;
    setStartDate: React.Dispatch<React.SetStateAction<Date>>;
};

const DateContext = createContext<DateContextType | undefined>(undefined);

function DateProvider({ children }: { children: React.ReactNode }) {
    const { todos } = useTodos();
    const [startDate, setStartDate] = useState<Date>(new Date(Date.now()));

    const reminderDatesOfAllTodosWithReminder = todos
        ?.map((todo) => todo.reminder)
        ?.filter((reminder) => reminder !== undefined);

    useEffect(() => {
        const checkReminders = () => {
            const currentTime = new Date().toISOString();
            reminderDatesOfAllTodosWithReminder?.forEach((reminderDate) => {
                if (reminderDate && reminderDate < currentTime) {
                    // Remove the reminder from the list if it's in the past
                    reminderDatesOfAllTodosWithReminder?.splice(
                        reminderDatesOfAllTodosWithReminder.indexOf(reminderDate),
                        1
                    );
                    return;
                }
                console.log("Reminder", dateFormatter(reminderDate));
                console.log("current", dateFormatter(currentTime));
                if (reminderDate === currentTime) {
                    // Trigger the bell ring action
                    console.log("True");
                    console.log("Ring the bell! Reminder date and time is now:", reminderDate);
                    return;
                }
            });
        };

        // Check reminders every 1 second
        const intervalId = setInterval(checkReminders, 1000);

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [reminderDatesOfAllTodosWithReminder]);

    return (
        <DateContext.Provider value={{ startDate, setStartDate }}>{children}</DateContext.Provider>
    );
}

function useDate() {
    const context = useContext(DateContext);

    if (context === undefined)
        throw new Error("DateContext should be used within the DateProvider");

    return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { DateProvider, useDate };
