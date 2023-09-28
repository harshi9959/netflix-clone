import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({place: "moveid"});
  }
  try {
    await serverAuth(req);

    const { movieId } = req.query;
    console.log(req, "movieIdmovieId")

    if (typeof movieId !== 'string') {
      throw new Error('Invalid Id');
    }

    if (!movieId) {
      throw new Error('Invalid ID');
    }

    const movies = await prismadb.Movies.findUnique({
      where: {
        id: movieId
      }
    });
    console.log(movies)

    if (!movies) {
      throw new Error('Invalid ID');
    }

    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
