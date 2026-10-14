export const realmCategories = [
  { id: "summer", label: "Summer" },
  { id: "autumn", label: "Autumn" },
  { id: "winter", label: "Winter" },
  { id: "forest", label: "Forest" },
  { id: "mountains", label: "Mountains" },
  { id: "desert", label: "Desert" },
  { id: "clouds", label: "Clouds" },
  { id: "wasteland", label: "Wasteland" },
] as const;

export type RealmCategoryId = (typeof realmCategories)[number]["id"];

export interface Realm {
  id: string;
  name: string;
  category: RealmCategoryId;
  layerCount: number;
}

export const realms: Realm[] = [
  { id: "autumn-1", name: "Autumn Grove I", category: "autumn", layerCount: 5 },
  { id: "autumn-2", name: "Autumn Grove II", category: "autumn", layerCount: 6 },
  { id: "autumn-3", name: "Autumn Grove III", category: "autumn", layerCount: 6 },
  { id: "autumn-4", name: "Autumn Grove IV", category: "autumn", layerCount: 6 },
  { id: "cloud-background-1", name: "Cloudscape I", category: "clouds", layerCount: 4 },
  { id: "cloud-background-2", name: "Cloudscape II", category: "clouds", layerCount: 5 },
  { id: "cloud-background-3", name: "Cloudscape III", category: "clouds", layerCount: 4 },
  { id: "cloud-background-4", name: "Cloudscape IV", category: "clouds", layerCount: 3 },
  { id: "desert-oasis-1", name: "Desert Oasis I", category: "desert", layerCount: 5 },
  { id: "desert-oasis-2", name: "Desert Oasis II", category: "desert", layerCount: 5 },
  { id: "desert-oasis-3", name: "Desert Oasis III", category: "desert", layerCount: 5 },
  { id: "desert-oasis-4", name: "Desert Oasis IV", category: "desert", layerCount: 5 },
  { id: "nature-3", name: "Desert Oasis V", category: "desert", layerCount: 5 },
  { id: "nature-8", name: "Desert Oasis VI", category: "desert", layerCount: 4 },
  { id: "forest-and-trees-1", name: "Forest I", category: "forest", layerCount: 4 },
  { id: "forest-and-trees-2", name: "Forest II", category: "forest", layerCount: 2 },
  { id: "forest-and-trees-3", name: "Forest III", category: "forest", layerCount: 7 },
  { id: "forest-and-trees-4", name: "Forest IV", category: "forest", layerCount: 6 },
  { id: "forest-and-trees-5", name: "Forest V", category: "forest", layerCount: 6 },
  { id: "forest-and-trees-6", name: "Forest VI", category: "forest", layerCount: 4 },
  { id: "forest-and-trees-7", name: "Forest VII", category: "forest", layerCount: 4 },
  { id: "forest-and-trees-8", name: "Forest VIII", category: "forest", layerCount: 4 },
  { id: "mountain-peak-1", name: "Mountain Peak I", category: "mountains", layerCount: 5 },
  { id: "mountain-peak-2", name: "Mountain Peak II", category: "mountains", layerCount: 4 },
  { id: "mountain-peak-3", name: "Mountain Peak III", category: "mountains", layerCount: 5 },
  { id: "mountain-peak-4", name: "Mountain Peak IV", category: "mountains", layerCount: 4 },
  { id: "nature-1", name: "Mountain Peak V", category: "mountains", layerCount: 3 },
  { id: "nature-11", name: "Mountain Peak VI", category: "mountains", layerCount: 4 },
  { id: "nature-2", name: "Summer I", category: "summer", layerCount: 4 },
  { id: "nature-4", name: "Summer II", category: "summer", layerCount: 7 },
  { id: "nature-5", name: "Summer III", category: "summer", layerCount: 4 },
  { id: "nature-7", name: "Summer IV", category: "summer", layerCount: 4 },
  { id: "nature-9", name: "Summer V", category: "summer", layerCount: 8 },
  { id: "nature-10", name: "Summer VI", category: "summer", layerCount: 4 },
  { id: "nature-12", name: "Summer VII", category: "summer", layerCount: 4 },
  { id: "nature-13", name: "Summer VIII", category: "summer", layerCount: 5 },
  { id: "nature-15", name: "Summer IX", category: "summer", layerCount: 2 },
  { id: "nature-16", name: "Summer X", category: "summer", layerCount: 1 },
  { id: "post-apocalypse-1", name: "Post-Apocalypse I", category: "wasteland", layerCount: 3 },
  { id: "post-apocalypse-2", name: "Post-Apocalypse II", category: "wasteland", layerCount: 4 },
  { id: "post-apocalypse-3", name: "Post-Apocalypse III", category: "wasteland", layerCount: 4 },
  { id: "post-apocalypse-4", name: "Post-Apocalypse IV", category: "wasteland", layerCount: 4 },
  { id: "winter-1", name: "Winter I", category: "winter", layerCount: 6 },
  { id: "winter-2", name: "Winter II", category: "winter", layerCount: 5 },
  { id: "winter-3", name: "Winter III", category: "winter", layerCount: 3 },
  { id: "winter-4", name: "Winter IV", category: "winter", layerCount: 3 },
  { id: "winter-5", name: "Winter V", category: "winter", layerCount: 10 },
  { id: "winter-6", name: "Winter VI", category: "winter", layerCount: 3 },
  { id: "winter-7", name: "Winter VII", category: "winter", layerCount: 3 },
  { id: "winter-8", name: "Winter VIII", category: "winter", layerCount: 3 },
  { id: "nature-14", name: "Winter IX", category: "winter", layerCount: 3 },
  { id: "nature-6", name: "Winter X", category: "winter", layerCount: 4 },
];
