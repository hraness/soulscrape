"use client";

import { useState } from "react";

export function AuthorizeForm({ code }: { code: string }) {
  const [state, setState] = useState<"idle" | "pending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function authorize() {
    setState("pending");
    try {
      const response = await fetch("/api/v1/device/authorize", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const body = await response.json() as { ok?: boolean; error?: { message?: string } };
      if (body.ok === true) {
        setState("done");
        setMessage("Device authorized. You can return to your terminal.");
      } else {
        setState("error");
        setMessage(body.error?.message ?? "Authorization failed.");
      }
    } catch {
      setState("error");
      setMessage("Authorization failed. Check your connection and try again.");
    }
  }

  if (state === "done") {
    return <p className="connect-result">{message}</p>;
  }
  return (
    <>
      <button
        className="connect-authorize"
        disabled={state === "pending"}
        onClick={() => void authorize()}
        type="button"
      >
        {state === "pending" ? "Authorizing…" : "Authorize this device"}
      </button>
      {state === "error" && <p className="connect-error" role="alert">{message}</p>}
    </>
  );
}
