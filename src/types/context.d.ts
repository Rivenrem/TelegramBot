import { Context, Scenes } from 'telegraf';

interface SessionData extends Scenes.WizardSession {
    subscribedLocation?: string | null;
    chatID?: number;
    dbObjectID?: string;
    tasksToRemind?: Array<string>;
}

export interface MyContext extends Scenes.WizardContext, Context {
    session: SessionData;
}
