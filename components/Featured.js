import { styled } from "styled-components";
import Center from "./Center";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weogth: normal;
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 40px;
  img {
    max-width: 100%;
  }
`;

const Column = styled.div`
  display:flex;
  align-items: center;
  
`;

const Featured = () => {
  return (
    <Bg>
      <Center>
        <Wrapper>
          <Column>
           <div>
           <Title>Pro anywhere</Title>
            <Desc>
              Lorem Ipsum es simplemente el texto de relleno de las imprentas y
              archivos de texto. Lorem Ipsum ha sido el texto de relleno
              estándar de las industrias desde el año 1500, cuando un impresor
            </Desc>
            <button>Read more</button>
            <button>Add to cart</button>
           </div>
          </Column>
          <Column>
            <img
              src="https://juan-sesu-ecommerce.s3.amazonaws.com/1684156350232.png"
              alt="product-image"
            />
          </Column>
        </Wrapper>
      </Center>
    </Bg>
  );
};

export default Featured;
