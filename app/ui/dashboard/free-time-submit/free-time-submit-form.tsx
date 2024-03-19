"use client";

import React from "react";
import { scheduleTemplate } from "@/app/config/scheduleTemplateConfig";

export default function FreeTimeSubmitForm(): React.ReactNode {
  // useState 钩子函数能够允许你在函数组件中添加状态，这样可以方便你跟踪用户交互
  // selectedSlots 是当前状态的值，被初始化为一个空对象，用来存储用户选择了的时间段
  // setSelectedSlots 是一个函数，用来更新 selectedSlots 的值
  // const [selectedSlots, setSelectedSlots] = useState({});

  return (
    <form>
      <h2 className="text-4xl font-black mb-10">空闲时间提交</h2>
      {scheduleTemplate.dayOfTheWeek.map((day) => (
        // 循环渲染组件列表时，每个列表项元素应该有一个独一无二的 key 值，这样 React 才能够跟踪列表中的每一个元素的身份
        <div key={day} className="flex items-center mt-6 border-b-2">
          <h3 className="text-2xl">{day}:</h3>
          {scheduleTemplate.workingHours.map((timeSlot) => (
            <div key={`${day}-${timeSlot}`} className="ml-5">
              <input type="checkbox" className="scale-175" />
              <label className="text-2xl ml-3">{timeSlot}</label>
            </div>
          ))}
        </div>
      ))}
      <button className="text-2xl mt-12 rounded-2xl px-10 py-2 bg-blue-500 text-white">
        提交
      </button>
    </form>
  );
}
