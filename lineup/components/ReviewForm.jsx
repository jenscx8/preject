import { useState } from 'react';

export default function ReviewForm({ onReview }) {
  const [firstNameValue, setFirstNameValue] = useState('');
  const [reviewValue, setReviewValue] = useState('');

  return (
    <form
      onSubmit={(e) => {
        onReview(e, {
          firstName: firstNameValue,
          review: reviewValue,
        });
      }}
    >
      <label htmlFor="firstName">name</label>
      <input
        name="firstName"
        id="firstName"
        type="text"
        required
        onChange={(e) => setFirstNameValue(e.target.value)}
      />
      <label htmlFor="review">Review Message</label>
      <input
        name="review"
        id="review"
        type="review"
        required
        onChange={(e) => setReviewValue(e.target.value)}
      />
      <button type="submit">leave review</button>
    </form>
  );
}
