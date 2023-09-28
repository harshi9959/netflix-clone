import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import { result } from 'lodash';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    return (
        res.send("ok")
    )
}
