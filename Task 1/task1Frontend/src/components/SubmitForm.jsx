import { useState } from "react";
import axios from "axios";

function SubmitForm() {

    const [form, setForm] = useState({ title: "", author: "", content: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:3000/submit", form);
            setMessage(res.data.message);
            setForm({ title: "", author: "", content: "" });
        } catch (err) {
            setMessage("Submission failed!");
        }
    }

    return (
        <div className="p-4 max-w-md mx-auto mt-10">
            <h1 className="text-3xl font-medium my-5 text-center">Submit Research Paper</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex gap-2">
                    <input type="text" name="title" placeholder="title" className="border-1 flex-1/2 px-2 py-1 outline-0" value={form.title} onChange={handleChange} />
                    <input type="text" name="author" placeholder="author" className="border-1 flex-1/2 px-2 py-1 outline-0" value={form.author} onChange={handleChange} />
                </div>
                <textarea name="content" placeholder="content" className="block w-full border-1 my-2 px-2 py-1 h-50" value={form.content} onChange={handleChange}></textarea>
                <button type="submit" className="px-4 py-2 bg-blue-400 font-bold text-white">SUBMIT</button>
            </form>

            {message && <p className="w-full bg-gray-400 mt-5 text-center py-1 px-2">{message}</p>}
        </div>
    );
}

export default SubmitForm;