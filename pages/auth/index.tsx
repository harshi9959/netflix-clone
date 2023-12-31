import axios from 'axios';
import { useState, useCallback } from 'react';
import Input from '@/components/input';
import {getSession, signIn } from 'next-auth/react';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
// import { FcGoogle } from 'react-icons/fc';
// import { FaGithub } from 'react-icons/fa';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      }
    }
  }

  return {
    props: {}
  }
}

const Auth = () => {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
  
    setVariant((currentVariant) => currentVariant == 'login' ? 'Register' : "login");
  }, []);

  // const login = useCallback(async () => {
  //   try {
  //     await signIn('credentials', {
  //       email,
  //       name,
  //       password,
  //       callbackUrl: '/profiles',
  //     });
     
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [email, name, password]);

  const login = async ()=>{
   
    try{
      const {data} = await axios.post('/api/login', {
        
        email,
        password
      });
      console.log(data, "data")
      if(data.user){
        router.push('/profiles')
      }
      else{
        console.log(data.error)
      }
      
    }
    catch (error) {
      console.log(error);
    }
  }
    
  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password
      });

      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password]);
// const handleGoogle = () => {
//   console.log('check google')
//    signIn('google', { callbackUrl: '/profiles' })
// () => signIn('google', { callbackUrl: '/profiles' })
  return (
    <div className="relative h-full w-full bg-[url('../public/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-5 py-10">
          <img src="/images/logo.jpg" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-5 py-10 self center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semihold">
              {variant == 'login' ? 'Sign in' : 'Register'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant == 'Register' && (
                <Input
                  label="username"
                  type="text"
                  onChange={(e: any) => setName(e.target.value)}
                  id="name"
                  value={name}
                />
              )}
              <Input
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
              <Input
                id="Password"
                onChange={(ev: any) => setPassword(ev.target.value)}
                label="password"
                type="password"
                value={password}
              />
            </div>
            <button onClick={variant == 'login' ? login : register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition ">
              {variant == 'login' ? 'Login' : 'Sign up'}
            </button>
            {/* <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div onClick={() => signIn('google', { callbackUrl: './profiles' })}
                className="
                w-10
                h-10
                bg-white
                rounded-full
                flex
                items-center
                justify-center
                cursor-pointer
                hover:opacity-80
                transition
                "
              >
                <FcGoogle size={30} />
              </div>
              <div onClick={() => signIn('github', { callbackUrl: './profiles' })}
                className="
                w-10
                h-10
                bg-white
                rounded-full
                flex
                items-center
                justify-center
                cursor-pointer
                hover:opacity-80
                transition
                "
              >
                <FaGithub size={30} />

              </div> */}
            </div>
            <p className="text-neutral-500 mt-12">
            {variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
              <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
              {variant === 'login' ? 'Create an account' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
  ); 
              }
export default Auth;