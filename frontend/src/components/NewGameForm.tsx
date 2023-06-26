import React, { useState } from 'react';
import {backend_port, backend_fqdn} from "../utils/env";

enum Difficulty {
    Easy = 'easy',
    Medium = 'medium',
    Hard = 'hard',
    Custom = 'custom',
}

interface FormData {
    difficulty: Difficulty;
    size?: number;
    health?: number;
    moves?: number;
}

export default function NewGameForm() {
    const [formData, setFormData] = useState<FormData>({
        difficulty: Difficulty.Easy,
    });

    function handleChange (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const response = await fetch(`http://${backend_fqdn}:${backend_port}/api/creategame`, {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({difficulty: "easy"}),
            });

            if (response.status == 200) {
                const result = await response.json();
                console.log(result)
                console.log("Success:", result);
            } else {
                console.log(response)
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <form className="max-w-sm mx-auto sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 text-center" onSubmit={handleSubmit}>
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
                            value={formData.size || ''}
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
                            value={formData.health || ''}
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
                            value={formData.moves || ''}
                            onChange={handleChange}
                        />
                    </div>
                </>
            )}

            <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
                Submit
            </button>
        </form>
    );
};
