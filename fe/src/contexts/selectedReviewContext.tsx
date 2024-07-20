import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Review, SelectedReviewContextData } from '../models';

const SelectedReviewContext = createContext<SelectedReviewContextData | undefined>(undefined);

const SelectedReviewProvider = ({ children }: { children: ReactNode }) => {
    const [selectedReview, setselectedReview] = useState<Review | null>(null);

    const selectReview = (review: Review) => {
        setselectedReview(review);
    };

    const cancelSelectedReview = () => {
        setselectedReview(null);
    };

    return (
        <SelectedReviewContext.Provider value={{ selectedReview, selectReview, cancelSelectedReview }}>
            {children}
        </SelectedReviewContext.Provider>
    )
};

const useSelectedReview = () => {
    return useContext(SelectedReviewContext);
};

export { SelectedReviewProvider, useSelectedReview };