import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_DATA = gql`
  query GetData {
    data {
      id
      value
    }
  }
`;

function ExampleQuery() {
  const { loading, error, data } = useQuery(GET_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data.data.map(({ id, value }) => (
        <div key={id}>
          <p>{`${id}: ${value}`}</p>
        </div>
      ))}
    </div>
  );
}

export default ExampleQuery;
