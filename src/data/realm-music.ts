import type { RealmCategoryId } from "./realms";

export interface RealmMusicTrack {
  categoryId: RealmCategoryId;
  trackNumber: number;
  title: string;
  game: "GS" | "TLA";
  fileName: string;
  youtubeUrl: string;
  badgeLabel: string;
}

export const realmMusicTracks: Record<RealmCategoryId, RealmMusicTrack> = {
  summer: {
    categoryId: "summer",
    trackNumber: 69,
    title: "Village Theme",
    game: "GS",
    fileName: "69 - Village Theme (GS).mp3",
    youtubeUrl: "https://www.youtube.com/watch?v=adXJBtU-ONc&list=PLCD5E70634946E090&index=3",
    badgeLabel: "#69 (GS)",
  },
  autumn: {
    categoryId: "autumn",
    trackNumber: 16,
    title: "Madra",
    game: "TLA",
    fileName: "16 - Madra (TLA).mp3",
    youtubeUrl: "https://www.youtube.com/watch?v=vEOoUi7JDMU&list=PLCD5E70634946E090&index=38",
    badgeLabel: "#16 (TLA)",
  },
  winter: {
    categoryId: "winter",
    trackNumber: 85,
    title: "Remote Village",
    game: "GS",
    fileName: "85 - Remote Village (GS).mp3",
    youtubeUrl: "https://www.youtube.com/watch?v=61Y9pG7GHK4&list=PLS7i3rQm5wBK66MZUG6BZO4jFycI9kgR9&index=15",
    badgeLabel: "#85 (GS)",
  },
  forest: {
    categoryId: "forest",
    trackNumber: 2,
    title: "Setting Off",
    game: "GS",
    fileName: "02 - Setting Off (GS).mp3",
    youtubeUrl: "https://www.youtube.com/watch?v=Bcg3v245kgM",
    badgeLabel: "#2 (GS)",
  },
  mountains: {
    categoryId: "mountains",
    trackNumber: 37,
    title: "Shaman Village",
    game: "TLA",
    fileName: "37 - Shaman Village (TLA).mp3",
    youtubeUrl: "https://www.youtube.com/watch?v=ydyAdo-tV_Y&list=PLCD5E70634946E090&index=67",
    badgeLabel: "#37 (TLA)",
  },
  desert: {
    categoryId: "desert",
    trackNumber: 12,
    title: "Kandorean Temple Caves",
    game: "TLA",
    fileName: "12 - Kandorean Temple Caves (TLA).mp3",
    youtubeUrl: "https://www.youtube.com/watch?v=8RwIReblp60&list=PLCD5E70634946E090&index=35",
    badgeLabel: "#12 (TLA)",
  },
  clouds: {
    categoryId: "clouds",
    trackNumber: 57,
    title: "Wind Adepts",
    game: "GS",
    fileName: "57 - Wind Adepts (GS).mp3",
    youtubeUrl: "https://www.youtube.com/watch?v=95WRp-VewkE&list=PLCD5E70634946E090&index=16",
    badgeLabel: "#57 (GS)",
  },
  wasteland: {
    categoryId: "wasteland",
    trackNumber: 15,
    title: "Lemuria",
    game: "TLA",
    fileName: "15 - Lemuria (TLA).mp3",
    youtubeUrl: "https://www.youtube.com/watch?v=kfr61smQMfQ&list=PLCD5E70634946E090&index=65",
    badgeLabel: "#15 (TLA)",
  },
};
