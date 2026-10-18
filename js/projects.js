// =========================================
// Project data
// নতুন প্রজেক্ট যোগ করতে এই লিস্টে একটি অবজেক্ট যোগ করুন।
// `live` লিংক না থাকলে খালি স্ট্রিং ("") রাখুন — "Live Demo · Soon" (disabled) বাটন দেখাবে।
// `category` এর মান ফিল্টার বাটনের `data-filter` এর সাথে মিলতে হবে।
// =========================================
const PROJECTS = [
  {
    title: "Burj Al Arab — Hotel Booking",
    description:
      "একটি হোটেল রুম বুকিং অ্যাপ। ইউজার Google দিয়ে লগইন করে Single, Double বা Family রুম বুক করতে পারে।",
    features: [
      "Firebase দিয়ে Google Sign-In",
      "Private Route — লগইন ছাড়া বুকিং পেজে ঢোকা যায় না",
      "Dynamic route (/book/:bedType) দিয়ে রুম অনুযায়ী পেজ",
      "Context API দিয়ে লগইন করা ইউজারের তথ্য শেয়ার",
    ],
    tech: ["React", "React Router", "Material-UI", "Firebase Auth"],
    category: ["react", "firebase"],
    image: "images/projects/burj-al-arab.jpg",
    github: "https://github.com/armanhossain81155/burj-al-arab",
    live: "",
  },
  {
    title: "Online Grocery Shop",
    description:
      "একটি অনলাইন গ্রোসারি শপ, যেখানে লগইন করার পর ডেলিভারির জন্য লোকেশন ও সময় বেছে নেওয়া যায়।",
    features: [
      "Email/Password এবং Google দিয়ে Sign-Up ও Login",
      "পাসওয়ার্ড ও ইমেইল ভ্যালিডেশন (Regex)",
      "Pick-from / Pick-to লোকেশন ও তারিখ-সময় বাছাই",
      "Google Maps ইন্টিগ্রেশন",
    ],
    tech: ["React", "Bootstrap", "Firebase Auth", "Google Maps API"],
    category: ["react", "firebase"],
    image: "images/projects/grocery-shop.jpg",
    imageFit: "contain",
    github: "https://github.com/armanhossain81155/online-grocery-shop",
    live: "",
  },
  {
    title: "Firebase Authentication",
    description:
      "Firebase দিয়ে সম্পূর্ণ Authentication সিস্টেম — একাধিক উপায়ে সাইন-ইন, সাইন-আপ ও সাইন-আউট।",
    features: [
      "Google ও Facebook দিয়ে Sign-In",
      "Email/Password দিয়ে নতুন অ্যাকাউন্ট তৈরি",
      "সাইন-আপের সময় ইউজারের নাম আপডেট",
      "লগইনের পর ইউজারের নাম, ইমেইল ও ছবি দেখানো",
    ],
    tech: ["React Hooks", "Firebase Auth", "Form Validation"],
    category: ["react", "firebase"],
    image: "", // ছবি নেই — কার্ডে একটি আইকন দেখাবে
    icon: "lock",
    github: "https://github.com/armanhossain81155/firebase-auth",
    live: "",
  },
];
