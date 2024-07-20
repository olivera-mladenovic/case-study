import { Review } from "../review";

export interface SelectedReviewContextData {
    selectedReview: Review | null;
    selectReview: (review: Review) => void;
    cancelSelectedReview: () => void;
}