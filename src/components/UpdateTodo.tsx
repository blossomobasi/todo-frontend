import { useState } from "react";
import { Todo } from "../types/todos";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import Calender from "./Calender";

type UpdateTodoProps = {
    currentTodoId: string;
    todo: Todo;
    onUpdate: (id: string, description: string, reminder: string | undefined) => void;
    setOpenUpdateTodo: (value: string | null) => void;
};

export function UpdateTodo({ currentTodoId, todo, onUpdate, setOpenUpdateTodo }: UpdateTodoProps) {
    const [description, setDescription] = useState<string>(todo.description);
    const [reminder, setReminder] = useState<boolean>(todo.reminder ? true : false);

    const [startDate, setStartDate] = useState<Date>((todo.reminder || "") as unknown as Date);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        onUpdate(currentTodoId, description, todo.reminder);
    }

    return (
        <form onSubmit={handleSubmit} className="mb-2">
            <div className="flex flex-col space-y-3">
                <textarea
                    className="w-full bg-transparent border border-[#9e78cf] rounded-lg p-2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>

                <div className="flex items-center space-x-5 justify-end">
                    <Button
                        onClick={() => setOpenUpdateTodo(null)}
                        className="border border-[#9e78cf] bg-transparent hover:bg-transparent"
                    >
                        Cancel
                    </Button>
                    <Button type="submit" className="bg-[#9e78cf] hover:bg-[#3e1671]">
                        Update
                    </Button>
                </div>
            </div>

            <div className="flex flex-col items-end space-y-3">
                <div className="mt-5 flex items-center space-x-5 justify-end">
                    <label htmlFor="reminder">reminder</label>
                    <Switch
                        id="reminder"
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
