import axios from "axios";
import React, { useEffect, useState } from "react";

const CategoryMv = () => {
  const [dataMV, setDataMV] = useState([]);
  useEffect(() => {
    async function fetch() {
      try {
        const response = await axios.get(
          `https://api-zingmp3-omega.vercel.app/api/top100`
        );
        console.log("data mv:", response);
        if (response.data && response.data.data) {
          setDataMV(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div></div>;
};

export default CategoryMv;
