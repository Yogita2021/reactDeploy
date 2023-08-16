import React, { useState, useEffect } from "react";
import { MyBook } from "./MyBook";

const AddBook = () => {
  const [data, setdata] = useState([]);

  const [title, settitle] = useState("");
  const [author, setauthor] = useState("");
  const [description, setdescription] = useState("");
  const [genre, setgenre] = useState("");
  const [price, setprice] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    let obj = {
      title: title,
      author: author,
      description: description,
      genre: genre,
      price: price,
    };
    console.log(obj);

    fetch(`https://reactdeploy-429c.onrender.com/book/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.msg);
        fetchbooks();
      });
  };

  const fetchbooks = () => {
    fetch(`https://reactdeploy-429c.onrender.com/book`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setdata(data.book);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchbooks();
  }, []);

  return (
    <div>
      <h2>Add book</h2>

      <form>
        <label htmlFor="title">title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <br />
        <label htmlFor="Author">Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setauthor(e.target.value)}
        />
        <br />
        <label htmlFor="genre">Genre</label>
        <select value={genre} onChange={(e) => setgenre(e.target.genre)}>
          <option value="Fiction">Fiction</option>
          <option value="Science">Science</option>
          <option value="Comic">Comic</option>
        </select>
        <br />
        <label htmlFor="description">Description</label>
        <textarea
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        ></textarea>
        <br />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setprice(e.target.value)}
        />
        <br />
        <input type="submit" onClick={handlesubmit} />
      </form>

      <div>
        <h1>hello</h1>
        <MyBook data={data} />
      </div>
    </div>
  );
};

export default AddBook;
