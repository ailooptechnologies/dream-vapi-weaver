import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import AIAgent from '../models/AIAgent.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await AIAgent.deleteMany({});

    // Create demo user
    const demoUser = await User.create({
      name: 'Demo User',
      email: 'demo@example.com',
      password: await bcrypt.hash('demo123', 12),
      phone: '+1 (555) 123-4567',
      title: 'Product Manager',
      bio: 'Demo account for testing purposes',
    });

    // Create demo AI agents
    const demoAgents = [
      {
        name: 'Customer Support Agent',
        description: 'Handles customer inquiries and support requests',
        firstMessage: 'Hello! I\'m your customer support assistant. How can I help you today?',
        provider: 'openai',
        model: 'gpt-4',
        phone: '+1 (555) 987-6543',
        status: 'active',
        createdBy: demoUser._id
      },
      {
        name: 'Sales Agent',
        description: 'Handles sales inquiries and lead generation',
        firstMessage: 'Hi there! I\'m your sales representative. Would you like to learn about our products?',
        provider: 'anthropic',
        model: 'claude-2',
        phone: '+1 (555) 234-5678',
        status: 'active',
        createdBy: demoUser._id
      }
    ];

    await AIAgent.insertMany(demoAgents);

    console.log('Database seeded successfully');
    console.log('\nDemo Credentials:');
    console.log('Email: demo@example.com');
    console.log('Password: demo123\n');

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();