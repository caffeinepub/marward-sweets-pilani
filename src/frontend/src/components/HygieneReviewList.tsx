import { useHygieneReviews } from '../hooks/useQueries';
import { RatingStars } from './RatingStars';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Loader2, MessageSquare } from 'lucide-react';

export function HygieneReviewList() {
  const { data: reviews, isLoading } = useHygieneReviews();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-terracotta-600" />
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
        <p className="text-muted-foreground">No reviews yet. Be the first to share your feedback!</p>
      </div>
    );
  }

  // Sort reviews by rating (descending) for display
  const sortedReviews = [...reviews].reverse();

  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        {sortedReviews.map((review, index) => (
          <div key={index}>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <RatingStars rating={Number(review.rating)} readonly size="sm" />
                <span className="text-xs text-muted-foreground">
                  {review.author.toString().slice(0, 8)}...
                </span>
              </div>
              {review.reviewText && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {review.reviewText}
                </p>
              )}
            </div>
            {index < sortedReviews.length - 1 && <Separator className="mt-4 bg-terracotta-200" />}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
