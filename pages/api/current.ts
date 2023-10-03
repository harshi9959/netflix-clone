import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== 'GET') {
//       return res.status(405).end();
//     }

//     try {
//       const { currentUser } = await serverAuth(req);
      
//     return res.status(200).json(currentUser);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).end();
//   }
// }

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
  console.log("res",req)

  if (req.method === 'GET') {
  try {
    const { currentUser } = await serverAuth(req);
    console.log('--',currentUser)
    return res.status(200).json(currentUser);

    // return res.status(200).json({msg: "msg"})
  }catch(error){

    return res.status(400).end()
  }
  }else {
    return res.status(405).end();
  }
}