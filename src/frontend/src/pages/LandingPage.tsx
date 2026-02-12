import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Shield, Sparkles } from 'lucide-react';

type Page = 'home' | 'catalog' | 'hygiene' | 'sweet-detail' | 'owner';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-terracotta-100/50 via-marigold-100/30 to-sand-100/50" />
        <div className="container relative py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 bg-marigold-100 text-marigold-800 rounded-full text-sm font-medium">
                Authentic Traditional Sweets
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-terracotta-900 leading-tight">
                Discover the Sweetness of Marward Sweets Pilani
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Experience the rich heritage through our carefully curated collection
                of traditional and modern sweets. Each treat tells a story of culture, craftsmanship,
                and uncompromising quality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => onNavigate('catalog')}
                  className="bg-terracotta-600 hover:bg-terracotta-700 text-white shadow-lg"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Browse Our Catalog
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate('hygiene')}
                  className="border-terracotta-300 hover:bg-terracotta-50"
                >
                  <Shield className="mr-2 h-5 w-5" />
                  View Hygiene Ratings
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-marigold-400/20 to-terracotta-400/20 rounded-3xl blur-3xl" />
              <img
                src="/assets/generated/hero-rajasthan.dim_1600x600.png"
                alt="Marward Sweets Pilani Shop"
                className="relative rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-terracotta-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We combine traditional recipes with modern hygiene standards to bring you the best
            sweets experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-terracotta-200 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-full bg-marigold-100 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-marigold-700" />
              </div>
              <h3 className="font-display text-xl font-bold text-terracotta-900 mb-2">
                Authentic Recipes
              </h3>
              <p className="text-muted-foreground">
                Traditional recipes passed down through generations, preserving the
                authentic taste and cultural heritage.
              </p>
            </CardContent>
          </Card>

          <Card className="border-terracotta-200 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-full bg-terracotta-100 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-terracotta-700" />
              </div>
              <h3 className="font-display text-xl font-bold text-terracotta-900 mb-2">
                Hygiene First
              </h3>
              <p className="text-muted-foreground">
                Maintaining the highest standards of cleanliness and food safety. Check our
                customer ratings and reviews.
              </p>
            </CardContent>
          </Card>

          <Card className="border-terracotta-200 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-full bg-sand-200 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-sand-800" />
              </div>
              <h3 className="font-display text-xl font-bold text-terracotta-900 mb-2">
                Wide Variety
              </h3>
              <p className="text-muted-foreground">
                From traditional glucose drops to modern chocolate treats, explore our diverse
                collection of sweets for every taste.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16 md:py-24">
        <Card className="border-terracotta-200 bg-gradient-to-br from-terracotta-50 to-marigold-50">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-terracotta-900 mb-4">
              Ready to Explore?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Browse our complete catalog of sweets and discover your new favorites. Each sweet is
              crafted with care and tradition.
            </p>
            <Button
              size="lg"
              onClick={() => onNavigate('catalog')}
              className="bg-terracotta-600 hover:bg-terracotta-700 text-white shadow-lg"
            >
              View All Sweets
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
