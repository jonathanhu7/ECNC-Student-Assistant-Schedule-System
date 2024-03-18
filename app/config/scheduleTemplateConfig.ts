export interface ScheduleTemplate {
  dayOfTheWeek: string[];
  workingHours: string[];
}

export const scheduleTemplate = {
  dayOfTheWeek: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  workingHours: [
    "09:00-10:00",
    "10:00-12:00",
    "13:30-16:10",
    "16:10-18:00",
    "19:00-21:00",
  ],
};
