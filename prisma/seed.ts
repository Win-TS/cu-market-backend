import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seed() {
  try {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash("pass", salt);
    const users = [
      { email: 'user1@example.com', firstName: 'Oat', lastName: 'Pitchy', studentId: '1230', hash: hash, lightBulbs: 500 },
      { email: 'user2@example.com', firstName: 'Dune', lastName: 'PW', studentId: '1231', hash: hash, lightBulbs: 0 },
      { email: 'user3@example.com', firstName: 'Mearz', lastName: 'Wong', studentId: '1232', hash: hash, lightBulbs: 9000 },
      { email: 'user4@example.com', firstName: 'Guy', lastName: 'Krittin', studentId: '1233', hash: hash, lightBulbs: 3000 },
      { email: 'user5@example.com', firstName: 'Win', lastName: 'TS', studentId: '1234', hash: hash, lightBulbs: 15000 },
      { email: 'user6@example.com', firstName: 'Bet', lastName: 'Eliz', studentId: '1235', hash: hash, lightBulbs: 10000 },
      { email: 'user7@example.com', firstName: 'Bankie', lastName: 'Seth', studentId: '1236', hash: hash, lightBulbs: 0 },
      { email: 'user8@example.com', firstName: 'Chit', lastName: 'Wasin', studentId: '1237', hash: hash, lightBulbs: 1000 },
      { email: 'user9@example.com', firstName: 'Krit', lastName: 'Tung', studentId: '1238', hash: hash, lightBulbs: 2500 },
      { email: 'user10@example.com', firstName: 'Men', lastName: 'RushAoosh', studentId: '1239', hash: hash, lightBulbs: 5000 },
      { email: 'user11@example.com', firstName: 'Kao', lastName: 'Skywalkert', studentId: '1240', hash: hash, lightBulbs: 4000 },
      { email: 'user12@example.com', firstName: 'Pung', lastName: 'Tassanai55555', studentId: '1241', hash: hash, lightBulbs: 7500 },
      { email: 'user13@example.com', firstName: 'Jedi', lastName: 'Daikyo', studentId: '1242', hash: hash, lightBulbs: 20 },
    ];

    const now = new Date();
    const addHr = new Date(now.getTime() + 60 * 60 * 1000); 
    const imgEx = [
      {
        key: 'IMG_9262.jpeg',
        url: 'https://cu-black-market-s3.s3-ap-southeast-1.amazonaws.com/IMG_9262.jpeg',
      },
      {
        key: 'IMG_6278.jpeg',
        url: 'https://cu-black-market-s3.s3.amazonaws.com/IMG_6278.jpeg',
      },
    ];
    const imgEx1 = [
      {
        key: 'IMG_9262.jpeg',
        url: 'https://cu-black-market-s3.s3-ap-southeast-1.amazonaws.com/IMG_9262.jpeg',
      },
    ];
    const products = [
      { productName: 'Relx', description: 'Mint', quantity: 100, startPrice: 200, available: false, studentId: '1231', address: 'ise', expiryTime: addHr, image: imgEx1 },
      { productName: 'Gened Slot', description: 'Hist sci', quantity: 1, startPrice: 400, available: true, studentId: '1237', address: 'inda', expiryTime: addHr },
      { productName: 'Canteen Table', description: 'At i-Canteen', quantity: 2, startPrice: 1600, available: true, studentId: '1231', address: 'ise', expiryTime: addHr },
      { productName: 'Parking Slot', description: '3A Aksorn Building', quantity: 1, startPrice: 1200, available: true, studentId: '1231', address: 'Aksorn', expiryTime: now, image: imgEx1 },
      { productName: 'dfgdg', description: 'asdasdasd', startPrice: 300, quantity: 10, available: true, studentId: '1231', address: 'bba', expiryTime: addHr },
      { productName: 'Product 1', description: 'Description 1', startPrice: 560, quantity: 15, available: true, studentId: '1232', address: 'eba', expiryTime: addHr, image: imgEx },
      { productName: 'Product 2', description: 'Description 2', startPrice: 9000, quantity: 20, endPrice: 28000, available: false, studentId: '1232', address: 'bba', expiryTime: now, buyerId: '1236', image: imgEx },
      { productName: 'Product 3', description: 'Description 3', startPrice: 700, quantity:50, available: true, studentId: '1231', address: 'ise', expiryTime: addHr },
      { productName: 'Product 4', description: 'Description 4', startPrice: 5000, quantity: 100, available: false, studentId: '1235', address: 'inda', expiryTime: now, image: imgEx1 },
      { productName: 'Product 5', description: 'Description 5', startPrice: 2500, quantity: 10, available: true, studentId: '1234', address: 'balac', expiryTime: addHr },
      { productName: 'Product 6', description: 'Description 6', startPrice: 1000, quantity: 1000, endPrice: 5500, available: false, studentId: '1237', address: 'bascii', expiryTime: now, buyerId: '1238' },
      { productName: 'Product 7', description: 'Description 7', startPrice: 1500, quantity: 500, available: true, studentId: '1239', address: 'ise', expiryTime: addHr, image: imgEx },
      { productName: 'Product 8', description: 'Description 8', startPrice: 6450, quantity: 800, available: true, studentId: '1241', address: 'bba', expiryTime: addHr },
      { productName: 'Product 9', description: 'Description 9', startPrice: 2340, quantity: 30, endPrice: 15000, available: false, studentId: '1234', address: 'bba', expiryTime: now, buyerId: '1238' },
      { productName: 'Product 10', description: 'Description 10', startPrice: 1230, quantity: 25, available: true, studentId: '1238', address: 'balac', expiryTime: addHr },
      { productName: 'Product 11', description: 'Description 11', startPrice: 10000, quantity: 19, available: false, studentId: '1235', address: 'eba', expiryTime: now, image: imgEx1 },
      { productName: 'Product 12', description: 'Description 12', startPrice: 500, quantity: 56, available: true, studentId: '1232', address: 'bascii', expiryTime: addHr },
      { productName: 'Product 13', description: 'Description 13', startPrice: 300, quantity: 70, available: true, studentId: '1237', address: 'inda', expiryTime: addHr },
      { productName: 'Product 14', description: 'Description 14', startPrice: 150, quantity: 33, available: true, studentId: '1237', address: 'bba', expiryTime: addHr },
      { productName: 'Product 15', description: 'Description 15', startPrice: 200, quantity: 543, endPrice: 3000, available: false, studentId: '1238', address: 'ise', expiryTime: now, buyerId: '1237', image: imgEx },
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