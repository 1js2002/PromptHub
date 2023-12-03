"use client";
import { Alert } from "@mui/material";

function CalloutCard({ message }) {
  return <Alert className="w-full h-auto "  variant="outlined" severity="warning">{message}</Alert>;
}

export default CalloutCard;
