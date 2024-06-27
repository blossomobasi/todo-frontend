import { Plus } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import React from "react";
import { Switch } from "./ui/switch";
import { createTodo } from "../api/todos";

function AddTodo() {
    const [description, setDescription] = React.useState("");
    // const [remainder, setRemainder] = React.useState(false);

    function handleAddTodo(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        createTodo({
            description,
            // remainder,
        });
    }

    return (
        <form className="my-10" onSubmit={handleAddTodo}>
            <div className="flex items-center space-x-5">
                <Input
                    type="text"
                    placeholder="Add a task..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <Button type="submit" className="bg-[#9e78cf] hover:bg-[#3e1671]">
                    <Plus size={24} />
                </Button>
            </div>

            <div className="mt-5 flex items-center space-x-5 justify-end">
                <label htmlFor="remainder">Remainder</label>
                <Switch id="remainder" />
            </div>
        </form>
    );
}

export default AddTodo;
