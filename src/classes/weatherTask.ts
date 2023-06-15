import { ScheduledTask } from 'node-cron';

class WeatherTaskClass {
    currentTask: ScheduledTask | null = null;

    get() {
        return this.currentTask;
    }

    set(newTask: ScheduledTask) {
        this.currentTask = newTask;
    }
}

const weatherTask = new WeatherTaskClass();

export default weatherTask;
