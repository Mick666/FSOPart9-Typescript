import express from 'express';
import bmiCalculator from './bmiCalculator';
import exerciseCalculator from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height: string = req.query.height as string;
    const weight: string = req.query.weight as string;

    try {
        const returnValue = bmiCalculator(height, weight);
        res.send({
            weight: weight,
            height: height,
            bmi: returnValue
        });
    } catch (error) {
        res.send({
            error: 'malformatted parameters'
        });
    }
});

app.post('/exercises', (request, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const daily_exercises: Array<number> = request.body.daily_exercises as Array<number>;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const target: number = request.body.target as number;

    if (!daily_exercises || !target) {
        res.send({
                error: 'parameters missing'
        });
        return;
    }

    try {
        const returnValue = exerciseCalculator(daily_exercises, target);
        res.send(returnValue);
        
    } catch (error) {
        res.send({
            error: 'malformatted parameters'
        });
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});