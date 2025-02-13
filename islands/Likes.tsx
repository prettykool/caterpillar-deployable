import { useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { caterpillarSettings } from "../settings.ts";

export default function Likes(props: {
  href?: string;
  total: number;
}) {
  const handleVote = async () => {
    const objURL = props.href ?? window.location.href;

    let token = await caches.open("parasite");
    token = await token.match("/login");
    token = await token.text();

    let likeObj = {
          "type": "Like",
          "object": objURL,
        }
    
    console.log(likeObj)
    
    const r = await fetch(
      (new URL("/x/like", window.location.origin)).href,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "Accept": "application/activity+json",
        },
        body: JSON.stringify(likeObj),
      },
    );

    if (r.status === 201) {
      window.location.reload();
    } else {
      alert((await r.json()).msg);
    }
  };

  return (
    <div>
      <button class="text-green-700" onClick={handleVote} title="Like">
        +{props.total}
      </button>
    </div>
  );
}
