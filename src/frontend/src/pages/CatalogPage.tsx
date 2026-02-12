import { useState, useMemo } from 'react';
import { useSweets } from '../hooks/useQueries';
import { SweetCard } from '../components/SweetCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Loader2 } from 'lucide-react';
import { Category } from '../backend';

type Page = 'home' | 'catalog' | 'hygiene' | 'sweet-detail';

interface CatalogPageProps {
  onNavigate: (page: Page, sweetIndex?: number) => void;
}

export function CatalogPage({ onNavigate }: CatalogPageProps) {
  const { data: sweets, isLoading, error } = useSweets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredSweets = useMemo(() => {
    if (!sweets) return [];

    return sweets.filter((sweet, index) => {
      const matchesSearch =
        sweet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sweet.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || sweet.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [sweets, searchQuery, selectedCategory]);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: Category.chocolate, label: 'Chocolate' },
    { value: Category.cake, label: 'Cake' },
    { value: Category.candy, label: 'Candy' },
    { value: Category.glucose, label: 'Glucose' },
    { value: Category.toffee, label: 'Toffee' },
    { value: Category.other, label: 'Other' },
  ];

  return (
    <div className="container py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-terracotta-900 mb-2">
          Our Sweet Collection
        </h1>
        <p className="text-lg text-muted-foreground">
          Explore our variety of traditional and modern sweets
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sweets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-terracotta-200 focus-visible:ring-terracotta-400"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="border-terracotta-200 focus:ring-terracotta-400">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-terracotta-600" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-16">
          <p className="text-destructive">Failed to load sweets. Please try again.</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && filteredSweets.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No sweets found matching your criteria.</p>
        </div>
      )}

      {/* Sweets Grid */}
      {!isLoading && !error && filteredSweets.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSweets.map((sweet, index) => {
            const originalIndex = sweets?.findIndex((s) => s.name === sweet.name) ?? index;
            return (
              <SweetCard
                key={`${sweet.name}-${index}`}
                sweet={sweet}
                onClick={() => onNavigate('sweet-detail', originalIndex)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
