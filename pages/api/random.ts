import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }
  try {

    await serverAuth(req);
    // console.log("prisma db", prismadb);
    const moviecount = await prismadb.Movies.count();
    // console.log(moviecount, "moviecount");

    const randomIndex = Math.floor(Math.random() * moviecount);

    const randommovies = await prismadb.Movies.findMany({
      take: 1,
      skip: randomIndex
    });

    console.log(randommovies);
    
    return res.status(200).json(randommovies[0]);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}