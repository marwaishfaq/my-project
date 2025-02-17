import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  //get cat
  const getCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/Category/getAll-Category");
      setCategories(data?.Category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}