import { useState, useEffect } from 'react';

export const useProvinces = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/province.json')
            .then((res) => res.json())
            .then(setData)
            .catch((err) => console.error('Data fetch error:', err))
            .finally(() => setLoading(false));
    }, []);

    return { data, loading };
};
