import React from "react";
import { scheduleTemplate } from "@/app/config/scheduleTemplateConfig";
export default function HomePage(): React.ReactElement {
  return (
    <div className="bg-white h-full rounded-xl flex justify-center flex-col items-center">
      <table className="w-11/12 h-11/12 border-4">
        <thead>
          <tr>
            <td> </td>
            {scheduleTemplate.dayOfTheWeek.map((day, index) => (
              <td key={index}>{day}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {scheduleTemplate.workingHours.map((hour, hourIndex) => (
            <tr key={hourIndex}>
              <td>{hour}</td>
              {Array.from({
                length: scheduleTemplate.dayOfTheWeek.length - 1,
              }).map((_, index) => (
                <td key={index}> </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
