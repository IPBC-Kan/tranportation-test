// import_holidays_from_json.ts
// Script to import holidays from hagi_israel.json into the 'holiday' collection, ensuring date is stored as Date

import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://localhost:27017/transportation';
const HOLIDAY_JSON_PATH = path.join(__dirname, 'src', 'helperFiles', 'hagi_israel.json');

// Define a simple Holiday schema
const holidaySchema = new mongoose.Schema({
  name: String,
  date: Date,
  hebrew: String,
  isHoliday: Boolean,
  hebrewName: String,
  // ... add other fields as needed
}, { collection: 'holiday' });

const Holiday = mongoose.model('Holiday', holidaySchema);

async function importHolidays() {
  await mongoose.connect(MONGO_URI);
  const raw = fs.readFileSync(HOLIDAY_JSON_PATH, 'utf-8');
  const holidays = JSON.parse(raw);

  // Map date string to Date object
  const docs = holidays.map((h: any) => ({
    ...h,
    date: new Date(h.date),
    hebrewName: h.hebrewName // ensure this field is explicitly included
  }));

  // Remove existing holidays to avoid duplicates
  await Holiday.deleteMany({});
  const result = await Holiday.insertMany(docs);
  console.log(`Imported ${result.length} holidays.`);
  await mongoose.disconnect();
}

importHolidays().catch(err => {
  console.error('Error importing holidays:', err);
  process.exit(1);
});
