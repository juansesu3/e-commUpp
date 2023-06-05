import { styled } from "styled-components";

const StyleDiv = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
 
 
`;
const Center = ({ children }) => {
  return <StyleDiv>{children}</StyleDiv>;
};

export default Center;
