import {
  LocalAlert,
  LocalEvent,
  LocalNews,
  LocalTransportUpdate,
  LocalTrendingTopic,
  LocalWeather,
  LocationContext,
  NearbyPlace,
} from "../types";

export interface CityDataBundle {
  context: LocationContext;
  news: LocalNews[];
  events: LocalEvent[];
  alerts: LocalAlert[];
  places: NearbyPlace[];
  trending: LocalTrendingTopic[];
  transport: LocalTransportUpdate[];
  weather: LocalWeather;
}

export const availableDemoCities: LocationContext[] = [
  {
    city: "Bengaluru",
    area: "Central Business District",
    region: "Karnataka",
    country: "India",
    latitude: 12.9716,
    longitude: 77.5946,
    isDemo: true,
  },
  {
    city: "Delhi",
    area: "Connaught Place",
    region: "National Capital Region",
    country: "India",
    latitude: 28.6139,
    longitude: 77.209,
    isDemo: true,
  },
  {
    city: "Mumbai",
    area: "Bandra Kurla Complex",
    region: "Maharashtra",
    country: "India",
    latitude: 19.076,
    longitude: 72.8777,
    isDemo: true,
  },
  {
    city: "Hyderabad",
    area: "HITEC City",
    region: "Telangana",
    country: "India",
    latitude: 17.385,
    longitude: 78.4867,
    isDemo: true,
  },
  {
    city: "Pune",
    area: "Kalyani Nagar",
    region: "Maharashtra",
    country: "India",
    latitude: 18.5204,
    longitude: 73.8567,
    isDemo: true,
  },
];

export const cityDataMap: Record<string, CityDataBundle> = {
  Bengaluru: {
    context: availableDemoCities[0],
    weather: {
      location: "Bengaluru, Karnataka",
      temperature: "24°C",
      condition: "Partly Cloudy",
      highLow: "28° / 19°",
      humidity: "68%",
      wind: "14 km/h E",
      updatedTime: "15 min ago",
      isDemo: true,
    },
    alerts: [
      {
        id: "blr-alert-1",
        title: "Purple Line Metro Signaling Maintenance",
        type: "transport",
        severity: "advisory",
        message:
          "Routine frequency adjustments between Indiranagar and Baiyappanahalli from 22:30 tonight. Feeder shuttles operating at 8-min intervals.",
        issuedAt: "1 hr ago",
        validUntil: "Tomorrow 06:00",
        isDemo: true,
      },
      {
        id: "blr-alert-2",
        title: "Cauvery Water Supply Pipeline Inspection",
        type: "civic",
        severity: "info",
        message:
          "BWSSB scheduled pipe pressure calibration in Koramangala Sectors 3-6 between 14:00 and 17:00 tomorrow.",
        issuedAt: "3 hrs ago",
        isDemo: true,
      },
      {
        id: "blr-alert-3",
        title: "Evening Thunderstorm Watch",
        type: "weather",
        severity: "advisory",
        message:
          "Scattered convection showers likely across South and East Bengaluru suburbs. Motorists advised to expect water-logging at usual underpasses.",
        issuedAt: "4 hrs ago",
        validUntil: "Tonight 22:00",
        isDemo: true,
      },
    ],
    news: [
      {
        id: "blr-news-1",
        headline: "Suburban rail corridor civil works reach 70% milestone on Kanaka line",
        summary:
          "Engineers complete viaduct segment installation across Outer Ring Road, setting up test runs for late next quarter.",
        sourceId: "public-square",
        sourceName: "Public Square",
        timestamp: "32 min ago",
        image:
          "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=85",
        category: "India",
        locationRelevance: "Outer Ring Road corridor · 3.2 km",
        articleId: "cities-after-midnight",
        eventCount: 4,
        sourceCount: 6,
      },
      {
        id: "blr-news-2",
        headline: "Cubbon Park green canopy census reveals resilience across century-old banyans",
        summary:
          "Horticulture department's drone LiDAR mapping catalogues 6,800 heritage trees with microclimate temperature buffers of up to 3.5°C.",
        sourceId: "fieldnotes",
        sourceName: "Field Notes",
        timestamp: "1.5 hrs ago",
        image:
          "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=85",
        category: "Science",
        locationRelevance: "Cubbon Park & Central District · 1.8 km",
        articleId: "forest-thresholds",
        sourceCount: 4,
      },
      {
        id: "blr-news-3",
        headline: "Deep tech venture investments in AI silicon design cluster double year-on-year",
        summary:
          "Fabless microelectronics startups centered in Whitefield and Koramangala attract significant institutional seed tranches.",
        sourceId: "the-ledger",
        sourceName: "The Ledger",
        timestamp: "3 hrs ago",
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85",
        category: "Business",
        locationRelevance: "Koramangala & Whitefield Tech Cluster",
        articleId: "chips-without-factories",
        sourceCount: 5,
      },
      {
        id: "blr-news-4",
        headline: "City civic body launches decentralized wet-waste biomethanation units in 14 wards",
        summary:
          "Community-led pilot converts organic market runoff into compressed biogas for community kitchens and electric street sweeps.",
        sourceId: "northstar",
        sourceName: "Northstar Journal",
        timestamp: "5 hrs ago",
        image:
          "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=85",
        category: "World",
        locationRelevance: "Malleswaram & Jayanagar Wards",
        articleId: "cities-after-midnight",
        sourceCount: 3,
      },
    ],
    events: [
      {
        id: "blr-event-1",
        name: "Bangalore Open Hardware & Robotics Summit",
        date: "Saturday, Oct 3",
        time: "10:00 - 18:00 IST",
        approximateArea: "NIMHANS Convention Centre",
        category: "Technology",
        shortDescription:
          "Hands-on demos of RISC-V edge silicon, drone autonomy systems, and open manufacturing toolchains.",
        source: "Orbit Review",
        venue: "Main Hall, Hosur Road",
      },
      {
        id: "blr-event-2",
        name: "Heritage Lakefront Dusk Walk & Bird Census",
        date: "Sunday, Oct 4",
        time: "16:30 - 18:45 IST",
        approximateArea: "Sankey Tank",
        category: "Community",
        shortDescription:
          "Citizen science biodiversity walk guided by wetland ornithologists documenting migratory arrivals.",
        source: "Field Notes",
        venue: "Sankey Tank North Promenade",
      },
      {
        id: "blr-event-3",
        name: "Chowdiah Classical Music & Contemporary Fusion Recital",
        date: "Friday, Oct 2",
        time: "19:00 IST",
        approximateArea: "Malleswaram",
        category: "Cultural",
        shortDescription:
          "Carnatic violin ensembles paired with acoustic percussion explorations celebrating traditional compositions.",
        source: "Public Square",
        venue: "Chowdiah Memorial Hall",
      },
      {
        id: "blr-event-4",
        name: "Inter-District Youth Badminton Championship Quarterfinals",
        date: "Sunday, Oct 4",
        time: "09:00 - 17:00 IST",
        approximateArea: "Kanteerava Indoor Stadium",
        category: "Sports",
        shortDescription:
          "Top state seeded juniors contest knock-out rounds ahead of the national squad selections.",
        source: "Signal Sport",
        venue: "Kanteerava Complex",
      },
    ],
    transport: [
      {
        id: "blr-tr-1",
        roadOrArea: "Outer Ring Road (Silk Board to Marathahalli)",
        status: "Moderate congestion",
        description:
          "Elevated corridor traffic moving at 22 km/h. Traffic police active at Bellandur junction slip roads.",
        lastUpdated: "8 min ago",
        isDemo: true,
      },
      {
        id: "blr-tr-2",
        roadOrArea: "Namma Metro Purple & Green Lines",
        status: "Normal flow",
        description:
          "Full service operating on scheduled 4-min peak headways across both corridors.",
        lastUpdated: "12 min ago",
        isDemo: true,
      },
      {
        id: "blr-tr-3",
        roadOrArea: "Hebbal Flyover Inbound Airport Corridor",
        status: "Heavy traffic",
        description:
          "Slow movement approaching Esteem Mall merge due to lane divider resurfacing work.",
        lastUpdated: "15 min ago",
        isDemo: true,
      },
      {
        id: "blr-tr-4",
        roadOrArea: "MG Road & Residency Road",
        status: "Normal flow",
        description: "Smooth vehicular movement with clear automated pedestrian crossings.",
        lastUpdated: "20 min ago",
        isDemo: true,
      },
    ],
    places: [
      {
        id: "blr-place-1",
        name: "Victoria Hospital & BMCRI Trauma Care",
        category: "Hospitals",
        address: "Fort Road, KR Market",
        distance: "2.4 km",
        highlight: "Level-1 emergency triage with 24/7 cardiac ICU and burn care unit",
      },
      {
        id: "blr-place-2",
        name: "Indian Institute of Science (IISc)",
        category: "Universities",
        address: "CV Raman Road, Malleswaram",
        distance: "4.5 km",
        highlight: "Premier scientific research campus founded in 1909 with 400-acre lush grounds",
      },
      {
        id: "blr-place-3",
        name: "State Central Library (Sheshadri Iyer Memorial)",
        category: "Libraries",
        address: "Cubbon Park Central",
        distance: "1.2 km",
        highlight: "Red brick heritage landmark housing over 300,000 volumes including rare manuscripts",
      },
      {
        id: "blr-place-4",
        name: "Vidyarthi Bhavan & Heritage Tiffin Rooms",
        category: "Restaurants",
        address: "Gandhi Bazaar, Basavanagudi",
        distance: "3.8 km",
        highlight: "Iconic South Indian culinary institution serving legendary crispy masala dosas since 1943",
      },
      {
        id: "blr-place-5",
        name: "Bangalore One Citizen Service Centre",
        category: "Public services",
        address: "Town Hall Compound, JC Road",
        distance: "1.1 km",
        highlight: "Unified civic hub for utilities, certificates, transit passes, and property registration",
      },
      {
        id: "blr-place-6",
        name: "Sri Kanteerava Outdoor & Indoor Stadium",
        category: "Sports facilities",
        address: "Kasturba Road, Sampangi Rama Nagar",
        distance: "1.0 km",
        highlight: "Olympic standard synthetic athletic track, football pitch, and indoor basketball arenas",
      },
    ],
    trending: [
      {
        id: "blr-trend-1",
        topic: "Peripheral Ring Road Realignment",
        category: "Urbanism",
        articleCount: 18,
        sourceCount: 6,
        momentum: 84,
        shortDescription:
          "Public hearings open on eco-sensitive buffer zones and farmer rehabilitation packages.",
      },
      {
        id: "blr-trend-2",
        topic: "AI Silicon Startups in South Bengaluru",
        category: "Technology",
        articleCount: 14,
        sourceCount: 5,
        momentum: 76,
        shortDescription:
          "Hardware incubators in HSR Layout see steady influx of microarchitecture talent.",
      },
      {
        id: "blr-trend-3",
        topic: "Lake Rejuvenation Citizen Audits",
        category: "Civic",
        articleCount: 11,
        sourceCount: 4,
        momentum: 69,
        shortDescription:
          "Neighborhood lake trusts publish water quality scores for 28 urban water bodies.",
      },
      {
        id: "blr-trend-4",
        topic: "Heritage District Pedestrian Zones",
        category: "Culture",
        articleCount: 9,
        sourceCount: 3,
        momentum: 62,
        shortDescription:
          "Commercial avenue trial suggests car-free weekends boost local foot traffic by 40%.",
      },
    ],
  },

  Delhi: {
    context: availableDemoCities[1],
    weather: {
      location: "New Delhi, Delhi NCR",
      temperature: "29°C",
      condition: "Hazy Sunshine",
      highLow: "34° / 22°",
      humidity: "52%",
      wind: "9 km/h WNW",
      updatedTime: "25 min ago",
      isDemo: true,
    },
    alerts: [
      {
        id: "del-alert-1",
        title: "Air Quality Management Stage-1 Advisory",
        type: "weather",
        severity: "advisory",
        message:
          "Dust suppression sprinkling active along major arterial corridors. Construction sites instructed to adhere strictly to water misting mandates.",
        issuedAt: "2 hrs ago",
        isDemo: true,
      },
      {
        id: "del-alert-2",
        title: "Traffic Diversion around India Gate C-Hexagon",
        type: "transport",
        severity: "info",
        message:
          "Ceremonial rehearsal diversion in place between 19:30 and 21:00. Commuters advised to utilize Ring Road.",
        issuedAt: "3 hrs ago",
        isDemo: true,
      },
    ],
    news: [
      {
        id: "del-news-1",
        headline: "Yamuna floodplain ecological rejuvenation project restores 400 hectares of wetlands",
        summary:
          "Native riparian reed beds filter urban drainage as bio-diversity surveys note returning resident waterfowl species.",
        sourceId: "fieldnotes",
        sourceName: "Field Notes",
        timestamp: "45 min ago",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
        category: "Science",
        locationRelevance: "Yamuna Biodiversity Park corridor · 4.1 km",
        articleId: "ocean-currents",
        sourceCount: 6,
      },
      {
        id: "del-news-2",
        headline: "National Museum digital archives launch high-resolution interactive antiquities portal",
        summary:
          "Curators digitize over 80,000 Harappan and medieval bronze sculptures with 3D tactile scans for researchers.",
        sourceId: "public-square",
        sourceName: "Public Square",
        timestamp: "2 hrs ago",
        image:
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=85",
        category: "Technology",
        locationRelevance: "Janpath Cultural Corridor · 1.5 km",
        articleId: "chips-without-factories",
        sourceCount: 4,
      },
      {
        id: "del-news-3",
        headline: "Metro Phase IV Janakpuri to RK Ashram underground tunneling completes key interchange",
        summary:
          "Tunnel boring machines breakthrough under heavy urban infrastructure without disruption to heritage zones above.",
        sourceId: "northstar",
        sourceName: "Northstar Journal",
        timestamp: "4 hrs ago",
        image:
          "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=85",
        category: "India",
        locationRelevance: "Central & West Delhi Links",
        articleId: "cities-after-midnight",
        sourceCount: 5,
      },
    ],
    events: [
      {
        id: "del-event-1",
        name: "Delhi International Literature & Philosophy Colloquium",
        date: "Saturday, Oct 10",
        time: "11:00 - 19:00 IST",
        approximateArea: "India International Centre",
        category: "Cultural",
        shortDescription:
          "Panels on linguistic translation, contemporary historiography, and civic literature across Asia.",
        source: "Public Square",
        venue: "IIC Deshmukh Auditorium",
      },
      {
        id: "del-event-2",
        name: "National Capital Clean Energy & Grid Integration Forum",
        date: "Tuesday, Oct 6",
        time: "09:30 - 17:30 IST",
        approximateArea: "Pragati Maidan (Bharat Mandapam)",
        category: "Technology",
        shortDescription:
          "Industry leaders showcase utility-scale battery energy storage systems and smart metering solutions.",
        source: "The Ledger",
        venue: "Hall 4, Bharat Mandapam",
      },
    ],
    transport: [
      {
        id: "del-tr-1",
        roadOrArea: "Delhi Metro Network (Yellow & Violet Lines)",
        status: "Normal flow",
        description: "Standard 3-min peak interval service with full air-conditioned reliability.",
        lastUpdated: "10 min ago",
        isDemo: true,
      },
      {
        id: "del-tr-2",
        roadOrArea: "Barapullah Elevated Corridor",
        status: "Moderate congestion",
        description: "Average speed 35 km/h eastward towards Mayur Vihar.",
        lastUpdated: "18 min ago",
        isDemo: true,
      },
    ],
    places: [
      {
        id: "del-place-1",
        name: "All India Institute of Medical Sciences (AIIMS)",
        category: "Hospitals",
        address: "Ansari Nagar East, New Delhi",
        distance: "3.5 km",
        highlight: "Apex public medical research university and comprehensive tertiary referral center",
      },
      {
        id: "del-place-2",
        name: "Delhi University Central Campus",
        category: "Universities",
        address: "University Enclave, North Campus",
        distance: "6.2 km",
        highlight: "Centennial university housing premier faculties of arts, sciences, and law",
      },
      {
        id: "del-place-3",
        name: "National Archives of India",
        category: "Libraries",
        address: "Janpath, Near Rajpath",
        distance: "1.4 km",
        highlight: "Repository of official records of the Government of India spanning centuries",
      },
    ],
    trending: [
      {
        id: "del-trend-1",
        topic: "Winter Smog Mitigation Protocols",
        category: "Environment",
        articleCount: 22,
        sourceCount: 8,
        momentum: 91,
        shortDescription:
          "Authorities evaluate inter-state coordination on crop residue management and transport caps.",
      },
      {
        id: "del-trend-2",
        topic: "Old Delhi Heritage Walkway Upgrades",
        category: "Culture",
        articleCount: 12,
        sourceCount: 4,
        momentum: 68,
        shortDescription:
          "Chandni Chowk facade restorations expand toward Jama Masjid eastern precinct.",
      },
    ],
  },

  Mumbai: {
    context: availableDemoCities[2],
    weather: {
      location: "Mumbai, Maharashtra",
      temperature: "28°C",
      condition: "Tropical Breeze",
      highLow: "31° / 26°",
      humidity: "78%",
      wind: "18 km/h WSW",
      updatedTime: "10 min ago",
      isDemo: true,
    },
    alerts: [
      {
        id: "mum-alert-1",
        title: "High Tide Advisory for Western Coastal Promenades",
        type: "weather",
        severity: "info",
        message:
          "High tide of 4.12 meters expected at 15:45. Lifeguards stationed along Marine Drive, Juhu, and Bandra Bandstand.",
        issuedAt: "1 hr ago",
        isDemo: true,
      },
    ],
    news: [
      {
        id: "mum-news-1",
        headline: "Coastal Road southbound extension unlocks 30-minute transit between Nariman Point and Worli",
        summary:
          "Toll-free coastal expressway reports seamless vehicle flow alongside new public seaside gardens and cycling trails.",
        sourceId: "the-ledger",
        sourceName: "The Ledger",
        timestamp: "50 min ago",
        image:
          "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=85",
        category: "India",
        locationRelevance: "Worli Sea Face to Marine Drive · 2.5 km",
        articleId: "cities-after-midnight",
        sourceCount: 7,
      },
      {
        id: "mum-news-2",
        headline: "National Stock Exchange testing sub-microsecond matching engine in BKC campus",
        summary:
          "Next-gen electronic trading infrastructure designed for ultra-low latency derivatives clearing commences parallel stress runs.",
        sourceId: "the-ledger",
        sourceName: "The Ledger",
        timestamp: "2 hrs ago",
        image:
          "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=85",
        category: "Business",
        locationRelevance: "Bandra Kurla Complex Financial District",
        articleId: "chips-without-factories",
        sourceCount: 5,
      },
    ],
    events: [
      {
        id: "mum-event-1",
        name: "Mumbai International Architecture & Heritage Biennial",
        date: "Saturday, Oct 17",
        time: "10:30 - 20:00 IST",
        approximateArea: "Kala Ghoda Arts Precinct",
        category: "Cultural",
        shortDescription:
          "Exhibitions celebrating Victorian Gothic and Art Deco ensembles across South Mumbai.",
        source: "Northstar Journal",
        venue: "David Sassoon Library Courtyard",
      },
    ],
    transport: [
      {
        id: "mum-tr-1",
        roadOrArea: "Bandra-Worli Sea Link",
        status: "Normal flow",
        description: "Breezy conditions, traffic moving smoothly at posted 80 km/h limits.",
        lastUpdated: "5 min ago",
        isDemo: true,
      },
      {
        id: "mum-tr-2",
        roadOrArea: "Western Railway Suburban Line",
        status: "Normal flow",
        description: "Fast and slow locals operating on time between Churchgate and Borivali.",
        lastUpdated: "12 min ago",
        isDemo: true,
      },
    ],
    places: [
      {
        id: "mum-place-1",
        name: "Lilavati Hospital & Research Centre",
        category: "Hospitals",
        address: "A-791, Bandra Reclamation, Bandra West",
        distance: "1.9 km",
        highlight: "Multi-specialty center renowned for cardiovascular surgery and critical care",
      },
      {
        id: "mum-place-2",
        name: "Tata Institute of Fundamental Research (TIFR)",
        category: "Universities",
        address: "Homi Bhabha Road, Navy Nagar, Colaba",
        distance: "8.5 km",
        highlight: "National centre for advanced research in physics, mathematics, and molecular biology",
      },
    ],
    trending: [
      {
        id: "mum-trend-1",
        topic: "Underground Metro Line 3 Full Commissioning",
        category: "Transit",
        articleCount: 20,
        sourceCount: 7,
        momentum: 88,
        shortDescription:
          "Commercial passenger journeys begin along the Colaba-Bandra-SEEPZ spine.",
      },
    ],
  },

  Hyderabad: {
    context: availableDemoCities[3],
    weather: {
      location: "Hyderabad, Telangana",
      temperature: "27°C",
      condition: "Clear Sky",
      highLow: "32° / 21°",
      humidity: "58%",
      wind: "11 km/h NE",
      updatedTime: "18 min ago",
      isDemo: true,
    },
    alerts: [
      {
        id: "hyd-alert-1",
        title: "Durgam Cheruvu Cable Bridge Pedestrian Evening Hours",
        type: "public notice",
        severity: "info",
        message:
          "The iconic cable bridge is reserved for pedestrian strolls and illumination viewing between 21:00 and 23:00 on Fridays and Saturdays.",
        issuedAt: "2 hrs ago",
        isDemo: true,
      },
    ],
    news: [
      {
        id: "hyd-news-1",
        headline: "Genome Valley pharma cluster attracts three international biologics manufacturing plants",
        summary:
          "New facilities focus on mRNA vaccine stabilizers and monoclonal antibody fermentation suites with global export compliance.",
        sourceId: "the-ledger",
        sourceName: "The Ledger",
        timestamp: "1 hr ago",
        image:
          "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=85",
        category: "Science",
        locationRelevance: "Genome Valley & Shamirpet Corridor",
        articleId: "synthetic-biology-design",
        sourceCount: 6,
      },
    ],
    events: [
      {
        id: "hyd-event-1",
        name: "Telangana Deep Tech & Cloud Engineering Summit",
        date: "Thursday, Oct 8",
        time: "09:00 - 18:00 IST",
        approximateArea: "Hyderabad International Convention Centre",
        category: "Technology",
        shortDescription:
          "Keynotes on multi-region database replication, AI inference clusters, and cyber resilience.",
        source: "Orbit Review",
        venue: "HICC Novotel Campus",
      },
    ],
    transport: [
      {
        id: "hyd-tr-1",
        roadOrArea: "Outer Ring Road (Gachibowli to Airport)",
        status: "Normal flow",
        description: "Expressway traffic free flowing at 100 km/h with automated FASTag gantry clearance.",
        lastUpdated: "10 min ago",
        isDemo: true,
      },
    ],
    places: [
      {
        id: "hyd-place-1",
        name: "International Institute of Information Technology (IIIT-H)",
        category: "Universities",
        address: "Gachibowli, Hyderabad",
        distance: "3.2 km",
        highlight: "Foremost research centre in computer vision, language technologies, and robotics",
      },
    ],
    trending: [
      {
        id: "hyd-trend-1",
        topic: "Musi Riverfront Transformation",
        category: "Urbanism",
        articleCount: 15,
        sourceCount: 5,
        momentum: 79,
        shortDescription:
          "Comprehensive blueprint submitted for ecological restoration and continuous boardwalks.",
      },
    ],
  },

  Pune: {
    context: availableDemoCities[4],
    weather: {
      location: "Pune, Maharashtra",
      temperature: "23°C",
      condition: "Pleasant",
      highLow: "29° / 18°",
      humidity: "62%",
      wind: "12 km/h WNW",
      updatedTime: "20 min ago",
      isDemo: true,
    },
    alerts: [
      {
        id: "pune-alert-1",
        title: "University Road Flyover Construction Phasing",
        type: "transport",
        severity: "advisory",
        message:
          "Night lane restrictions between 23:00 and 05:00 at Pune University junction for integrated metro girder launch.",
        issuedAt: "4 hrs ago",
        isDemo: true,
      },
    ],
    news: [
      {
        id: "pune-news-1",
        headline: "Automotive innovation cluster launches shared EV powertrain testing facility in Chakan",
        summary:
          "Consortium of tier-1 component makers and engineering colleges offers open access battery thermal and dyno test benches.",
        sourceId: "the-ledger",
        sourceName: "The Ledger",
        timestamp: "1.2 hrs ago",
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85",
        category: "Technology",
        locationRelevance: "Chakan Industrial Zone · 18 km",
        articleId: "chips-without-factories",
        sourceCount: 4,
      },
    ],
    events: [
      {
        id: "pune-event-1",
        name: "Pune Heritage Walk: Shaniwar Wada to Vishrambaug Wada",
        date: "Sunday, Oct 4",
        time: "07:30 - 10:00 IST",
        approximateArea: "Old City Peths",
        category: "Cultural",
        shortDescription:
          "Guided architectural walk documenting Maratha wooden craftsmanship and traditional wada water systems.",
        source: "Public Square",
        venue: "Dilli Darwaja, Shaniwar Wada",
      },
    ],
    transport: [
      {
        id: "pune-tr-1",
        roadOrArea: "Pune-Mumbai Expressway (Ghat Section)",
        status: "Normal flow",
        description: "All lanes clear through Bhor Ghat tunnels with normal cargo vehicle discipline.",
        lastUpdated: "14 min ago",
        isDemo: true,
      },
    ],
    places: [
      {
        id: "pune-place-1",
        name: "Savitribai Phule Pune University (SPPU)",
        category: "Universities",
        address: "Ganeshkhind, Pune",
        distance: "3.8 km",
        highlight: "Known as the 'Oxford of the East', sprawling 411-acre campus established in 1949",
      },
    ],
    trending: [
      {
        id: "pune-trend-1",
        topic: "Mula-Mutha River Rejuvenation",
        category: "Environment",
        articleCount: 11,
        sourceCount: 4,
        momentum: 72,
        shortDescription:
          "Ecological embankment works commence along the Sangamwadi stretch.",
      },
    ],
  },
};
