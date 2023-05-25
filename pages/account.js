import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { signIn, signOut, useSession } from "next-auth/react";

const AccountPage = () => {
  const {data:session} = useSession();


  const Logout = async  () => {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  };

  const Login = async ()=>{
    await signIn('google')
  }

  return (
    <>
      <Header />
      <Center>
        
        <Title>Account</Title>
        {session && (
          <Button primary={1} onClick={Logout}>
            Logout
          </Button>
        )}
        {!session && (
            <Button primary={1} onClick={Login}>Login</Button>
        )}
      </Center>
    </>
  );
};
export default AccountPage;
