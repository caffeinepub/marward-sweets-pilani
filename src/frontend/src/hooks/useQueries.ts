import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Sweet, SweetShopReview, UserRole } from '../backend';

export function useSweets() {
  const { actor, isFetching } = useActor();

  return useQuery<Sweet[]>({
    queryKey: ['sweets'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSweets();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useHygieneReviews() {
  const { actor, isFetching } = useActor();

  return useQuery<SweetShopReview[]>({
    queryKey: ['reviews'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllReviews();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitReview() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ rating, reviewText }: { rating: bigint; reviewText: string | null }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.submitReview(rating, reviewText);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
}

export function useGetCallerUserRole() {
  const { actor, isFetching } = useActor();

  return useQuery<UserRole>({
    queryKey: ['callerUserRole'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

export function useAddSweet() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sweet: Sweet) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.addSweet(sweet);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sweets'] });
    },
  });
}

export function useUpdateSweetPrice() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, newPrice }: { name: string; newPrice: bigint }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updateSweetPrice(name, newPrice);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sweets'] });
    },
  });
}
