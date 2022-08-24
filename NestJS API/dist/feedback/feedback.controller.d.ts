import { FeedbackService } from './feedback.service';
import { Feedback } from './interfaces/feedback.interface';
import { CreateFeedbackDto } from './dto/feedback.dto';
export declare class FeedbackController {
    private readonly feedbackService;
    constructor(feedbackService: FeedbackService);
    findAll(): Promise<Feedback[]>;
    create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback>;
}
