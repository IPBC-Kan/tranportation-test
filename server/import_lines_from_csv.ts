// Script to transform and import CSV data into the MongoDB 'lines' collection
// Usage: Run with `ts-node` or `node` after compiling if needed
import fs from 'fs';
import path from 'path';
import { parse as csvParse } from 'csv-parse/sync';
import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://localhost:27017/transportation';

// Hebrew to English mapping
const directionMap: Record<string, 'pickup' | 'dropoff'> = {
    איסוף: 'pickup',
    פיזור: 'dropoff',
};
const weekdayMap: Record<string, string> = {
    ראשון: 'Sunday',
    שני: 'Monday',
    שלישי: 'Tuesday',
    רביעי: 'Wednesday',
    חמישי: 'Thursday',
    שישי: 'Friday',
    שבת: 'Saturday',
};
const statusMap: Record<string, 'new' | 'deployed' | 'cancelled'> = {
    חדש: 'new',
    בפריסה: 'deployed',
    בוטל: 'cancelled',
};

function parseBool(val: string) {
    return val.trim() === 'נכון';
}

// Read CSVs
function readCsv(file: string) {
    const content = fs.readFileSync(file, 'utf8');
    // Remove ListSchema line if present
    const lines = content.split(/\r?\n/).filter((l) => !l.trim().startsWith('ListSchema'));
    return csvParse(lines.join('\n'), { columns: true, skip_empty_lines: true });
}

async function main() {
    // File paths
    // Try both possible base paths for dev/production
    let base = path.join(__dirname, 'src', 'helperFiles', 'data_csv');
    if (!fs.existsSync(base)) {
        base = path.join(__dirname, 'helperFiles', 'data_csv');
    }
    if (!fs.existsSync(path.join(base, 'קווים.csv'))) {
        base = path.resolve('src', 'helperFiles', 'data_csv');
    }
    if (!fs.existsSync(path.join(base, 'קווים.csv'))) {
        base = path.resolve('helperFiles', 'data_csv');
    }
    console.log('Using CSV base path:', base);
    const linesCsv = readCsv(path.join(base, 'קווים.csv'));
    const stopsCsv = readCsv(path.join(base, 'תחנות קווים.csv'));
    const schedulesCsv = readCsv(path.join(base, 'מופעי קווים.csv'));
    console.log('linesCsv:', linesCsv.length, 'stopsCsv:', stopsCsv.length, 'schedulesCsv:', schedulesCsv.length);
    if (linesCsv.length > 0) console.log('First line row:', linesCsv[0]);
    if (stopsCsv.length > 0) console.log('First stop row:', stopsCsv[0]);
    if (schedulesCsv.length > 0) console.log('First schedule row:', schedulesCsv[0]);

    // Group stops and schedules by line id
    const stopsByLine: Record<string, any[]> = {};
    for (const stop of stopsCsv) {
        if (!stop['קו: מזהה']) continue;
        if (!stopsByLine[stop['קו: מזהה']]) stopsByLine[stop['קו: מזהה']] = [];
        stopsByLine[stop['קו: מזהה']].push({
            name: stop['כותרת'],
            isBase: parseBool(stop['תחנת בסיס'] || ''),
            index: stop['אינדקס'] ? Number(stop['אינדקס']) : 0,
            estimatedArrivalTime: stop['זמן משוער'] ? Number(stop['זמן משוער']) : 0,
        });
    }
    const schedulesByLine: Record<string, any[]> = {};
    for (const sched of schedulesCsv) {
        if (!sched['קו: מזהה']) continue;
        if (!schedulesByLine[sched['קו: מזהה']]) schedulesByLine[sched['קו: מזהה']] = [];
        schedulesByLine[sched['קו: מזהה']].push({
            weekday: weekdayMap[sched['יום']] || 'Sunday',
            isSpacial: parseBool(sched['ספיישל'] || ''),
            cancellationTimeAllowed: sched['זמן ביטול'] ? Number(sched['זמן ביטול']) : 60,
            passengersNumberAllowed: sched['מספר נוסעים'] ? Number(sched['מספר נוסעים']) : 16,
            driver: {
                name: '',
                phone: '',
                email: sched['נהג'] || '',
            },
            hour: sched['שעה'] ? Number(sched['שעה']) : 0,
            minute: sched['דקות'] ? Number(sched['דקות']) : 0,
            status: statusMap[sched['סטטוס']] || 'new',
            isActive: true,
        });
    }
    // Build lines
    const lines = linesCsv.map((line: any) => ({
        name: line['כותרת'],
        direction: directionMap[line['סוג הקו']] || 'pickup',
        stops: stopsByLine[line['מזהה']] || [],
        schedule: schedulesByLine[line['מזהה']] || [],
        isActive: true,
    }));
    console.log('First constructed line:', lines[0]);
    if (lines.length === 0) {
        console.error('No lines constructed! Check CSV parsing and mapping.');
    }

    // Connect and insert
    await mongoose.connect(MONGO_URI);
    const Line = mongoose.connection.collection('lines');
    await Line.deleteMany({});
    if (lines.length > 0) {
        await Line.insertMany(lines);
        console.log('Imported', lines.length, 'lines');
    } else {
        console.error('No lines to import.');
    }
    await mongoose.disconnect();
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
