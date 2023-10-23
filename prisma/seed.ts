import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seed() {
  try {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash("pass", salt);
    const users = [
      { email: 'user1@example.com', firstName: 'Oat', lastName: 'Pitchy', studentId: '1230', hash: hash},
      { email: 'user2@example.com', firstName: 'Dune', lastName: 'PW', studentId: '1231', hash: hash},
      { email: 'user3@example.com', firstName: 'Mearz', lastName: 'Wong', studentId: '1232', hash: hash},
      { email: 'user4@example.com', firstName: 'Guy', lastName: 'Krittin', studentId: '1233', hash: hash},
      { email: 'user5@example.com', firstName: 'Win', lastName: 'TS', studentId: '1234', hash: hash},
      { email: 'user6@example.com', firstName: 'Bet', lastName: 'Eliz', studentId: '1235', hash: hash},
      { email: 'user7@example.com', firstName: 'Bankie', lastName: 'Seth', studentId: '1236', hash: hash},
      { email: 'user8@example.com', firstName: 'Chit', lastName: 'Wasin', studentId: '1237', hash: hash},
      { email: 'user9@example.com', firstName: 'Krit', lastName: 'Tung', studentId: '1238', hash: hash},
      { email: 'user10@example.com', firstName: 'Men', lastName: 'RushAoosh', studentId: '1239', hash: hash},
      { email: 'user11@example.com', firstName: 'Kao', lastName: 'Skywalkert', studentId: '1240', hash: hash},
      { email: 'user12@example.com', firstName: 'Pung', lastName: 'Tassanai55555', studentId: '1241', hash: hash},
      { email: 'user13@example.com', firstName: 'Jedi', lastName: 'Daikyo', studentId: '1242', hash: hash},
    ];

    const products = [
      { productName: 'Relx', description: '100 pcs, Mint', startPrice: 200, available: false, studentId: '1231', address: 'ise', expiryLength: 1000 },
      { productName: 'Gened Slot', description: 'Hist sci', startPrice: 400, available: true, studentId: '1237', address: 'inda', expiryLength: 600 },
      { productName: 'Canteen Table', description: 'At i-Canteen', startPrice: 1600, available: true, studentId: '1231', address: 'ise', expiryLength: 1000 },
      { productName: 'Parking Slot', description: '3A Aksorn Building', startPrice: 1200, available: true, studentId: '1231', address: 'Aksorn', expiryLength: 500 },
      { productName: 'dfgdg', description: 'asdasdasd', startPrice: 300, available: true, studentId: '1231', address: 'bba', expiryLength: 900 },
      { productName: 'Product 1', description: 'Description 1', startPrice: 560, available: true, studentId: '1232', address: 'eba', expiryLength: 700 },
      { productName: 'Product 2', description: 'Description 2', startPrice: 9000, available: false, studentId: '1232', address: 'bba', expiryLength: 2000, buyerId: '1236' },
      { productName: 'Product 3', description: 'Description 3', startPrice: 700, available: true, studentId: '1231', address: 'ise', expiryLength: 6000 },
      { productName: 'Product 4', description: 'Description 4', startPrice: 5000, available: false, studentId: '1235', address: 'inda', expiryLength: 10000 },
      { productName: 'Product 5', description: 'Description 5', startPrice: 2500, available: true, studentId: '1234', address: 'balac', expiryLength: 1400 },
      { productName: 'Product 6', description: 'Description 6', startPrice: 1000, available: false, studentId: '1237', address: 'bascii', expiryLength: 1000, buyerId: '1234' },
      { productName: 'Product 7', description: 'Description 7', startPrice: 1500, available: true, studentId: '1239', address: 'ise', expiryLength: 1200 },
      { productName: 'Product 8', description: 'Description 8', startPrice: 6450, available: true, studentId: '1241', address: 'bba', expiryLength: 2300 },
      { productName: 'Product 9', description: 'Description 9', startPrice: 2340, available: false, studentId: '1234', address: 'bba', expiryLength: 5400, buyerId: '1234' },
      { productName: 'Product 10', description: 'Description 10', startPrice: 1230, available: true, studentId: '1238', address: 'balac', expiryLength: 700 },
      { productName: 'Product 11', description: 'Description 11', startPrice: 10000, available: false, studentId: '1235', address: 'eba', expiryLength: 5000 },
      { productName: 'Product 12', description: 'Description 12', startPrice: 500, available: true, studentId: '1232', address: 'bascii', expiryLength: 2100 },
      { productName: 'Product 13', description: 'Description 13', startPrice: 300, available: true, studentId: '1237', address: 'inda', expiryLength: 9000 },
      { productName: 'Product 14', description: 'Description 14', startPrice: 150, available: true, studentId: '1237', address: 'bba', expiryLength: 1000 },
      { productName: 'Product 15', description: 'Description 15', startPrice: 200, available: false, studentId: '1238', address: 'ise', expiryLength: 1500, buyerId: '1237' },
    ];

    const reviews = [
        { productId: 7, reviewerId: '1236', star: 4, reviewDescription: 'Very Good!' },
        { productId: 11, reviewerId: '1234', star: 1, reviewDescription: 'Awful!'},
        { productId: 14, reviewerId: '1234', star: 5, reviewDescription: 'Excellent!'},
        { productId: 20, reviewerId: '1237', star: 3, reviewDescription: 'Decent'}
    ]

    for (const userData of users) {
      await prisma.user.create({
        data: userData,
      });
    }

    for (const productData of products) {
      await prisma.product.create({
        data: productData,
      });
    }

    for (const reviewData of reviews) {
      await prisma.review.create({
        data: reviewData,
      });
    }

    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();