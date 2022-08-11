import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../../utils/queries";
import spinner from "../assets/spinner.gif";

export default function Category() {
  const { data, loading } = useQuery(GET_CATEGORIES);
  const categories = data?.categories || [];

  return (
    <div>
        { loading ? ( <div className="d-flex justify-content-center align-items-center mt-5">
          <img src={spinner} alt="loading" />
        </div>) : (
        <select className="float-right" defaultValue={'DEFAULT'}>
            <option value="DEFAULT">Select an Option</option>
          {categories.map((category) => { return (
              <option key={category._id} value={category.name}>{category.name}</option>
            )}
          )}
        </select>
        )}
    </div>
  );
}
