import { useSweets } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Category } from '../backend';

type Page = 'home' | 'catalog' | 'hygiene' | 'sweet-detail';

interface SweetDetailPageProps {
  sweetIndex: number;
  onNavigate: (page: Page) => void;
}

export function SweetDetailPage({ sweetIndex, onNavigate }: SweetDetailPageProps) {
  const { data: sweets, isLoading, error } = useSweets();

  if (isLoading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-terracotta-600" />
      </div>
    );
  }

  if (error || !sweets || !sweets[sweetIndex]) {
    return (
      <div className="container py-12">
        <Button
          variant="ghost"
          onClick={() => onNavigate('catalog')}
          className="mb-6 hover:bg-terracotta-50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Catalog
        </Button>
        <p className="text-destructive">Sweet not found.</p>
      </div>
    );
  }

  const sweet = sweets[sweetIndex];

  const getCategoryLabel = (category: Category): string => {
    const labels: Record<Category, string> = {
      [Category.chocolate]: 'Chocolate',
      [Category.cake]: 'Cake',
      [Category.candy]: 'Candy',
      [Category.glucose]: 'Glucose',
      [Category.toffee]: 'Toffee',
      [Category.other]: 'Other',
    };
    return labels[category];
  };

  return (
    <div className="container py-8 md:py-12">
      <Button
        variant="ghost"
        onClick={() => onNavigate('catalog')}
        className="mb-6 hover:bg-terracotta-50"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Catalog
      </Button>

      <Card className="border-terracotta-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative aspect-square lg:aspect-auto bg-gradient-to-br from-sand-100 to-terracotta-50">
            <img
              src="/assets/generated/sweets-icons-set.dim_1024x1024.png"
              alt={sweet.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <CardContent className="p-8 md:p-12 flex flex-col justify-center">
            <Badge className="w-fit mb-4 bg-marigold-100 text-marigold-800 hover:bg-marigold-200">
              {getCategoryLabel(sweet.category)}
            </Badge>

            <h1 className="font-display text-3xl md:text-4xl font-bold text-terracotta-900 mb-4">
              {sweet.name}
            </h1>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {sweet.description}
            </p>

            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-3xl font-bold text-terracotta-700">
                ₹{Number(sweet.price)}
              </span>
              <span className="text-muted-foreground">per piece</span>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-terracotta-50 rounded-lg border border-terracotta-200">
                <h3 className="font-semibold text-terracotta-900 mb-2">About This Sweet</h3>
                <p className="text-sm text-muted-foreground">
                  This delightful treat is part of our carefully curated collection, made with
                  traditional recipes and the finest ingredients. Each sweet is prepared with care
                  to ensure the highest quality and authentic taste.
                </p>
              </div>

              <Button
                size="lg"
                onClick={() => onNavigate('catalog')}
                className="w-full bg-terracotta-600 hover:bg-terracotta-700"
              >
                Browse More Sweets
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
