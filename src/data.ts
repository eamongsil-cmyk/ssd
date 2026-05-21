import { TimelineEvent, DispatchArticle, RetroProduct, ExhibitionSlide } from './types';

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '1956',
    title: 'THE SEED IS SOWN',
    koreanTitle: '대전역 천막에서 시작되다',
    description: 'Amidst the ruins of the Korean War, founder Im Kil-sun and his family escape from North Korea and receive two bags of relief flour at Daejeon Cathedral. With no other resources, they build an open-tent wood stove near Daejeon Station and begin baking humble steamed buns (찐빵). Under the sacred family motto: "All people must love and serve each other," they vow to donate at least one-third of daily buns to hungry children and orphans—a rule of sharing that has survived unbroken for seven decades.',
    fact: 'Initially, buns were sold for a few hwan each, but one-third of every batch went straight to refugees.',
    icon: 'storefront',
    badgeText: 'STREET TENT'
  },
  {
    year: '1970',
    title: 'THE BRICK & MORTAR OVEN',
    koreanTitle: '은행동 빵집의 위상',
    description: 'Moving to its permanent home in Eunhaeng-dong, Sungsimdang introduces a massive brick deck oven. It becomes a social and romantic hub for high school sweethearts and student protestors. Young rebels and local dreamers meet at the long tables to debate literature, shared values, and the aroma of hot pastries.',
    fact: 'Local students famously noted that you could buy a bun and read poetry libraries free for three hours.',
    icon: 'oven_gen',
    badgeText: 'THE MAIN SHOP'
  },
  {
    year: '1980',
    title: 'THE CRISPY BIG BANG: FRIED SOBORO',
    koreanTitle: '튀김소보로의 영광',
    description: 'Through tireless hands-on experimentation, Sungsimdang invents "Fried Soboro" (튀김소보로). By combining ordinary sweet red bean buns, crispy crunchy streusel (soboro), and the deep-fryer, they forge a brand new carbohydrate monster. It causes literal traffic jams as crowds line up along the street block, waiting for the bells that signify a hot batch is ready.',
    fact: 'This crispy icon is now registered with its own patent and has sold over 100 million units.',
    icon: 'local_fire_department',
    badgeText: 'WORLD CHAMPION'
  },
  {
    year: '1986',
    title: 'THE PANTARON CHIVES REVOLUTION',
    koreanTitle: '판타롱부추빵 탄생',
    description: 'Inspired by retro fashion and Korean local fields, the bakery launches "Pantaron Chive Bread". Introducing high-quality regional wild chives, crumbly toasted egg, and smoky ham inside a tender, pillow-soft dough envelope. A true, aromatic savior that tastes just like home.',
    fact: 'Nicknamed "Pantaron" as a playful salute to the iconic flared baggy pants worn in the eighties.',
    icon: 'eco',
    badgeText: '88 OLYMPIC SPIRIT'
  },
  {
    year: '2011',
    title: 'THE MICHELIN & THE HOLY ALTAR',
    koreanTitle: '미쉐린 가이드 최초 등재',
    description: 'Sungsimdang becomes the very first non-franchise bakery in South Korea to be featured in the Michelin Green Guide. Later, when Pope Francis visits Korea, Sungsimdang is selected as the exclusive bread crafter for the papal meals, baking rustic, unsalted European sourdoughs fitting for the holy father.',
    fact: 'Pope Francis loved the local Korean style sourdoughs and personally thanked the baking crew with blessings.',
    icon: 'star',
    badgeText: 'MICHELIN MONUMENT'
  },
  {
    year: '2026',
    title: '70 YEARS OF FLOUR AND SWEAT',
    koreanTitle: '70주년: 타협 불가한 장인 정신',
    description: 'Now celebrating 70 glorious years! Standing firmly as the last major independent local bakery that refuses to open stores outside Daejeon. Every solitary loaf continues to represent local heritage, community shelter, and the supreme culinary art of high-speed dough kneading.',
    fact: 'Every single remaining item at closing time is still donated to local shelters every single night.',
    icon: 'workspace_premium',
    badgeText: 'LEGACY LIVE'
  }
];

export const DISPATCH_ARTICLES: DispatchArticle[] = [
  {
    id: 'secret-ingredient',
    title: 'THE SECRET INGREDIENT REVEALED',
    koreanTitle: '70년 나눔 비밀 레시피 공개',
    category: 'CRITICAL DISCOVERY',
    date: '1956-2026',
    excerpt: 'Is it the water? Is it the yeast? Scholars debate the magical longevity of Eunhaeng-dong\'s golden pastry textures.',
    content: `For decades, rival bakeries have tried to reverse-engineer Sungsimdang\'s signature dough. They analyzed the protein percentages, the hydration ratios, and the deck oven steam timings. \n\nBut the master baker laughed. "The secret ingredient is not in the mixing bowl. It is our vow made in 1956," he confessed. \n\n"We don\'t just bake bread. We forge it with fire and sweat, and we share one-third of everything with those who have nothing. The dough rises because the community lifts it up. That is the kinetic magic."\n\nWhen you bite into a hot Fried Soboro, you are tasting 70 years of unbroken community solidarity, made strictly on Daejeon soil.`,
    tags: ['SOBORO', 'NA_NUM', '1956_LEGACY', 'DOUGH_KINETICS']
  },
  {
    id: 'oven-maintenance',
    title: 'OVEN MAINTENANCE: A BRUTAL TRUTH',
    koreanTitle: '오븐 속의 뜨거운 전투',
    category: 'OVEN LOGS',
    date: 'MAY 21, 2026',
    excerpt: 'Inside the high-pressure baking vaults of Daejeon. The heat stays constant at 210°C, and so does the spirit.',
    content: `To bake over 10,000 loaves of Fried Soboro daily requires steel-tempered discipline. The deck ovens of the main building are calibrated to a punishing 210 degrees Celsius (410°F).\n\n"If the oven drops even three degrees, the streusel crust absorbs excess oil and loses its legendary explosive crunch," explains Chief Machinist Park. \n\nOven crew members undergo six months of pure temperature endurance. Every opening and closing of the steel doors is timed to the microsecond. "There is no automated timer that beats the human intuition. We listen to the crackling of the bubbling oil. It sings like a locomotive. When the sound peaks, we pull. That is our brutal truth."`,
    tags: ['HEAVY_METAL', 'STEAM_INJECTION', 'CRISP_LOGISTICS', 'NON_STOP']
  },
  {
    id: 'master-baker',
    title: 'INTERVIEW WITH THE MASTER BAKER',
    koreanTitle: '수석 제빵장과의 폭렬 인터뷰',
    category: 'EXCLUSIVE CHAT',
    date: 'MAY 21, 2026',
    excerpt: 'On beating industrial hyper-chains and protecting the sacred dough of Daejeon.',
    content: `"They came with suitcases filled with money," the Master Baker scoffs, throwing a large slab of fresh butter onto the workbench. "National franchises, shopping mall conglomerates, real estate kings. They all begged us to open branches in Seoul, Busan, or Tokyo."\n\nHe stops to deliver a forceful punch into the rising dough. The thud echoes like a gunshot.\n\n"We said no. Why? Because the bread loses its soul if it travels too far from Daejeon. The humidity of the Gapcheon river, the morning fog of Mount Bomun—our yeasts are alive and registered as Daejeon citizens. If you want the real delight, you pack your bags, buy a train ticket, and step foot in our city. We forge here, and here only."`,
    tags: ['DAEJEON_ONLY', 'KNEAD_POWER', 'ANT_FRANCHISE', 'PURE_GRAIN']
  },
  {
    id: 'record-highs',
    title: 'ARCHIVE SALES REACH RECORD HIGHS',
    koreanTitle: '아카이브 판매 역사적 돌파',
    category: 'TELEMETRY REPORT',
    date: 'MAY 21, 2026',
    excerpt: 'A historical spike in bun density has been recorded. The town is fully saturated with crispy delight.',
    content: `We are tracking historic telemetry numbers from the retail terminals in Eunhaeng-dong. The 70th Anniversary vintage boxes are breaking every metric: \n\n- Fried Soboro average throughput: 114 buns per minute.\n- Pantaron Chive line-ups: extending 80 meters past Daejeon station doors.\n- Flour bags processed: 340 tons this month alone!\n\nEconomic analysts advise that the "Soboro Standard" is now the single most stable index in the region. Local residents say they don\'t need paper money; a fresh box of Sungsimdang works as global currency. We recommend hoarding boxes immediately for the upcoming winter.`,
    tags: ['BOOMING', 'SOBORO_INDEX', 'DAEJEON_METRICS', 'FLOUR_TURBO']
  }
];

export const RETRO_PRODUCTS: RetroProduct[] = [
  {
    id: 'fried-soboro',
    name: 'FRIED SOBORO',
    koreanName: '튀김소보로 (No. 1)',
    price: 1700,
    description: 'The unrivaled king since 1980. Crispy golden streusel covering sweet, smooth red bean filling. Double-bakes then flash-fried for the ultimate explosive mouthfeel. It is essentially bread, donut, and cookie fused into a high-energy culinary capsule.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1tl0sqTMDNUxWB_Y0Ts3ZA2hFvzkjZ_s6ettRmcJARWUM32EFY_rU86YpuasN3jfoB3M9KNLjk4DOWsfJ8mJD6cc9vwF2hFEzn7zkWgyGWc4FVu3QuexHPcEBdfI6mm7GxaHFqxdJaWjNGtEIX9MMz4E67MFMtVA50JupZ82bMxuWY4d_ZI5-ckUgHfjsv6IscFs3bu45OjRvFKpQJgEXq3RNqqrzU6pvKscktzDhWzfG964zfmSKgFrdZEAwpvEpXunb-LQspA', // default popart comic baker
    category: 'bread',
    badges: ['PATENTED', 'CRUNCHY', 'LEGEND']
  },
  {
    id: 'pantaron-chives',
    name: 'PANTARON CHIVES BREAD',
    koreanName: '판타롱부추빵 (Classic)',
    price: 2000,
    description: 'Stuffed with fresh regional chives, scrambled egg bits, and savory cured ham wrapped in a cloud-like steamed milk dough. Released in 1986, it triggers intense retro nostalgia with a fresh, aromatic flavor that tastes like Grandma\'s kitchen.',
    image: '',
    category: 'bread',
    badges: ['VINTAGE', 'FRESH', 'RETRO_80S']
  },
  {
    id: 'bomunsan-echo',
    name: 'BOMUNSAN ECHO PASTRY',
    koreanName: '보문산메아리 (Giant Kouign)',
    price: 6000,
    description: 'A towering layered pastry dome representing Daejeon\'s Bomun mountain. Brushed with sweet rum and sugar glaze, featuring a buttery crumb structure that unpeels in infinite spiraling echoes. Perfect with simple black coffee.',
    image: '',
    category: 'bread',
    badges: ['GIANT', 'BUTTERY', 'SWEET_ECHO']
  },
  {
    id: 'anniversary-metal-badge',
    name: '70 YRS VINTAGE BADGE',
    koreanName: '70주년 칠보 금속 뱃지',
    price: 5500,
    description: 'Collectible high-gauge steel pin utilizing authentic CMYK cloisonné baking. Features a stylized retro baker character popping out of a comic book frame. Guaranteed to add instant street credit to your modern flour tote bag.',
    image: '',
    category: 'merch',
    badges: ['LIMITED', 'STEEL', 'CMYK_EDITION']
  },
  {
    id: 'canvas-flour-tote',
    name: '1956 CANVAS FLOUR TOTE',
    koreanName: '1956 밀가루 캔버스 백',
    price: 15000,
    description: 'Made from indestructible 16oz raw organic cotton warp, mirroring original 1950s flour sacks. Hand-stamped with genuine faded ink prints of our historic Daejeon station tent address. Features double-stitch handles that hold up to 20kg of bread.',
    image: '',
    category: 'merch',
    badges: ['HEAVY_DUTY', 'RAW_COTTON', '1956']
  },
  {
    id: 'classic-comic-baker-hat',
    name: 'COMIC BOOK BAKER CAP',
    koreanName: '코믹 브루탈 제빵사 모자',
    price: 12000,
    description: 'A 100% heavy canvas flat-style paper cap with our signature "POW!" starburst graphics printed on both sides. Lets you channel real 1950s oven fighter vibes while baking at home. Sized for universal skulls.',
    image: '',
    category: 'merch',
    badges: ['POW', 'VINTAGE_CUT', 'NON_SLIP']
  }
];

export const EXHIBITION_SLIDES: ExhibitionSlide[] = [
  {
    id: 'exhibit-knead',
    title: 'THE ART OF THE KNEAD',
    koreanTitle: '밀가루에 가하는 순수 타격',
    year: '1956 ~ PRESENT',
    description: 'Observe the violent kinetics of flour, yeast, and sweat. At Sungsimdang, gluten bonds are not coaxed gently—they are forged through speed-kneading and repetitive counter strikes. A master baker delivers over 200 high-velocity folds per minute to lock in structural carbon dioxide pockets.',
    funFact: 'Our speed-kneading method has been tested to burn 600 calories per hour, making bakers actual physical athletes.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1tl0sqTMDNUxWB_Y0Ts3ZA2hFvzkjZ_s6ettRmcJARWUM32EFY_rU86YpuasN3jfoB3M9KNLjk4DOWsfJ8mJD6cc9vwF2hFEzn7zkWgyGWc4FVu3QuexHPcEBdfI6mm7GxaHFqxdJaWjNGtEIX9MMz4E67MFMtVA50JupZ82bMxuWY4d_ZI5-ckUgHfjsv6IscFs3bu45OjRvFKpQJgEXq3RNqqrzU6pvKscktzDhWzfG964zfmSKgFrdZEAwpvEpXunb-LQspA',
    soundBubble: 'KNEAD! POW! WHOOSH!'
  },
  {
    id: 'exhibit-oven',
    title: 'THE THERMAL VACUUM',
    koreanTitle: '화씨 410도 속에서 완성되는 영광',
    year: '1970 ~ PRESENT',
    description: 'Every morning at 04:00, the high-pressure steam boilers roar to life. This dry-steam injection system ensures that when the raw dough meets the deck stone, the water molecules on the crust flash-evaporate instantly, forming a glass-like caramelized shield.',
    funFact: 'If steam duration is off by even 0.8 seconds, the outer layer becomes leathery instead of crumbly-crisp.',
    image: '',
    soundBubble: 'SZZZZ... POP!'
  },
  {
    id: 'exhibit-share',
    title: 'THE SHIELD OF THE SOUPS',
    koreanTitle: '매일 밤 계속되는 나눔의 빵',
    year: '1956 ~ UNBROKEN',
    description: 'In the late hours, after the main street falls silent, the bread remaining on the wooden racks does not go to clearance or the dumpster. It is loaded onto raw wooden crates and delivered directly to five regional orphanages and community centers. Sharing is built directly into our yeast formulas.',
    funFact: 'In 70 years, we have donated an estimated 14 million loaves of bread, enough to stretch across the entire peninsula.',
    image: '',
    soundBubble: 'SHARE! JOY!'
  }
];
