// "use client";

// import React, { useState } from "react";
// import { scheduleTemplate } from "@/config/scheduleTemplateConfig";

// export default function FreeTimeSubmitForm(): React.ReactNode {
//   // useState 钩子函数能够允许你在函数组件中添加状态，这样可以方便你跟踪用户交互
//   // selectedSlots 是当前状态的值，被初始化为一个空对象，用来存储用户选择了的时间段
//   // setSelectedSlots 是一个函数，用来更新 selectedSlots 的值
//   const [selectedSlots, setSelectedSlots] = useState<Record<string, string[]>>(
//     {},
//   );

//   // 处理复选框的变化
//   const handleCheckboxChange = (day, timeSlot): void => {
//     // "??" 是为了确保 daySlots 始终是一个数组，如果不加这一句话，则可能结果会是 undefined
//     const daySlots = selectedSlots[day] ?? [];
//     // 检查 daySlots 中是否包含 timeSlot
//     if (daySlots.includes(timeSlot as string)) {
//       // 如果包含了 timeSlot，那么就代表用户之前选择了这个复选框，因此需要删除这个数据
//       setSelectedSlots({
//         ...selectedSlots, // 保持其他数据不变
//         [day]: daySlots.filter((slot) => slot !== timeSlot), // 删除掉原来的数据
//       });
//     } else {
//       // 如果不包含 timeSlot，那么就代表用户之前没有选择这个复选框，因此需要添加这个数据
//       setSelectedSlots({ ...selectedSlots, [day]: [...daySlots, timeSlot] });
//     }
//   };

//   // 处理表单提交
//   const handleSubmit = (event): void => {
//     event.preventDefault(); // 阻止表单的默认提交行为
//     console.log("Selected time slots:", selectedSlots);
//     // 这里可以进行进一步的处理，如发送到服务器
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2 className="text-4xl font-black mb-10">空闲时间提交</h2>
//       {scheduleTemplate.dayOfTheWeek.map((day) => (
//         // 循环渲染组件列表时，每个列表项元素应该有一个独一无二的 key 值，这样 React 才能够跟踪列表中的每一个元素的身份
//         <div key={day} className="flex items-center mt-6 border-b-2">
//           <h3 className="text-2xl">{day}:</h3>
//           {scheduleTemplate.workingHours.map((timeSlot) => (
//             <div key={`${day}-${timeSlot}`} className="ml-5">
//               <input
//                 type="checkbox"
//                 className="scale-175"
//                 onChange={() => {
//                   handleCheckboxChange(day, timeSlot);
//                 }}
//               />
//               <label className="text-2xl ml-3">{timeSlot}</label>
//             </div>
//           ))}
//         </div>
//       ))}
//       <button
//         className="text-2xl mt-12 rounded-2xl px-10 py-2 bg-blue-500 text-white"
//         type="submit"
//       >
//         提交
//       </button>
//     </form>
//   );
// }
