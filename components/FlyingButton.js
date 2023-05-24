import { styled } from "styled-components";
import { primary } from "@/lib/colors";
import FlyingButtonOriginal from "react-flying-item";
import { useContext } from "react";
import { ButtonStyle } from "./Button";
import { CartContext } from "./CartContext";

const FlyingButtonWrapper = styled.div`
  button {
    ${ButtonStyle}
    ${(props) =>
      props.main
        ? `
     background-color: ${primary};
     color: white;
    `
        : `
    background-color: transparent;
    border: 1px solid ${primary};
    color: ${primary};
    `}
    ${props => props.white && `
    background-color: white;
    border: 1px solid white;
    `}
  }
`;

const FlyingButton = (props) => {
  const { addProduct } = useContext(CartContext);
  return (
    <FlyingButtonWrapper
      white={props.white}
      main={props.main}
      onClick={() => addProduct(props._id)}
    >
      <FlyingButtonOriginal
        {...props}
        targetTop={"5%"}
        targetLeft={"95%"}
        flyingItemStyling={{
          width: "auto",
          heigth: "auto",
          maxWidth: "60px",
          maxHeigth: "60px",
          borderRadius: 0,
        }}
      />
    </FlyingButtonWrapper>
  );
};
export default FlyingButton;
