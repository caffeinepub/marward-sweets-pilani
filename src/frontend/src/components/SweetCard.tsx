import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sweet, Category } from '../backend';

interface SweetCardProps {
  sweet: Sweet;
  onClick: () => void;
}

export function SweetCard({ sweet, onClick }: SweetCardProps) {
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
    <Card className="group overflow-hidden border-terracotta-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
      <div
        onClick={onClick}
        className="relative aspect-square bg-gradient-to-br from-sand-100 to-terracotta-50 overflow-hidden"
      >
        <img
          src="/assets/generated/sweets-icons-set.dim_1024x1024.png"
          alt={sweet.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-3 right-3 bg-marigold-100 text-marigold-800 hover:bg-marigold-200">
          {getCategoryLabel(sweet.category)}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-display text-lg font-bold text-terracotta-900 mb-1 line-clamp-1">
          {sweet.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{sweet.description}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-bold text-terracotta-700">₹{Number(sweet.price)}</span>
          <span className="text-xs text-muted-foreground">per piece</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={onClick}
          variant="outline"
          className="w-full border-terracotta-300 hover:bg-terracotta-50 hover:text-terracotta-700"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
