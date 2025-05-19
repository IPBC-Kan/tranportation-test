import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

// let client: MongoClient;

// export const connectToDatabase = async () => {
// 	if (!client) {
// 		// client = new MongoClient(process.env.MONGODB_URI || '');
// 		client = new MongoClient(process.env.DATABASE_URL || '');
// 	}

// 	try {
// 		await client.connect();
// 		console.log('Connected to MongoDB');
// 	} catch (error) {
// 		console.error('Failed to connect to MongoDB', error);
// 		process.exit(1);
// 	}

// 	// return client.db('FormsManager');
// };

// export const db = async () => {
// 	return await connectToDatabase();
// };

export const connectDB = async (retries = 5) => {
	while (retries) {
		try {
			console.log('Attempting to connect to MongoDB...');
			const conn = await mongoose.connect(process.env.DATABASE_URL || '', {
				serverSelectionTimeoutMS: 10000, // Retry after 10 seconds if server not found
				connectTimeoutMS: 10000, // Time out after 10 seconds of trying to connect
			});

			console.log(`MongoDB Connected: ${conn.connection.host}`);
			break; // If connection succeeds, exit loop
		} catch (error: any) {
			console.error('Failed to connect to MongoDB:', error.message);
			retries -= 1;

			if (retries === 0) {
				console.error('All connection attempts failed. Please check the database connection.');
				process.exit(1); // Exit if no retries left
			}

			console.log(`Retries left: ${retries}. Retrying in 5 seconds...`);
			await new Promise((res) => setTimeout(res, 5000)); // Wait before retrying
		}
	}
};
///////////////////////////------------------------------------------------------------------//////////////////////////////////
// export const connectDB = async () => {
// 	try {
// 		console.log(process.env.DATABASE_URL || '');
// 		const conn = await mongoose.connect(process.env.DATABASE_URL || '');
//
// 		console.log(`MongoDb Connected : ${conn.connection.host}`);
// 	} catch (error) {
// 		console.log(error);
// 		process.exit(1);
// 	}
// };
