import { styled } from "styled-components";

const StyledORder = styled.div`
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: space-evenly;
  time {
    font-size: 1rem;

    color: #555;
  }

  @media screen and (min-width: 768px) {
    margin: 10px 0;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
    display: flex;
    gap: 40px;
    align-items: center;
    justify-content: space-around;
  }
`;

const ProductRow = styled.div`
  span {
    color: #aaa;
  }
  @media screen and (min-width: 768px) {
  }
`;
const Address = styled.div`
  font-size: 0.8rem;
  line-height: 0.8rem;
  margin-top: 5px;
  color: #888;
`;

const SingleOrder = ({ line_items, createdAt, ...rest }) => {
  return (
    <StyledORder>
      <div>
        <time>{new Date(createdAt).toLocaleString("sv-SE")}</time>
        <Address>
          {rest.name}
          <br />
          {rest.email}
          <br />
          {rest.streetAddress}
          <br />
          {rest.postalCode} {rest.city}, {rest.country}
        </Address>
      </div>
      <div>
        {line_items.map((item) => (
          <ProductRow key={item._id}>
            <span>{item.quantity} x </span>
            {item.price_data.product_data.name}
          </ProductRow>
        ))}
      </div>
    </StyledORder>
  );
};

export default SingleOrder;
