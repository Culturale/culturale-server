
import type { MakeReviewDTO } from '~/infrastructure/dtos/make-review.dto';

import { Review } from './review';


describe('Event Review', function () {
  let instance: Review;

  const dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => 1234);

  beforeEach(function () {
    const reviewProps: MakeReviewDTO  = {eventId: '645b9ce003aaad67d81d2887', authorId: '645b9cf103aaad67d81d288a', puntuation: 7, comment: 'comment-test', report: 0};
    instance = new Review(
      reviewProps,
    );
  });

  it('can be created', function () {
    expect(instance).toMatchSnapshot();
    dateSpy.mockReset();
  });
});
