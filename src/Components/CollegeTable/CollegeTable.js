import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import "./CollegeTable.css";
import "../data.json";

// Simulating a fetch function for your JSON data
const fetchData = () => {
    return require('../data.json');  // Adjust the path as necessary
};

function CollegeTable() {
    const [data, setData] = useState([]);
    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setData(fetchData());
        setItems(fetchData().slice(0, 10));
    }, []);

    const fetchMoreData = () => {
        if (items.length >= data.length) {
            setHasMore(false);
            return;
        }
        setTimeout(() => {
            setItems(items.concat(data.slice(items.length, items.length + 10)));
        }, 500);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        const filteredData = data.filter(item =>
            item.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setItems(filteredData);
    };

    const sortBy = (key, asc = true) => {
        const sortedData = [...data].sort((a, b) => {
            return asc ? a[key] - b[key] : b[key] - a[key];
        });
        setData(sortedData);
        setItems(sortedData.slice(0, 10));
    };

    return (
        <div>
            <input type="text" placeholder="Search by college name" value={search} onChange={handleSearch} />
            <div>
                <button onClick={() => sortBy('rating')}>Sort by Rating</button>
                <button onClick={() => sortBy('fees')}>Sort by Fees</button>
                <button onClick={() => sortBy('review')}>Sort by Review</button>
            </div>
            <InfiniteScroll
                dataLength={items.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>You have seen all colleges</b>
                    </p>
                }
            >
                <table>
                    <thead>
                        <tr>
                            <th>College Name</th>
                            <th>Rating</th>
                            <th>Fees</th>
                            <th>Review</th>
                            <th>Featured</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.rating}</td>
                                <td>{item.fees}</td>
                                <td>{item.review}</td>
                                <td>{item.featured ? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </InfiniteScroll>
        </div>
    );
}

export default CollegeTable;