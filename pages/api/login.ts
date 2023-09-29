import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const { email, password } = req.body;
            const user = await prismadb.user.findUnique({
                where: {
                    email
                }
            })

            const result = await bcrypt.compare(password, user.hashedPassword)
            if (!result) {
                return (
                    res.status(200).json({ error: "wrong password" })
                )
            }



            return res.status(200).json({ user: user })




        } catch (error) {
            return res.status(400).json({ error: `Something went wrong: ${error}` });
        }
    } else {
        return res.status(405).end();
    }



}