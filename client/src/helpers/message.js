import React from "react";

export const showErrorMsg = (msg) => (
    <div class="alert alert-danger" role="alert">
    {msg}
  </div>
);

export const showSuccessMsg = (msg) => (
    <div class="alert alert-success" role="alert">
    {msg}
  </div>
);