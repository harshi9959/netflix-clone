import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import { result } from 'lodash';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    
    if (req.method !== 'POST') {
      return res.status(405).end();
    }
    // console.log(req, "req")
    // const { email, password } = req.body;

    // const existingUser = await prismadb.user.findUnique({
    //   where: {
    //     email
    //   }
    // })
    // if(!existingUser){
    const {email,password} = req.body;
    console.log(email, password)
     
    // const user = await prismadb.user.findMany(
// )
// console.log(user, "user")
const user = await prismadb.user.findUnique({
    where: {
        email
    }
})

const result = await bcrypt.compare(password,user.hashedPassword)
console.log(result, "result")
if (!result){
    return (
        res.status(200).json({error:"wrong password"})
           )
}


   
    return res.status(200).json({user:user})



       
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }

}