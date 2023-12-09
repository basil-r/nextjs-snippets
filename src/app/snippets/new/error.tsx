"use client";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage(props: ErrorPageProps) {
  return <div>{props.error.message}</div>;
}
