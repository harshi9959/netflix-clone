import { NextApiRequest, NextApiResponse } from 'next';

import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('check')
    if (req.method !== 'GET') {
        return res.status(405).json({place: "index.js"});
    }

    try {
        await serverAuth(req)
        console.log(req.query, 'req')
        const movies = await prismadb.Movies.findMany();
        return res.status(200).json(movies);
    } catch (error) {
        console.log(error, 'error');
        return res.status(400).end();
    }
}