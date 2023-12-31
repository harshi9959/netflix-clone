import { getSession } from "next-auth/react";
import { NextPageContext } from "next";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";


export async function getserversideprops(context: NextPageContext) {
    const session = await getSession(context);

if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}
const Profiles = () => {
    const router = useRouter();
    // const { data: user} = useCurrentUser();
    // console.log("user",user)
    const [data, setData] = useState<any>({})
    useEffect(()=>{
        (async()=>{
            const res = await axios.get('http://localhost:3000/api/current')
            const {data} = await res
            setData(data)

        })()
    },[])
    console.log(data)

    return (
    <div className="flex items-center h-full justify-center">
        <div className="flex flex-col">
            <h1 className="text-3xl md:text-6xl text-white text-center">Who is watching?</h1>
            <div className="flex items-center justify-center gap-8 mt-10">
                <div onClick={() => router.push('./header') }>
                    <div className="group flex-row w-44 mx-auto">
                        <div 
                        className="
                        w-22
                        h-22
                        rounded-md
                        flex
                        items-center
                        border-2
                        border-transparent
                        group-hover:cursor-pointer
                        group-hover:border-white
                        overflow-hidden
                        "
                    > 
                    <img src="/images/default-blue.png" alt="profile" />

                    </div>

                    <div
                        className="
                        mt-4
                        text-gray-400
                        text-2xl
                        text-center
                        group:hover:text-white
                        "
                    >
                    {
                        data && data.name ? data.name : 'user'
                    }
                    </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    )
};

export default Profiles;