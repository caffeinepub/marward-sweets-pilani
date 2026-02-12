import { HygieneStats } from '../components/HygieneStats';
import { HygieneReviewForm } from '../components/HygieneReviewForm';
import { HygieneReviewList } from '../components/HygieneReviewList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export function HygienePage() {
  return (
    <div className="container py-8 md:py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-terracotta-100 mb-4">
          <Shield className="h-8 w-8 text-terracotta-700" />
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-terracotta-900 mb-2">
          Hygiene Ratings
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your feedback helps us maintain the highest standards of cleanliness and food safety
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8">
        <HygieneStats />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Review Form */}
        <Card className="border-terracotta-200">
          <CardHeader>
            <CardTitle className="text-terracotta-900">Submit Your Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <HygieneReviewForm />
          </CardContent>
        </Card>

        {/* Recent Reviews */}
        <Card className="border-terracotta-200">
          <CardHeader>
            <CardTitle className="text-terracotta-900">Recent Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <HygieneReviewList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
