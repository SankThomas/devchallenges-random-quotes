"use client";

import { Button } from "@/components/ui/button";
import { Shuffle } from "lucide-react";
import { Link } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [data, setData] = useState();

  const getQuote = async () => {
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/3-javascript/challenges/group_1/data/random-quotes.json",
      );
      const quotes = await res.json();

      const quote = Math.floor(Math.random() * quotes.length);
      const singleRandomQuote = quotes[quote];
      setData(singleRandomQuote);
    } catch (error) {
      toast.error("An error occurred when fetching the quotes", {
        description: error.message,
      });
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(data?.quote);
    toast.success("Copied the quote to clipboard");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg rounded bg-[#20293A] p-6 shadow">
        <h1 className="text-center text-lg font-semibold">{data?.author}</h1>

        <ul className="mt-4 mb-8 flex items-center justify-center gap-4">
          <li className="rounded-full border border-[#AEB0FF] px-2 py-0.5 text-xs text-[#AEB0FF]">
            {data?.tags[0]}
          </li>
          <li className="rounded-full border border-[#AEB0FF] px-2 py-0.5 text-xs text-[#AEB0FF]">
            {data?.tags[1]}
          </li>
        </ul>

        <p className="text-center text-lg text-white/75">{data?.quote}</p>
      </div>

      <ul className="mt-8 flex items-center justify-center gap-4">
        <li>
          <Button
            onClick={getQuote}
            className="cursor-pointer bg-[#20293A] hover:bg-[#20293A]/75"
          >
            Random <Shuffle />
          </Button>
        </li>
        <li>
          <Button
            onClick={copyToClipboard}
            className="cursor-pointer bg-[#20293A] hover:bg-[#20293A]/75"
          >
            Share <Link />
          </Button>
        </li>
      </ul>
    </div>
  );
}
