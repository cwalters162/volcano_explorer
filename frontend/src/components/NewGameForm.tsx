import React, {FormEvent, useState} from 'react';
import {backend_port, backend_fqdn} from "../utils/env";

enum Difficulty {
    Easy = 'easy',
    Medium = 'medium',
    Hard = 'hard',
    Custom = 'custom',
}

interface NewGameFormProps {
    onSubmit: (formData: LoginFormData) => Promise<void>
}

 export interface LoginFormData {
    difficulty: Difficulty;
    size?: number;
    health?: number;
    moves?: number;
}

export default function NewGameForm({onSubmit: handleSubmit}:NewGameFormProps) {
    const [formData, setFormData] = useState<LoginFormData>({
        difficulty: Difficulty.Easy,
    });

    function handleChange (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
        const { name, value } = event.target;
        console.log("Starting form data")
        console.log(formData)
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    }

    return (
        <form className="max-w-sm mx-auto sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 text-center">
            <div className="mb-4">
                <label htmlFor="difficulty" className="block mb-2 font-medium">
                    Difficulty
                </label>
                <select
                    id="difficulty"
                    name="difficulty"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md min-w-sm"
                    value={formData.difficulty}
                    onChange={handleChange}
                >
                    <option value={Difficulty.Easy}>Easy</option>
                    <option value={Difficulty.Medium}>Medium</option>
                    <option value={Difficulty.Hard}>Hard</option>
                    <option value={Difficulty.Custom}>Custom</option>
                </select>
            </div>

            {formData.difficulty === Difficulty.Custom && (
                <>
                    <div className="mb-4">
                        <label htmlFor="size" className="block mb-2 font-medium">
                            Size
                        </label>
                        <input
                            type="number"
                            id="size"
                            name="size"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            value={formData.size || 0}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="health" className="block mb-2 font-medium">
                            Health
                        </label>
                        <input
                            type="number"
                            id="health"
                            name="health"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            value={formData.health || 0}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="moves" className="block mb-2 font-medium">
                            Moves
                        </label>
                        <input
                            type="number"
                            id="moves"
                            name="moves"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            value={formData.moves || 0}
                            onChange={handleChange}
                        />
                    </div>
                </>
            )}

            <button
                type="button"
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                onClick={() => handleSubmit(formData)}
            >
                Submit
            </button>
        </form>
    );
};
