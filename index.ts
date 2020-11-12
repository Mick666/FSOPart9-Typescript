import express from 'express';
import bmiCalculator from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    let height: string = req.query.height as string;
    let weight: string = req.query.weight as string;

    try {
        const returnValue = bmiCalculator(height, weight)
        res.send({
            weight: weight,
            height: height,
            bmi: returnValue
        })
    } catch (error) {
        res.send({
            error: "malformatted parameters"
          })
    }
  });

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});