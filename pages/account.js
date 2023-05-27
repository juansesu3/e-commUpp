import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Spinner from "@/components/Spinner";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import axios from "axios";
import { set } from "lodash";
import { signIn, signOut, useSession } from "next-auth/react";
import { RevealWrapper } from "next-reveal";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin: 40px 0;
`;

const AccountPage = () => {
  const { data: session } = useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreeAddres] = useState("");
  const [country, setCountry] = useState("");
  const [loaded, setLoaded] = useState(false);

  const Logout = async () => {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  };

  const Login = async () => {
    await signIn("google");
  };

  const saveAddress = () => {
    const data = {
      name,
      email,
      city,
      streetAddress,
      postalCode,
      country,
    };
    axios.put("/api/address", data);
  };
  useEffect(() => {
    axios.get("/api/address").then((response) => {
      setName(response.data.name);
      setEmail(response.data.userEmail);
      setCity(response.data.city);
      setPostalCode(response.data.postalCode);
      setStreeAddres(response.data.streetAddress);
      setCountry(response.data.country);
      setLoaded(true);
    });
  }, []);

  return (
    <>
      <Header />
      <Center>
        <ColsWrapper>
          <div>
            <RevealWrapper delay={0}>
              <WhiteBox>
                <h2>Wishlist</h2>
              </WhiteBox>
            </RevealWrapper>
          </div>
          <div>
            <RevealWrapper delay={100}>
              <WhiteBox>
                <h2>Account Details</h2>
                {!loaded && <Spinner fullWidth={true} />}

                {loaded && (
                  <>
                    <Input
                      type="text"
                      placeholder="Name"
                      value={name}
                      name="name"
                      onChange={(ev) => setName(ev.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Email"
                      value={email}
                      name="email"
                      onChange={(ev) => setEmail(ev.target.value)}
                    />
                    <CityHolder>
                      <Input
                        type="text"
                        placeholder="City"
                        value={city}
                        name="city"
                        onChange={(ev) => setCity(ev.target.value)}
                      />
                      <Input
                        type="text"
                        placeholder="Postal Code"
                        value={postalCode}
                        name="postalCode"
                        onChange={(ev) => setPostalCode(ev.target.value)}
                      />
                    </CityHolder>
                    <Input
                      type="text"
                      placeholder="Street Addres"
                      value={streetAddress}
                      name="streeAdress"
                      onChange={(ev) => setStreeAddres(ev.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Country"
                      value={country}
                      name="country"
                      onChange={(ev) => setCountry(ev.target.value)}
                    />

                    <Button black={1} block={1} onClick={saveAddress}>
                      Save
                    </Button>
                    <hr />
                  </>
                )}

                {session && (
                  <Button primary={1} onClick={Logout}>
                    Logout
                  </Button>
                )}
                {!session && (
                  <Button primary={1} onClick={Login}>
                    Login
                  </Button>
                )}
              </WhiteBox>
            </RevealWrapper>
          </div>
        </ColsWrapper>
      </Center>
    </>
  );
};
export default AccountPage;
