import * as React from "react";
import CinemaTable from "./CinemaTable.js";
import CinemaSearch from "./CinemaSearch.js";
import { useQuery } from "@apollo/client";
import { NetworkStatus } from "@apollo/client";
import { useParams, useSearchParams } from "react-router-dom";
import { QUERY_CINEMA_BY } from "../../../queries/CinemaGraphql.js";

export default function CinemaLayout() {
  //   let { userType } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  let cinema_name = searchParams.get("cinema_name");

  let params = {
    cinema_name: cinema_name,
  };

  const { loading, error, data, refetch, networkStatus } = useQuery(QUERY_CINEMA_BY, {
    variables: params,

    notifyOnNetworkStatusChange: true,
  });
  if (networkStatus === NetworkStatus.refetch) return "Refetching!";
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <div>
        <CinemaSearch></CinemaSearch>
      </div>

      <CinemaTable rows={data.queryCinemaBy} refetch={refetch} />
    </div>
  );
}
