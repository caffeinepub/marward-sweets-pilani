import Principal "mo:core/Principal";
import Text "mo:core/Text";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Migration "migration";

// Specify the data migration function in the with-clause
(with migration = Migration.run)
actor {
  // Types
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

  public type UserProfile = {
    name : Text;
  };

  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // State
  let sweets = Map.empty<Text, Sweet>();
  let reviews = List.empty<SweetShopReview>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Initial Data Population (run once, then should be replaced by persistent store for stable deployments)
  func initializeSweets() {
    let sweetArray = [
      {
        name = "Glucose Drop";
        description = "A classic sweet to suck on";
        price = 5;
        category = #glucose;
        image = "/glucose-drop.jpg";
      },
      {
        name = "Milky Way";
        description = "The galaxy bar.";
        price = 15;
        category = #chocolate;
        image = "/milky-way.jpg";
      },
      {
        name = "Werter's Echte";
        description = "Milk caramel drops with a Corey touch.";
        price = 20;
        category = #toffee;
        image = "/werters-echte.jpg";
      },
      {
        name = "KitKat";
        description = "Chocolate bars with crispy wafers.";
        price = 10;
        category = #chocolate;
        image = "/kitkat.jpg";
      },
      {
        name = "Iced Fruit Jelly";
        description = "Fruit jelly with a crunchy ice sugar coating.";
        price = 5;
        category = #candy;
        image = "/fruit-jelly-iced.jpg";
      },
      {
        name = "Ice Cream Cone";
        description = "Classic cone with chocolate, vanilla and sprinkles.";
        price = 30;
        category = #other;
        image = "/ice-cream-cone.jpg";
      },
      {
        name = "Strawberry Shortcake";
        description = "Delicate vanilla cake with fresh strawberries.";
        price = 40;
        category = #cake;
        image = "/strawberry-shortcake.jpg";
      },
      {
        name = "Double Chocolate Muffin";
        description = "Rich chocolate muffin with chocolate chips.";
        price = 25;
        category = #cake;
        image = "/double-chocolate-muffin.jpg";
      },
      {
        name = "Marshmallow Sticks";
        description = "Colorful marshmallow ropes for dipping.";
        price = 5;
        category = #candy;
        image = "/marshmallow-sticks.jpg";
      },
    ];

    for (sweet in sweetArray.values()) {
      sweets.add(sweet.name, sweet);
    };
  };

  // Initialize sweets on actor creation (for non-persistent deployments)
  initializeSweets();

  // User Profile Management Methods
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Public Methods
  public query ({ caller }) func getAllSweets() : async [Sweet] {
    sweets.values().toArray();
  };

  public shared ({ caller }) func submitReview(rating : Nat, reviewText : ?Text) : async () {
    if (rating < 1 or rating > 5) { return };
    reviews.add({
      rating;
      reviewText;
      author = caller;
    });
  };

  public query ({ caller }) func getAllReviews() : async [SweetShopReview] {
    reviews.toArray();
  };

  // Owner Catalog Management Methods
  public shared ({ caller }) func addSweet(sweet : Sweet) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only owners can add sweets");
    };
    sweets.add(sweet.name, sweet);
  };

  public shared ({ caller }) func updateSweetPrice(name : Text, newPrice : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only owners can update prices");
    };

    switch (sweets.get(name)) {
      case (null) { Runtime.trap("Sweet not found") };
      case (?sweet) {
        let updatedSweet = { sweet with price = newPrice };
        sweets.add(name, updatedSweet);
      };
    };
  };
};
