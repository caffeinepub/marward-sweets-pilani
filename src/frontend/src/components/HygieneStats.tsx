import { useHygieneReviews } from '../hooks/useQueries';
import { Card, CardContent } from '@/components/ui/card';
import { RatingStars } from './RatingStars';
import { Star, Users, Loader2 } from 'lucide-react';

export function HygieneStats() {
  const { data: reviews, isLoading } = useHygieneReviews();

  const stats = {
    average: 0,
    count: 0,
  };

  if (reviews && reviews.length > 0) {
    const sum = reviews.reduce((acc, review) => acc + Number(review.rating), 0);
    stats.average = sum / reviews.length;
    stats.count = reviews.length;
  }

  if (isLoading) {
    return (
      <Card className="border-terracotta-200">
        <CardContent className="p-8 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-terracotta-600" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-terracotta-200 bg-gradient-to-br from-terracotta-50 to-marigold-50">
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Average Rating */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-marigold-100 mb-4">
              <Star className="h-8 w-8 text-marigold-700 fill-marigold-700" />
            </div>
            <div className="text-5xl font-bold text-terracotta-900 mb-2">
              {stats.count > 0 ? stats.average.toFixed(1) : '—'}
            </div>
            <RatingStars rating={stats.average} size="lg" readonly />
            <p className="text-sm text-muted-foreground mt-2">Average Hygiene Rating</p>
          </div>

          {/* Total Reviews */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-terracotta-100 mb-4">
              <Users className="h-8 w-8 text-terracotta-700" />
            </div>
            <div className="text-5xl font-bold text-terracotta-900 mb-2">{stats.count}</div>
            <p className="text-sm text-muted-foreground mt-2">
              {stats.count === 1 ? 'Customer Review' : 'Customer Reviews'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
