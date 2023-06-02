import { styled } from "styled-components";
import Input from "./Input";
import WhiteBox from "./WhiteBox";
import StarsRatting from "./StarsRatting";
import Textarea from "./Textarea";
import Button from "./Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { set } from "lodash";
import Spinner from "./Spinner";

const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;
const Subtitles = styled.h3`
  font-size: 1rem;
  margin-top: 5px;
`;
const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns:  1fr;
  gap: 20px;
  margin-bottom: 40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;

  }
`;

const ReviewWrapper = styled.div`
  margin-bottom: 10px;
  border-top: 1px solid #eee;
  padding: 10px 0;
  h3 {
    margin: 3px 0;
    font-size: 1rem;
    color: #333;
    font-weight: normal;
  }
  p {
    margin: 0;
    font-size: 0.7rem;
    line-height: 1rem;
    color: #555;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  time {
    font-size: 12px;

    color: #aaa;
  }
`;

const ProductsRiviews = ({ product }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setRiviewsLoading] = useState(false);

  const submitReview = () => {
    const data = { title, description, stars, product: product._id };

    axios.post("/api/reviews", data).then((res) => {
      setTitle("");
      setDescription("");
      setStars(0);
      loadReviews();
    });
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = () => {
    setRiviewsLoading(true);
    axios.get("/api/reviews?product=" + product._id).then((res) => {
      setReviews(res.data);
      console.log(res);
      setRiviewsLoading(false);
    });
  };

  return (
    <div>
      <Title>Reviews</Title>
      <ColsWrapper>
        <div>
          <WhiteBox>
            <Subtitles>Add review</Subtitles>
            <div>
              <StarsRatting onChange={setStars} />
            </div>

            <Input
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              placeholder="Title"
            />
            <Textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              placeholder="Was it goog? Pros? Cons?"
            />
            <div>
              <Button primary={1} onClick={submitReview}>
                Submit your review
              </Button>
            </div>
          </WhiteBox>
        </div>
        <div>
          <WhiteBox>
            <Subtitles>All reviews</Subtitles>
            {reviewsLoading && <Spinner fullWidth={true} />}
            {reviews.length === 0 && <p>No reviews :( </p>}

            {reviews.length > 0 &&
              reviews.map((review) => (
                <ReviewWrapper key={review._id}>
                  <ReviewHeader>
                    <StarsRatting
                      size="sm"
                      disabled={true}
                      defaultHowMany={review.stars}
                    />
                    <time>
                      {new Date(review.createdAt).toLocaleString("sv-SE")}
                    </time>
                  </ReviewHeader>
                  <h3>{review.title}</h3>
                  <p> {review.description}</p>
                </ReviewWrapper>
              ))}
          </WhiteBox>
        </div>
      </ColsWrapper>
    </div>
  );
};
export default ProductsRiviews;
