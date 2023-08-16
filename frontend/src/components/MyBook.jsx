import React, { useEffect, useState } from "react";

const MyBook = () => {
  const [books, setBooks] = useState([]);
  const fetchbooks = () => {
    fetch(`https://reactdeploy-429c.onrender.com/book`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBooks(data.book);
      })
      .catch((err) => {
        console.log(console.err);
      });
  };
  useEffect(() => {
    fetchbooks();
  }, [fetchbooks]);
  // const renderbook=()=>{
  //     if(data.length===0)
  // }
};
export default MyBook;
