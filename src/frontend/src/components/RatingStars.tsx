import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  rating: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function RatingStars({ rating, onChange, readonly = false, size = 'md' }: RatingStarsProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const handleClick = (value: number) => {
    if (!readonly && onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((value) => {
        const isFilled = value <= rating;
        const isPartial = value - 0.5 <= rating && value > rating;

        return (
          <button
            key={value}
            type="button"
            onClick={() => handleClick(value)}
            disabled={readonly}
            className={cn(
              'transition-all',
              !readonly && 'hover:scale-110 cursor-pointer',
              readonly && 'cursor-default'
            )}
          >
            <Star
              className={cn(
                sizeClasses[size],
                isFilled || isPartial
                  ? 'fill-marigold-500 text-marigold-500'
                  : 'text-muted-foreground'
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
