import Link from "next/link";
import { styled } from "styled-components";
import Center from "./Center";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const StyleHeader = styled.header`
  background-color: #222;
`;
const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const StyleNav = styled.nav`
    display:flex;
    gap:15px;

`;

const NavLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
`;

const Header = () => {
  const {cartProducts} = useContext(CartContext);
  return (
    <StyleHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>Ecommerce</Logo>
          <StyleNav>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>All products</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
            <NavLink href={"/account"}>Account</NavLink>
            <NavLink href={"/cart"}>Cart ({cartProducts.length})</NavLink>
          </StyleNav>
        </Wrapper>
      </Center>
    </StyleHeader>
  );
};
export default Header;
