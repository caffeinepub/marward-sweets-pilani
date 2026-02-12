import { useState } from 'react';
import { useSubmitReview } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RatingStars } from './RatingStars';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LogIn, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export function HygieneReviewForm() {
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();
  const { mutate: submitReview, isPending, isSuccess } = useSubmitReview();

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('Please sign in to submit a review');
      return;
    }

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    submitReview(
      {
        rating: BigInt(rating),
        reviewText: reviewText.trim() || null,
      },
      {
        onSuccess: () => {
          toast.success('Review submitted successfully!');
          setRating(0);
          setReviewText('');
        },
        onError: () => {
          toast.error('Failed to submit review. Please try again.');
        },
      }
    );
  };

  if (!isAuthenticated) {
    return (
      <Alert className="border-terracotta-200 bg-terracotta-50/50">
        <LogIn className="h-4 w-4 text-terracotta-700" />
        <AlertDescription className="text-terracotta-900">
          <p className="mb-3">Please sign in to submit a hygiene rating and review.</p>
          <Button
            onClick={login}
            disabled={isLoggingIn}
            size="sm"
            className="bg-terracotta-600 hover:bg-terracotta-700"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </>
            )}
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (isSuccess) {
    return (
      <Alert className="border-terracotta-200 bg-terracotta-50/50">
        <CheckCircle2 className="h-4 w-4 text-terracotta-700" />
        <AlertDescription className="text-terracotta-900">
          <p className="mb-3">Thank you for your feedback! Your review has been submitted.</p>
          <Button
            onClick={() => window.location.reload()}
            size="sm"
            variant="outline"
            className="border-terracotta-300 hover:bg-terracotta-50"
          >
            Submit Another Review
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="rating" className="text-terracotta-900">
          Hygiene Rating *
        </Label>
        <RatingStars rating={rating} onChange={setRating} size="lg" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="review" className="text-terracotta-900">
          Review (Optional)
        </Label>
        <Textarea
          id="review"
          placeholder="Share your experience about the shop's cleanliness and hygiene..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={4}
          className="border-terracotta-200 focus-visible:ring-terracotta-400 resize-none"
        />
      </div>

      <Button
        type="submit"
        disabled={isPending || rating === 0}
        className="w-full bg-terracotta-600 hover:bg-terracotta-700"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Review'
        )}
      </Button>
    </form>
  );
}
