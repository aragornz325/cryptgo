import { Model } from 'mongoose';
import { Feedback } from './interfaces/feedback.interface';
export declare class FeedbackService {
    private readonly feedback;
    constructor(feedback: Model<Feedback>);
    findAll(): Promise<Feedback[]>;
    create(body: any): Promise<Feedback>;
}
