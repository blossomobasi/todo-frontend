import { Plus } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import React from "react";
import { Switch } from "./ui/switch";
import { useCreateTodo } from "../hooks/todo/useCreateTodo";
import Calender from "./Calender";
import { useDate } from "../context/DateContext";
import { useToast } from "./ui/use-toast";

function AddTodo() {
    const { toast } = useToast();
    const { createTodo, isCreatingTodo } = useCreateTodo();
    const { startDate, setStartDate } = useDate();

    const [description, setDescription] = React.useState("");
    const [reminder, setReminder] = React.useState(false);

    function handleAddTodo(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!description) {
            toast({
                title: "Task",
                description: "Task description is required",
            });
            return;
        }

        createTodo({
            description,
            reminder: reminder ? startDate.toISOString() : undefined,
        });

        toast({
            title: "Task",
            description: "Task added successfully",
        });

        setDescription("");
        setReminder(false);
    }

    return (
        <form className="my-5" onSubmit={handleAddTodo}>
            <div className="flex items-center space-x-5">
                <Input
                    type="text"
                    placeholder="Add a task..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={isCreatingTodo}
                />

                <Button
                    type="submit"
                    disabled={isCreatingTodo}
                    className="bg-[#9e78cf] hover:bg-[#3e1671]"
                >
                    <Plus size={24} />
                </Button>
            </div>

            <div className="flex flex-col items-end space-y-3">
                <div className="mt-5 flex items-center space-x-5 justify-end">
                    <label htmlFor="reminder">reminder</label>
                    <Switch
                        id="reminder"
                        disabled={isCreatingTodo}
                        checked={reminder}
                        onClick={() => setReminder(!reminder)}
                    />
                </div>
                <div>
                    {reminder && <Calender startDate={startDate} setStartDate={setStartDate} />}
                </div>
            </div>
        </form>
    );
}

export default AddTodo;
