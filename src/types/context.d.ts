import { Context, Scenes } from 'telegraf';

interface SessionData extends Scenes.WizardSession {
    subscribedLocation?: string | null;
    chatID?: number;
    dbObjectID?: string;
    taskToRemind?: string;
}

export interface MyContext extends Scenes.WizardContext, Context {
    session: SessionData;
}
