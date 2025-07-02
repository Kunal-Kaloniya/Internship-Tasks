import { useState, useEffect } from "react";
import axios from "axios";

function PublishedPapers() {

    const [published, setPublished] = useState([]);

    useEffect(() => {
        const fetchPapers = async () => {
            const res = await axios.get("http://localhost:3000/papers");
            setPublished(res.data);
        };
        fetchPapers();
    }, []);

    return (
        <div className="max-w-full m-2">
            <h1 className="text-3xl font-medium my-5 text-center border-b-1 pb-5">Published Research Papers</h1>

            {
                published.length === 0 ? (
                    <p>No papers published yet!</p>
                ) : (
                    published.map((paper) => (
                        <div key={paper.id} className="border p-4 mb-4 rounded shadow">
                            <h3 className="font-semibold text-lg">{paper.title}</h3>
                            <p className="text-sm text-gray-600">by {paper.author}</p>
                            <p className="mt-2">{paper.content}</p>
                        </div>
                    ))
            )
            }

        </div>
    );
}

export default PublishedPapers;