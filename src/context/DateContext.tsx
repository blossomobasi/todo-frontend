import { createContext, useContext, useEffect, useState } from "react";
import { useTodos } from "../hooks/todo/useTodos";
import { useToast } from "../components/ui/use-toast";
import { ToastAction } from "../components/ui/toast";

type DateContextType = {
    startDate: Date;
    setStartDate: React.Dispatch<React.SetStateAction<Date>>;
};

const DateContext = createContext<DateContextType | undefined>(undefined);

function DateProvider({ children }: { children: React.ReactNode }) {
    const { toast } = useToast();
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

                if (reminderDate === currentTime) {
                    // Trigger the bell ring action
                    toast({
                        title: "Reminder",
                        description: "Ring! Ring! Ring!.. Your reminder is here",
                        action: <ToastAction altText="Close Reminder">Close</ToastAction>,
                    });
                    return;
                }
            });
        };

        // Check reminders every 1 second
        const intervalId = setInterval(checkReminders, 1000);

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [reminderDatesOfAllTodosWithReminder, toast]);

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
