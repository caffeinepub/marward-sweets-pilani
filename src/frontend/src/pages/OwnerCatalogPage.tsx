import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useSweets, useAddSweet, useUpdateSweetPrice, useGetCallerUserRole } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Plus, DollarSign, LogIn, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';
import { Category, UserRole } from '../backend';

export function OwnerCatalogPage() {
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  const { data: userRole, isLoading: roleLoading } = useGetCallerUserRole();
  const { data: sweets, isLoading: sweetsLoading } = useSweets();
  const addSweetMutation = useAddSweet();
  const updatePriceMutation = useUpdateSweetPrice();

  const [newSweet, setNewSweet] = useState({
    name: '',
    description: '',
    category: 'other' as keyof typeof Category,
    price: '',
    image: '',
  });

  const [priceUpdate, setPriceUpdate] = useState({
    sweetName: '',
    newPrice: '',
  });

  const isOwner = userRole === UserRole.admin;

  const handleAddSweet = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newSweet.name || !newSweet.description || !newSweet.price) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await addSweetMutation.mutateAsync({
        name: newSweet.name,
        description: newSweet.description,
        category: Category[newSweet.category],
        price: BigInt(newSweet.price),
        image: newSweet.image || '/placeholder-sweet.jpg',
      });

      toast.success('Sweet added successfully!');
      setNewSweet({
        name: '',
        description: '',
        category: 'other',
        price: '',
        image: '',
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to add sweet');
    }
  };

  const handleUpdatePrice = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!priceUpdate.sweetName || !priceUpdate.newPrice) {
      toast.error('Please select a sweet and enter a new price');
      return;
    }

    try {
      await updatePriceMutation.mutateAsync({
        name: priceUpdate.sweetName,
        newPrice: BigInt(priceUpdate.newPrice),
      });

      toast.success('Price updated successfully!');
      setPriceUpdate({
        sweetName: '',
        newPrice: '',
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to update price');
    }
  };

  // Not authenticated - show sign in prompt
  if (!isAuthenticated) {
    return (
      <div className="container py-16">
        <Card className="max-w-md mx-auto border-terracotta-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-terracotta-900">
              <LogIn className="h-5 w-5" />
              Sign In Required
            </CardTitle>
            <CardDescription>
              You need to sign in to access the owner management area.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={login}
              disabled={isLoggingIn}
              className="w-full bg-terracotta-600 hover:bg-terracotta-700"
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
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading role
  if (roleLoading) {
    return (
      <div className="container py-16 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-terracotta-600" />
      </div>
    );
  }

  // Not an owner
  if (!isOwner) {
    return (
      <div className="container py-16">
        <Card className="max-w-md mx-auto border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <ShieldAlert className="h-5 w-5" />
              Access Denied
            </CardTitle>
            <CardDescription>
              You do not have permission to access this page. Only shop owners can manage the catalog.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // Owner view
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-terracotta-900 mb-2">
          Owner Catalog Management
        </h1>
        <p className="text-muted-foreground">
          Add new sweets and update prices for your catalog.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add Sweet Form */}
        <Card className="border-terracotta-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-terracotta-900">
              <Plus className="h-5 w-5" />
              Add New Sweet
            </CardTitle>
            <CardDescription>
              Add a new sweet to your catalog
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddSweet} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Sweet Name *</Label>
                <Input
                  id="name"
                  value={newSweet.name}
                  onChange={(e) => setNewSweet({ ...newSweet, name: e.target.value })}
                  placeholder="e.g., Gulab Jamun"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={newSweet.description}
                  onChange={(e) => setNewSweet({ ...newSweet, description: e.target.value })}
                  placeholder="Describe the sweet..."
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={newSweet.category}
                  onValueChange={(value) => setNewSweet({ ...newSweet, category: value as keyof typeof Category })}
                >
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chocolate">Chocolate</SelectItem>
                    <SelectItem value="cake">Cake</SelectItem>
                    <SelectItem value="candy">Candy</SelectItem>
                    <SelectItem value="glucose">Glucose</SelectItem>
                    <SelectItem value="toffee">Toffee</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (₹) *</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  value={newSweet.price}
                  onChange={(e) => setNewSweet({ ...newSweet, price: e.target.value })}
                  placeholder="e.g., 50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image Path</Label>
                <Input
                  id="image"
                  value={newSweet.image}
                  onChange={(e) => setNewSweet({ ...newSweet, image: e.target.value })}
                  placeholder="e.g., /sweet-image.jpg"
                />
              </div>

              <Button
                type="submit"
                disabled={addSweetMutation.isPending}
                className="w-full bg-terracotta-600 hover:bg-terracotta-700"
              >
                {addSweetMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Sweet
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Update Price Form */}
        <Card className="border-terracotta-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-terracotta-900">
              <DollarSign className="h-5 w-5" />
              Update Sweet Price
            </CardTitle>
            <CardDescription>
              Change the price of an existing sweet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdatePrice} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sweetName">Select Sweet *</Label>
                {sweetsLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-5 w-5 animate-spin text-terracotta-600" />
                  </div>
                ) : (
                  <Select
                    value={priceUpdate.sweetName}
                    onValueChange={(value) => setPriceUpdate({ ...priceUpdate, sweetName: value })}
                  >
                    <SelectTrigger id="sweetName">
                      <SelectValue placeholder="Choose a sweet..." />
                    </SelectTrigger>
                    <SelectContent>
                      {sweets?.map((sweet) => (
                        <SelectItem key={sweet.name} value={sweet.name}>
                          {sweet.name} (Current: ₹{sweet.price.toString()})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPrice">New Price (₹) *</Label>
                <Input
                  id="newPrice"
                  type="number"
                  min="0"
                  value={priceUpdate.newPrice}
                  onChange={(e) => setPriceUpdate({ ...priceUpdate, newPrice: e.target.value })}
                  placeholder="Enter new price..."
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={updatePriceMutation.isPending}
                className="w-full bg-terracotta-600 hover:bg-terracotta-700"
              >
                {updatePriceMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <DollarSign className="mr-2 h-4 w-4" />
                    Update Price
                  </>
                )}
              </Button>
            </form>

            {sweets && sweets.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-terracotta-900 mb-3">Current Catalog</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {sweets.map((sweet) => (
                    <div
                      key={sweet.name}
                      className="flex justify-between items-center p-2 rounded-md bg-terracotta-50/50 text-sm"
                    >
                      <span className="font-medium">{sweet.name}</span>
                      <span className="text-terracotta-700">₹{sweet.price.toString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
