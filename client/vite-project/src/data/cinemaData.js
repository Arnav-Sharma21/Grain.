import bladeRunnerImg from '../assets/blade_runner_bg.webp'
import spaceOdysseyImg from '../assets/cards/3.png'
import odysseyNolanImg from '../assets/cards/2.png'
import moonlightImg from '../assets/cards/1.webp'
import tokyoHighwayImg from '../assets/cards/tokyo_highway.webp'
import monolithVoidImg from '../assets/cards/monolith_void.webp'
import ctaBeamImg from '../assets/cards/cta_beam.webp'
import zurichGlassImg from '../assets/cards/zurich_glass.webp'
import desertTwilightImg from '../assets/cards/desert_twilight.webp'

// The Letterboxd hallmark: Four Favorite Films pinned to the cinephile's profile
export const FOUR_FAVORITES = [
  {
    id: 'fav-01',
    title: 'Blade Runner 2049',
    year: '2017',
    director: 'Denis Villeneuve',
    cinematographer: 'Roger Deakins',
    format: '2.39:1 • Arri Alexa 65',
    image: bladeRunnerImg,
    rating: 5,
    tag: 'NEO-NOIR',
    quote: 'All the best memories are hers. A peerless visual and philosophical monument.'
  },
  {
    id: 'fav-02',
    title: '2001: A Space Odyssey',
    year: '1968',
    director: 'Stanley Kubrick',
    cinematographer: 'Geoffrey Unsworth',
    format: '70mm Super Panavision',
    image: spaceOdysseyImg,
    rating: 5,
    tag: 'HARD SCI-FI',
    quote: 'The ultimate trip. Pure sensory architecture that altered cinematic language forever.'
  },
  {
    id: 'fav-03',
    title: 'The Odyssey',
    year: '2026',
    director: 'Christopher Nolan',
    cinematographer: 'Hoyte van Hoytema',
    format: '15/70mm IMAX',
    image: odysseyNolanImg,
    rating: 4.8,
    tag: 'EPIC MYTHOS',
    quote: 'Shot natively on 70mm photochemical stock. Nolan captures the terrifying expanse of mortality.'
  },
  {
    id: 'fav-04',
    title: 'Moonlight',
    year: '2016',
    director: 'Barry Jenkins',
    cinematographer: 'James Laxton',
    format: '2.39:1 • Arri Alexa',
    image: moonlightImg,
    rating: 5,
    tag: 'POETIC REALISM',
    quote: 'In moonlight black boys look blue. A heartbreaking symphony of light, touch, and silence.'
  }
]

// Lifetime Cinema Statistics
export const LIFETIME_STATS = {
  filmsLogged: 184,
  thisYear: 42,
  listsCurated: 7,
  reviewsWritten: 96,
  watchlistCount: 230,
  averageRating: '4.2',
  hoursWatched: '392h'
}

// Film Diary & Recent Logs
export const DIARY_LOGS = [
  {
    id: 'log-01',
    filmId: 'fav-01',
    title: 'Blade Runner 2049',
    year: '2017',
    director: 'Denis Villeneuve',
    dateLogged: '28 SEP 2026',
    rating: 5,
    isRewatch: true,
    isLiked: true,
    image: bladeRunnerImg,
    aspectRatio: '2.39:1',
    venue: 'Basel Stadtkino 70mm',
    review:
      'Saw the archival 70mm print at Stadtkino Basel. Roger Deakins’ use of tungsten and yellow sodium lights across the ruined Las Vegas landscape breathes with photochemical grain. The sound design shakes the sternum. Villeneuve’s greatest achievement.',
    likesCount: 142
  },
  {
    id: 'log-02',
    filmId: 'fav-03',
    title: 'The Odyssey',
    year: '2026',
    director: 'Christopher Nolan',
    dateLogged: '24 SEP 2026',
    rating: 5,
    isRewatch: false,
    isLiked: true,
    image: odysseyNolanImg,
    aspectRatio: '1.43:1 IMAX',
    venue: 'IMAX Zurich Grand Screen',
    review:
      'Hoyte van Hoytema’s IMAX cameras turn Homer’s ancient epic into an immersive sensory shockwave. The Aegean storms feel physical; you taste the sea salt and sulfur. The silence during the Sirens sequence is astonishing filmmaking.',
    likesCount: 218
  },
  {
    id: 'log-03',
    filmId: 'fav-02',
    title: '2001: A Space Odyssey',
    year: '1968',
    director: 'Stanley Kubrick',
    dateLogged: '17 SEP 2026',
    rating: 5,
    isRewatch: true,
    isLiked: true,
    image: spaceOdysseyImg,
    aspectRatio: '2.20:1 70mm',
    venue: 'Cinémathèque Suisse',
    review:
      'Every cut is a masterclass in temporal compression. Fifty-eight years later, the silence of deep space and HAL 9000’s polite indifference still feel more contemporary than 99% of modern releases.',
    likesCount: 94
  },
  {
    id: 'log-04',
    filmId: 'log-tokyo',
    title: 'Fallen Angels & Tokyo Nights',
    year: '1995',
    director: 'Wong Kar-wai',
    dateLogged: '11 SEP 2026',
    rating: 4.5,
    isRewatch: true,
    isLiked: true,
    image: tokyoHighwayImg,
    aspectRatio: '1.85:1',
    venue: 'Home Cinema • 4K Criterion',
    review:
      'Christopher Doyle’s ultra wide-angle 6.8mm lens captures urban loneliness in a way that remains peerless. Neon, distorted perspectives, cigarette smoke, and melancholic glances at noodle bars at 4 AM.',
    likesCount: 176
  },
  {
    id: 'log-05',
    filmId: 'fav-04',
    title: 'Moonlight',
    year: '2016',
    director: 'Barry Jenkins',
    dateLogged: '03 SEP 2026',
    rating: 5,
    isRewatch: true,
    isLiked: true,
    image: moonlightImg,
    aspectRatio: '2.39:1',
    venue: 'Plaza Cinema Lausanne',
    review:
      'Nicholas Britell’s chopped-and-screwed orchestral score paired with Jenkins’ tender close-ups is perfection. A film that understands masculinity not as a fortress, but as a wounded, quiet prayer.',
    likesCount: 87
  }
]

// Curated Lists
export const CURATED_LISTS = [
  {
    id: 'list-01',
    title: 'Atmospheric Dystopian Visions & Cyberpunk',
    itemCount: 18,
    likes: 428,
    covers: [bladeRunnerImg, tokyoHighwayImg, monolithVoidImg],
    description: 'Neon-drenched skylines, synthetic rain, and melancholic existentialism in 35mm and 70mm.',
    updatedAt: 'SEP 2026'
  },
  {
    id: 'list-02',
    title: 'Essential 70mm & Large Format Masterpieces',
    itemCount: 14,
    likes: 350,
    covers: [spaceOdysseyImg, odysseyNolanImg, desertTwilightImg],
    description: 'Films engineered specifically for massive photochemical silver screens and auditory scale.',
    updatedAt: 'AUG 2026'
  },
  {
    id: 'list-03',
    title: 'Wong Kar-wai: The Poetry of Urban Isolation',
    itemCount: 9,
    likes: 512,
    covers: [tokyoHighwayImg, zurichGlassImg, ctaBeamImg],
    description: 'Time, missed connections, saturated colors, and stepped printing techniques.',
    updatedAt: 'JUL 2026'
  },
  {
    id: 'list-04',
    title: 'Brutalist Architecture in World Cinema',
    itemCount: 16,
    likes: 290,
    covers: [monolithVoidImg, zurichGlassImg, desertTwilightImg],
    description: 'Concrete monoliths, geometric framing, and spatial psychological dread.',
    updatedAt: 'JUN 2026'
  }
]

// Cinephile Watchlist
export const WATCHLIST = [
  {
    id: 'wl-01',
    title: 'Stalker',
    year: '1979',
    director: 'Andrei Tarkovsky',
    runtime: '162 min',
    genre: 'Philosophical Sci-Fi',
    image: monolithVoidImg,
    addedDate: '26 SEP 2026'
  },
  {
    id: 'wl-02',
    title: 'Paris, Texas',
    year: '1984',
    director: 'Wim Wenders',
    runtime: '147 min',
    genre: 'Road Drama',
    image: desertTwilightImg,
    addedDate: '22 SEP 2026'
  },
  {
    id: 'wl-03',
    title: 'La Haine',
    year: '1995',
    director: 'Mathieu Kassovitz',
    runtime: '98 min',
    genre: 'B&W Crime Drama',
    image: zurichGlassImg,
    addedDate: '15 SEP 2026'
  },
  {
    id: 'wl-04',
    title: 'Solaris',
    year: '1972',
    director: 'Andrei Tarkovsky',
    runtime: '167 min',
    genre: 'Sci-Fi Meditation',
    image: ctaBeamImg,
    addedDate: '08 SEP 2026'
  }
]

export const STREAM_CATEGORIES = [
  'All',
  '70mm / Large Format',
  'Neo-Noir',
  'Sci-Fi',
  'New Releases (2026)',
  'Classics'
]

// The Master Cinema Stream for the Home page
export const CINEMA_STREAM_CARDS = [
  {
    id: 'stream-01',
    filmId: 'fav-01',
    title: 'Blade Runner 2049',
    headline: '2049.',
    year: '2017',
    director: 'Denis Villeneuve',
    cinematographer: 'Roger Deakins',
    format: '2.39:1 • Arri Alexa 65',
    category: 'Neo-Noir',
    image: bladeRunnerImg,
    loggedBy: 'arnavsharma',
    loggedByName: 'Arnav Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    likes: 428,
    isLiked: false,
    isBookmarked: true,
    critique: 'Roger Deakins’ use of tungsten and yellow sodium lights across the ruined Las Vegas landscape breathes with photochemical grain. The sound design shakes the sternum. Villeneuve’s greatest architectural achievement.',
    venue: 'Basel Stadtkino 70mm'
  },
  {
    id: 'stream-02',
    filmId: 'fav-02',
    title: '2001: A Space Odyssey',
    headline: 'ODYSSEY.',
    year: '1968',
    director: 'Stanley Kubrick',
    cinematographer: 'Geoffrey Unsworth',
    format: '70mm Super Panavision',
    category: 'Sci-Fi',
    image: spaceOdysseyImg,
    loggedBy: 'elenarostova',
    loggedByName: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    likes: 541,
    isLiked: true,
    isBookmarked: false,
    critique: 'Every cut is a masterclass in temporal compression. Fifty-eight years later, the silence of deep space and HAL 9000’s polite indifference still feel more contemporary than 99% of modern releases.',
    venue: 'Cinémathèque Suisse • 70mm'
  },
  {
    id: 'stream-03',
    filmId: 'fav-03',
    title: 'The Odyssey',
    headline: 'TROY.',
    year: '2026',
    director: 'Christopher Nolan',
    cinematographer: 'Hoyte van Hoytema',
    format: '15/70mm IMAX Photochemical',
    category: 'New Releases (2026)',
    image: odysseyNolanImg,
    loggedBy: 'kenzotange',
    loggedByName: 'Kenzo Tange',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    rating: 4.8,
    likes: 672,
    isLiked: false,
    isBookmarked: true,
    critique: 'Shot natively on 70mm IMAX. The Aegean storms feel physical; you taste the sea salt and sulfur. The silence during the Sirens sequence is astonishing filmmaking.',
    venue: 'IMAX Zurich Grand Screen'
  },
  {
    id: 'stream-04',
    filmId: 'fav-04',
    title: 'Moonlight',
    headline: 'MOONLIGHT.',
    year: '2016',
    director: 'Barry Jenkins',
    cinematographer: 'James Laxton',
    format: '2.39:1 • Arri Alexa',
    category: 'Classics',
    image: moonlightImg,
    loggedBy: 'chloedubois',
    loggedByName: 'Chloe Dubois',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    likes: 382,
    isLiked: true,
    isBookmarked: false,
    critique: 'In moonlight black boys look blue. A heartbreaking symphony of light, touch, and silence. Nicholas Britell’s chopped-and-screwed orchestral score is pure cinema.',
    venue: 'Plaza Cinema Lausanne'
  },
  {
    id: 'stream-05',
    filmId: 'fav-05',
    title: 'Fallen Angels',
    headline: 'NOCTURNE.',
    year: '1995',
    director: 'Wong Kar-wai',
    cinematographer: 'Christopher Doyle',
    format: '1.85:1 • 35mm',
    category: 'Classics',
    image: tokyoHighwayImg,
    loggedBy: 'magnuslind',
    loggedByName: 'Magnus Lind',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    rating: 4.5,
    likes: 319,
    isLiked: false,
    isBookmarked: false,
    critique: 'Christopher Doyle’s ultra wide-angle 6.8mm lens captures urban loneliness in a way that remains peerless. Neon, distorted perspectives, cigarette smoke, and melancholic glances at noodle bars at 4 AM.',
    venue: '4K Restored Print • Ciné-Club'
  },
  {
    id: 'stream-06',
    filmId: 'fav-06',
    title: 'Stalker',
    headline: 'THE ZONE.',
    year: '1979',
    director: 'Andrei Tarkovsky',
    cinematographer: 'Alexander Knyazhinsky',
    format: '1.37:1 • 35mm Sovcolor',
    category: '70mm / Large Format',
    image: monolithVoidImg,
    loggedBy: 'arnavsharma',
    loggedByName: 'Arnav Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    likes: 495,
    isLiked: false,
    isBookmarked: true,
    critique: 'The dripping water, the rusted tanks, the long tracking shots through the Zone. A profound spiritual journey wrapped in metaphysical sci-fi.',
    venue: 'Filmpodium Zurich'
  }
]
