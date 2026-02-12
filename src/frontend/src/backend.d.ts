import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SweetShopReview {
    reviewText?: string;
    author: Principal;
    rating: bigint;
}
export interface Sweet {
    name: string;
    description: string;
    category: Category;
    image: string;
    price: bigint;
}
export interface UserProfile {
    name: string;
}
export enum Category {
    other = "other",
    candy = "candy",
    cake = "cake",
    glucose = "glucose",
    toffee = "toffee",
    chocolate = "chocolate"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addSweet(sweet: Sweet): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllReviews(): Promise<Array<SweetShopReview>>;
    getAllSweets(): Promise<Array<Sweet>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitReview(rating: bigint, reviewText: string | null): Promise<void>;
    updateSweetPrice(name: string, newPrice: bigint): Promise<void>;
}
