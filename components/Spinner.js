import { BounceLoader } from "react-spinners";
import { styled } from "styled-components";

const Wrapper = styled.div`
  ${(props) =>
    props.fullWidth
      ? `
  display: block;
  display: flex;
  justify-content: center;
  `
      : `
  border: 5px solid blue;`}
`;

const Spinner = ({ fullWidth }) => {
  return (
    <Wrapper fullWidth={fullWidth}>
      <BounceLoader speedMultiplier={3} color={"#555"} />
    </Wrapper>
  );
};

export default Spinner;
