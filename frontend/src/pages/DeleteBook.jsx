import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:3001/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Deleted Successfully!", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  const handleCancelBook = () => {
    setLoading(false);
    navigate("/");
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl lg:w-[800px] p-8 mx-auto">
        <h3 className="text-2xl text-center flex items-center">
          Are you sure to delete this book?
        </h3>
        <div className="flex items-center justify-center gap-x-4 w-full">
          <button
            className="p-4 w-full bg-gray-600 text-white rounded-xl"
            onClick={handleCancelBook}
          >
            Cancel
          </button>
          {/* <div className="w-[100px]" /> */}
          <button
            className="p-4 w-full bg-red-600 text-white rounded-xl"
            onClick={handleDeleteBook}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
