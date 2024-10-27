import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q: query } = req.query;

  if (!query || Array.isArray(query)) {
    return res.status(400).json({ message: "Query parameter is required" });
  }

  try {
    const response = await fetch(`https://api.github.com/search/users?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      return res.status(response.status).json({ message: "Error fetching data" });
    }
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
