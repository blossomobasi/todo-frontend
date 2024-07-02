import { useState } from "react";
import { Todo } from "../types/todos";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import Calender from "./Calender";
import { useUpdateTodo } from "../hooks/todo/useUpdateTodo";
import { LoaderCircle } from "lucide-react";

type UpdateTodoProps = {
    currentTodoId: string;
    todo: Todo;
    setOpenUpdateTodo: (value: string | null) => void;
};

export function UpdateTodo({ currentTodoId, todo, setOpenUpdateTodo }: UpdateTodoProps) {
    const [description, setDescription] = useState<string>(todo.description);
    const [reminder, setReminder] = useState<boolean>(todo.reminder ? true : false);

    const [startDate, setStartDate] = useState<Date>((todo.reminder || "") as unknown as Date);

    const { isUpdatingTodo, updateTodo } = useUpdateTodo();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // onUpdate(currentTodoId, description, todo.reminder);

        updateTodo({
            todoId: currentTodoId,
            updateTodoInput: {
                description,
                reminder: reminder ? todo.reminder : undefined,
            },
        });

        setOpenUpdateTodo(null);
    }

    return (
        <form onSubmit={handleSubmit} className="mb-2">
            <div className="flex flex-col space-y-3">
                <textarea
                    className="w-full bg-transparent border border-[#9e78cf] rounded-lg p-2 focus-within:outline-none"
                    autoFocus
                    // value={description}
                    defaultValue={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>

                <div className="flex items-center space-x-5 justify-end">
                    <Button
                        onClick={() => setOpenUpdateTodo(null)}
                        className="border border-[#9e78cf] bg-transparent hover:bg-transparent"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className={`bg-[#9e78cf] hover:bg-[#3e1671] ${
                            isUpdatingTodo && "opacity-50"
                        }`}
                        disabled={isUpdatingTodo}
                    >
                        {isUpdatingTodo ? (
                            <LoaderCircle className="animate-spin" size={20} />
                        ) : (
                            "Update"
                        )}
                    </Button>
                </div>
            </div>

            <div className="flex flex-col items-end space-y-3">
                <div className="mt-5 flex items-center space-x-5 justify-end">
                    <label htmlFor="update-reminder">reminder</label>
                    <Switch
                        id="update-reminder"
                        checked={reminder}
                        onClick={() => setReminder(!reminder)}
                    />
                </div>
                {reminder && <Calender startDate={startDate} setStartDate={setStartDate} />}
            </div>
        </form>
    );
}
