export type DemoSite = {
  slug: string;
  name: string;
  industry: string;
  summary: string;
  localPath: string;
  accent: string;
  gradient: string;
  sourceRepo: string;
};

export const DEMO_SITES: DemoSite[] = [
  {
    slug: "cutz-by-jojo",
    name: "Cutz by JoJo",
    industry: "Barber",
    summary: "A cinematic booking-led barber site with service cards, gallery movement, and a direct appointment flow.",
    localPath: "/demos/cutz-by-jojo/index.html",
    accent: "#C9A84C",
    gradient: "linear-gradient(135deg, #111111 0%, #25170c 52%, #6e4a1a 100%)",
    sourceRepo: "tame-gg/cutz-by-jojo",
  },
  {
    slug: "saffron",
    name: "Saffron",
    industry: "Restaurant",
    summary: "A warm restaurant preview with menu, gallery, and contact routes preserved as a static export.",
    localPath: "/demos/saffron/index.html",
    accent: "#E8A24A",
    gradient: "linear-gradient(135deg, #120c09 0%, #321205 50%, #87300d 100%)",
    sourceRepo: "tame-gg/saffron-preview",
  },
  {
    slug: "food-truck",
    name: "Street Plate CLT",
    industry: "Food Truck",
    summary: "A high-energy food truck site with moving menu sections, schedule details, and catering contact prompts.",
    localPath: "/demos/food-truck/index.html",
    accent: "#FFB347",
    gradient: "linear-gradient(135deg, #130b05 0%, #3d1e09 48%, #8d3b14 100%)",
    sourceRepo: "tame-gg/food-truck-demo",
  },
  {
    slug: "selfcare-salon",
    name: "Velvet Studio",
    industry: "Self-care Salon",
    summary: "A polished salon demo with services, gallery moments, and a booking-oriented conversion path.",
    localPath: "/demos/selfcare-salon/index.html",
    accent: "#F5A6C9",
    gradient: "linear-gradient(135deg, #150912 0%, #35162a 48%, #733052 100%)",
    sourceRepo: "tame-gg/selfcare-salon-demo",
  },
];
