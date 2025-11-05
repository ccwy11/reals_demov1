// // src/lib/db/seed.ts
// import { db } from './drizzle';
// import { events } from './schema';

// const seedEvents = async () => {
//   const eventNames = [
//     'Sunset Yoga', 'Surf Lesson', 'Cooking Class', 'City Tour', 'Wine Tasting',
//     'Hiking Adventure', 'Beach Party', 'Art Workshop', 'Diving Trip', 'Spa Day'
//   ];

//   const locations = [
//     'Bali, Indonesia', 'Maui, Hawaii', 'Tuscany, Italy', 'Barcelona, Spain', 'Napa Valley, CA',
//     'Swiss Alps', 'Miami Beach, FL', 'Paris, France', 'Great Barrier Reef', 'Santorini, Greece'
//   ];

//   const data = Array.from({ length: 50 }, (_, i) => {
//     const baseIndex = i % 10;
//     const futureDate = new Date();
//     futureDate.setDate(futureDate.getDate() + Math.floor(Math.random() * 90) + 1); // Random date in next 90 days

//     return {
//       id: `evt_${String(i + 1).padStart(3, '0')}`, // e.g., evt_001
//       title: `${eventNames[baseIndex]} #${i + 1}`,
//       // date: futureDate.toISOString().split('T')[0], // YYYY-MM-DD
//       location: locations[baseIndex],
//       price: Math.random() > 0.3 ? Number((Math.random() * 150 + 20).toFixed(2)) : null,
//       // match: Math.random() > 0.6, // boolean: true if matched (e.g., for pairing logic)
//       image: `https://picsum.photos/seed/event${i + 1}/600/400`,
//     };
//   });

//   await db.insert(events).values(data).onConflictDoNothing();
//   console.log('Seeded 50 events with id, title, date, location, price, match, and image');
// };

// seedEvents().catch(console.error);

// src/lib/db/seed.ts
import { db } from './drizzle';
import { events } from './schema';

const seedEvents = async () => {
  const eventNames = [
    'Sunset Yoga',
    'Surf Lesson',
    'Cooking Class',
    'City Tour',
    'Wine Tasting',
    'Hiking Adventure',
    'Beach Party',
    'Art Workshop',
    'Diving Trip',
    'Spa Day',
  ];

  const locations = [
    'Bali, Indonesia',
    'Maui, Hawaii',
    'Tuscany, Italy',
    'Barcelona, Spain',
    'Napa Valley, CA',
    'Swiss Alps',
    'Miami Beach, FL',
    'Paris, France',
    'Great Barrier Reef',
    'Santorini, Greece',
  ];

  const data = Array.from({ length: 50 }, (_, i) => {
    const baseIndex = i % 10;

    return {
      // id is SERIAL → let Postgres auto-generate it
      title: `${eventNames[baseIndex]} #${i + 1}`,
      location: locations[baseIndex],
      price:
        Math.random() > 0.3
          ? (Math.random() * 150 + 20).toFixed(2) // keep as string (text column)
          : null,
      description: `Enjoy a memorable ${eventNames[baseIndex].toLowerCase()} experience in ${locations[baseIndex]}.`,
      image: `https://picsum.photos/seed/event${i + 1}/600/400`,
      // isEvent defaults to true → optional
      // createdAt defaults to now → optional
    };
  });

  await db
    .insert(events)
    .values(data)
    .onConflictDoNothing(); // safe if you run the seed multiple times

  console.log('Seeded 50 events (id auto-generated, no date/match)');
};

seedEvents().catch(console.error);