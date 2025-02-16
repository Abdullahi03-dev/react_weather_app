import removebtn from './assets/image/removebtn.png';
import { useEffect, useState } from 'react';

const SearchDiv = () => {
    const [longUrl, setLongurl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    // Handle input change
    const handleInputChange = (event) => {
        setLongurl(event.target.value);
    };

    // Remove item from the list
    const removeItem = (index) => {
        const updatedData = data.filter((_, idx) => idx !== index);
        setData(updatedData);
        localStorage.setItem('url', JSON.stringify(updatedData)); // Update local storage
    };

    // Save new data to local storage and state
    const storeDataToLocalStorage = (newData) => {
        const updatedData = [...data, newData];
        setData(updatedData);
        localStorage.setItem('url', JSON.stringify(updatedData));
    };

    // Fetch local storage on component mount
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('url'));
        if (storedData) {
            setData(storedData);
        }
    }, []);

    // Handle button submission
    const handleButtonSubmit = async () => {
        if (!longUrl) {
            setError('INPUT SOME TEXT');
            return;
        }

        try {
            const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
            const shortenedUrl = await response.text();

            // Add new shortened URL to data and store it
            const newData = { longUrl, shortUrl: shortenedUrl };
            storeDataToLocalStorage(newData);

            setLongurl(''); // Clear the input field
            setShortUrl(shortenedUrl);
            setError(null); // Clear error
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <section className="search_div">
                <div className="search_div2">
                    <input
                        type="text"
                        placeholder="Shorten a link here..."
                        value={longUrl}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleButtonSubmit}>Shorten it?</button>
                    {error && <p className='errorTag'>{error}</p>}
                </div>
            </section>

            

            <div className="result_div">
                {data.map((item, index) => (
                    <div className="each_result" key={index}>
                        <div className="each_result1">
                            <img
                                src={removebtn}
                                onClick={() => removeItem(index)}
                                alt="Remove"
                            />
                            <h3>{item.longUrl}</h3>
                        </div>
                        <div className="each_result2">
                            <h3>{item.shortUrl}</h3>
                            <button
                                onClick={() =>
                                    navigator.clipboard.writeText(item.shortUrl)
                                }
                            >
                                Copy
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SearchDiv;