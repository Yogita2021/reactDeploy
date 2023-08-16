import React from "react";

const MyBook = ({ data }) => {
  const handleDeleteBook = (id) => {
    fetch(`https://reactdeploy-429c.onrender.com/book/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {data.map((el) => {
        return (
          <div key={el._id}>
            <h1>{el.title}</h1>
            <p>{el.author}</p>
            <p>{el.genre}</p>
            <p>{el.description}</p>
            <p>{el.price}</p>
            <button onClick={() => handleDeleteBook(el._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export { MyBook };
