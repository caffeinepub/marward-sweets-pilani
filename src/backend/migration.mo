import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";

module {
  type Category = {
    #chocolate;
    #cake;
    #candy;
    #glucose;
    #toffee;
    #other;
  };

  type Sweet = {
    name : Text;
    description : Text;
    price : Nat;
    category : Category;
    image : Text;
  };

  type SweetShopReview = {
    rating : Nat;
    reviewText : ?Text;
    author : Principal;
  };

  type UserProfile = {
    name : Text;
  };

  type OldActor = {
    allSweets : List.List<Sweet>;
    reviews : List.List<SweetShopReview>;
  };

  type NewActor = {
    sweets : Map.Map<Text, Sweet>;
    reviews : List.List<SweetShopReview>;
    userProfiles : Map.Map<Principal, UserProfile>;
  };

  public func run(old : OldActor) : NewActor {
    let newSweets = Map.empty<Text, Sweet>();
    for (sweet in old.allSweets.values()) {
      newSweets.add(sweet.name, sweet);
    };
    {
      sweets = newSweets;
      reviews = old.reviews;
      userProfiles = Map.empty<Principal, UserProfile>();
    };
  };
};
