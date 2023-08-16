import React, { useState, useEffect } from "react";

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    price: "",
  });

  const handlesubmit = (e) => {
    e.preventDefault();

    fetch(`https://reactdeploy-429c.onrender.com/book/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("booked added");
        if (data.msg === "book added!") {
          setFormData({
            title: "",
            author: "",
            genre: "",
            description: "",
            price: "",
          });
        }
      });
  };

  return (
    <div>
      <h2>Add book</h2>

      <form onSubmit={handlesubmit}>
        <label htmlFor="title">title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />{" "}
        <br />
        <label htmlFor="Author">Author</label>
        <input
          type="text"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        />{" "}
        <br />
        <label htmlFor="genre">Genre</label>
        <select
          value={formData.genre}
          onChange={(e) => setFormData({ ...formData, genre: e.target.genre })}
        >
          <option value="Fiction">Fiction</option>
          <option value="Science">Science</option>
          <option value="Comic">Comic</option>
        </select>
        <br />
        <label htmlFor="description">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        ></textarea>
        <br />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          value={formData.value}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />{" "}
        <br />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
