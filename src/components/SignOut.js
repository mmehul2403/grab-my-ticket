import * as React from "react";
import { useMutation } from "@apollo/client";

import { useNavigate } from "react-router-dom";

import { MUTATION_USER_SIGN_OUT } from "../queries/UserGraphql";

export default function SignOutView() {
  const [signOut] = useMutation(MUTATION_USER_SIGN_OUT);
  const navigate = useNavigate();

  const init = async () => {
    const resp = await signOut();

    if (resp.data.signOut.code === 0) {
      //TODO refresh nav component

      //navigate to signIn
      navigate({
        pathname: "/SignIn",
      });
    }
  };
  init();
  return <div />;
}
