interface ExerciseCalculation {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface exerciseInput {
    days: Array<number>;
    target: number;
}

const calculateExercises = (days: Array<number>, target: number): ExerciseCalculation => {
    const filteredDays = days.filter(x => x > 0);
    const targetDays = days.filter(x => x >= target);
    const rating = days.length === targetDays.length ? 3 : 
        targetDays.length >= days.length / 2 ? 2 : 1;
    const ratingDesc = rating === 3 ? 'Perfect' : 
        rating === 2 ? 'Not bad but could be better' : 'Much room for improvement';
    return {
        periodLength: days.length,
        trainingDays: filteredDays.length,
        success: filteredDays.length === days.length,
        rating: rating,
        ratingDescription: ratingDesc,
        target: target,
        average: days.reduce((total, sum) => total + sum) / days.length
    };
};

const verifyArguments = (arg1: Array<number>, arg2: number): exerciseInput => {
    if (arg1.length < 1) throw new Error('Not enough arguments');

    const target = arg2;
    const days = arg1;

    if (Number(target) < 1) throw new Error('Provided target must be a 1 or higher');
    return {
        days: days,
        target: Number(target)
    };

};

export default function exerciseCalculator(arg1: Array<number>, arg2: number): ExerciseCalculation {
    try {
        const { days, target } = verifyArguments(arg1, arg2);
        return calculateExercises(days, target);
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Error encountered: ${error.message}`); // eslint-disable-line @typescript-eslint/no-unsafe-member-access
    }
}