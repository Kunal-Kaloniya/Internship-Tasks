import { useState, useEffect } from "react";
import axios from "axios";

function AdminPanel() {

    const [pendingPapers, setPendingPapers] = useState([]);

    const fetchPending = async () => {
        const res = await axios.get("http://localhost:3000/admin/papers");
        setPendingPapers(res.data);
    }

    const approvePaper = async (id) => {
        await axios.post(`http://localhost:3000/admin/papers/${id}`);
        fetchPending();
    }

    useEffect(() => {
        fetchPending();
    }, []);

    return (
        <div className="max-w-full m-2">
            <h2 className="text-3xl font-medium my-5 text-center border-b-1 pb-5">Admin Panel - Pending Papers</h2>

            {
                pendingPapers.length === 0 ? (
                    <p className="text-center">No pending papers!</p>
                ) : (
                    pendingPapers.map((paper) => (
                        <div key={paper.id} className="border p-4 mb-4 rounded shadow">
                            <h3 className="font-semibold text-lg">{paper.title}</h3>
                            <p className="text-sm text-gray-600">by {paper.author}</p>
                            <p className="mt-2">{paper.content}</p>
                            <button
                                className="mt-3 bg-green-600 text-white px-4 py-1 rounded"
                                onClick={() => approvePaper(paper.id)}
                            >
                                Approve & Publish
                            </button>
                        </div>
                    ))
                )
            }

        </div>
    );
}

export default AdminPanel;