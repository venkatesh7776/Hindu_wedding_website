/**
 * Single source of truth for every wedding detail shown on the site.
 *
 * Everything below is DUMMY content (names, venue, phone numbers and the
 * Unsplash photos in public/images/couple + gallery). Replace it with the couple's
 * real details, then set `isSample: false` (a reminder flag; nothing is shown on the page).
 *
 * Dates/times are written as local wall-clock time ("YYYY-MM-DDTHH:mm") in
 * `timeZone`; the site converts them correctly for every guest.
 */

export type Person = {
  name: string;
  /** Short line under the name, e.g. "Daughter of ..." — optional */
  parents?: string;
  intro?: string;
  /** Path under /public, e.g. "/images/couple/bride.jpg" */
  photo?: string;
};

export type Ceremony = {
  id: string;
  name: string;
  /** Optional regional/Sanskrit name shown as a small label */
  subtitle?: string;
  start: string;
  end?: string;
  venueName: string;
  venueAddress?: string;
  description?: string;
  dressCode?: string;
  /** Illustration motif used when no photo/generated image exists */
  motif: "haldi" | "mehendi" | "sangeet" | "vivah" | "reception";
  photo?: string;
};

export type GalleryImage = { src?: string; alt: string; shape?: "tall" | "wide" | "square" };

export type WeddingConfig = {
  isSample: boolean;
  invocation: string;
  timeZone: string;
  bride: Person;
  groom: Person;
  /** One or two sentences introducing the couple together */
  coupleIntro?: string;
  weddingStart: string;
  ceremonies: Ceremony[];
  venue: { name: string; address: string; mapQuery: string; photo?: string; notes: string[] };
  gallery: GalleryImage[];
  rsvp: { enabled: boolean; collectGuestCount: boolean; maxGuests: number; deadline?: string };
  closing: {
    message: string;
    families: string;
    blessing: string;
    contacts: { label: string; phone: string }[];
  };
  music: { src: string; title: string; credit: string };
  site: { url: string };
};

export const wedding: WeddingConfig = {
  isSample: true,

  invocation: "॥ श्री गणेशाय नमः ॥",
  timeZone: "Asia/Kolkata",

  bride: {
    name: "Ananya",
    parents: "Daughter of Smt. Lakshmi & Sri Raghavan Iyer",
    intro: "An architect who sketches temples on weekends, sings Carnatic kritis while she cooks, and never says no to filter coffee.",
    photo: "/images/couple/bride.webp",
  },

  groom: {
    name: "Arjun",
    parents: "Son of Smt. Padma & Sri Venkat Rao",
    intro: "A doctor with a quiet laugh and a loud cricket opinion, happiest on a long drive with old Ilaiyaraaja songs.",
    photo: "/images/couple/groom.webp",
  },

  coupleIntro:
    "Two families from Chennai and Hyderabad, one shared love of music, food and long conversations — and now, one beautiful beginning.",

  /** The main muhurtham; drives the countdown and the hero date. */
  weddingStart: "2027-02-20T10:30",

  ceremonies: [
    {
      id: "haldi",
      name: "Haldi",
      subtitle: "Mangala snanam",
      start: "2027-02-19T09:00",
      end: "2027-02-19T12:00",
      venueName: "Ananya's family home, Mylapore",
      description: "Turmeric, marigolds and laughter as the families bless the couple.",
      dressCode: "Shades of yellow",
      motif: "haldi",
    },
    {
      id: "mehendi",
      name: "Mehendi",
      start: "2027-02-19T16:00",
      end: "2027-02-19T19:00",
      venueName: "Sri Lakshmi Kalyana Mandapam — Garden Courtyard",
      description: "An afternoon of henna, music and the little joys before forever.",
      dressCode: "Greens and pastels",
      motif: "mehendi",
    },
    {
      id: "sangeet",
      name: "Sangeet",
      start: "2027-02-19T19:30",
      end: "2027-02-19T23:00",
      venueName: "Sri Lakshmi Kalyana Mandapam — Lawn",
      description: "An evening of song and dance with both families.",
      dressCode: "Festive evening wear",
      motif: "sangeet",
    },
    {
      id: "vivah",
      name: "Vivah",
      subtitle: "The wedding ceremony",
      start: "2027-02-20T10:30",
      end: "2027-02-20T13:30",
      venueName: "Sri Lakshmi Kalyana Mandapam — Main Hall",
      description: "The sacred vows before Agni, followed by lunch with family and friends.",
      dressCode: "Traditional attire",
      motif: "vivah",
    },
    {
      id: "reception",
      name: "Reception",
      start: "2027-02-20T19:00",
      end: "2027-02-20T22:30",
      venueName: "The Banyan Courtyard, Mylapore",
      description: "Dinner and celebration as we begin our new life together.",
      dressCode: "Formal",
      motif: "reception",
    },
  ],

  venue: {
    name: "Sri Lakshmi Kalyana Mandapam",
    /** Full address. Leave empty to hide the map until confirmed. */
    address: "12 Kutchery Road, Mylapore, Chennai, Tamil Nadu 600004",
    /** Optional precise destination, e.g. "12.9716,77.5946" or a Google Maps place query */
    mapQuery: "Kutchery Road, Mylapore, Chennai",
    notes: [
      "Valet parking at the main gate; additional parking on Luz Church Road.",
      "Shuttles run every 30 minutes from Hotel Savera from 8:30 am on the wedding day.",
      "Rooms for outstation guests are held at Hotel Savera — mention “Ananya & Arjun”.",
    ],
  },

  /** Shapes chosen so 8 tiles fill the grid exactly; any mix works. */
  gallery: [
    { src: "/images/gallery/01-sacred-fire.webp", alt: "Hands joined over the sacred fire", shape: "tall" },
    { src: "/images/gallery/04-seated.webp", alt: "The couple seated during the ceremony", shape: "wide" },
    { src: "/images/gallery/03-portrait.webp", alt: "The couple under a canopy of lights", shape: "tall" },
    { src: "/images/gallery/05-mehendi.webp", alt: "Mehendi-adorned hands", shape: "wide" },
    { src: "/images/gallery/02-floral-arch.webp", alt: "Celebrating under a floral arch", shape: "square" },
    { src: "/images/gallery/06-haldi.webp", alt: "Haldi morning", shape: "square" },
    { src: "/images/gallery/07-together.webp", alt: "The couple in traditional attire", shape: "square" },
    { src: "/images/gallery/08-bride.webp", alt: "Bridal portrait", shape: "square" },
  ],

  rsvp: {
    enabled: true,
    collectGuestCount: true,
    maxGuests: 6,
    deadline: "2027-01-31",
  },

  closing: {
    message:
      "With the blessings of our families, we look forward to celebrating this beautiful beginning with you.",
    families: "With love, the Iyer and Rao families",
    blessing: "माङ्गल्यं तन्तुनानेन मम जीवनहेतुना । कण्ठे बध्नामि सुभगे त्वं जीव शरदां शतम् ॥",
    contacts: [
      { label: "Bride's family", phone: "+91 98765 43210" },
      { label: "Groom's family", phone: "+91 98765 43211" },
    ],
  },

  music: {
    /** Path under /public to a licensed track, e.g. "/audio/shehnai.mp3". Empty hides the control. */
    src: "/audio/wedding-instrumental.mp3",
    title: "Wedding instrumental",
    /** Shown in the footer when set — CC BY tracks must credit the artist and licence */
    credit: "",
  },

  site: {
    /** Public URL once deployed — used for share links and social previews */
    url: "",
  },
};
