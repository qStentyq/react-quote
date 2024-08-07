import React, { useEffect, useState } from "react";
import "./quoteAPI.css";

export const QuoteAPI = () => {
    type qouteType = {
        author: string;
        category: string;
        quote: string;
    };
    const [quoteData, setQuoteData] = useState<qouteType[]>([
        {
            "quote": "Loading qoute...",
            "author": "Me",
            "category": "template",
        },
    ]);
    const [isQuoteChanged, setIsQouteChanged] = useState(false);
    const [category, setCategory] = useState("morning");
    const API_KEY = import.meta.env.VITE_QUOTE_API_KEY;
    const options = [
        { value: "morning", label: "morning" },
        { value: "age", label: "age" },
        { value: "alone", label: "alone" },
        { value: "amazing", label: "amazing" },
        { value: "anger", label: "anger" },
        { value: "architecture", label: "architecture" },
        { value: "art", label: "art" },
        { value: "attitude", label: "attitude" },
        { value: "beauty", label: "beauty" },
        { value: "best", label: "best" },
        { value: "birthday", label: "birthday" },
        { value: "business", label: "business" },
        { value: "car", label: "car" },
        { value: "change", label: "change" },
        { value: "computers", label: "computers" },
    ];
    useEffect(() => {
        setQuoteData([
            {
                "quote": "Loading qoute...",
                "author": "Me",
                "category": "template",
            },
        ]);
        fetch(`${url}category=${category}&X-Api-Key=${API_KEY}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setQuoteData(data);
            })
            .catch((error) => console.error(error));
    }, [isQuoteChanged]);

    const url = "https://api.api-ninjas.com/v1/quotes?";
    const categoryHandle = (e: Event | any) => {
        console.log(e.target.value);
        setCategory(e.target.value);
    };
    return (
        <div className='quotes'>
            <div>{quoteData && quoteData[0].quote}</div>
            <div className='generation'>
                <select className='category' name='category' value={category} onChange={(e) => categoryHandle(e)}>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <button onClick={() => setIsQouteChanged(!isQuoteChanged)}>Generate new Quote</button>
            </div>
        </div>
    );
};
