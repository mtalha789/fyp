import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";

const AddTimeSlots = ({ onSubmit }) => {
  const [timeSlots, setTimeSlots] = useState([{ start: "", end: "" }]);

  const handleAddSlot = () => {
    setTimeSlots([...timeSlots, { start: "", end: "" }]);
  };

  const handleRemoveSlot = (index) => {
    const newSlots = timeSlots.filter((_, i) => i !== index);
    setTimeSlots(newSlots);
  };

  const handleChange = (index, field, value) => {
    const newSlots = [...timeSlots];
    newSlots[index][field] = value;
    setTimeSlots(newSlots);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (timeSlots.every((slot) => slot.start && slot.end)) {
      onSubmit(timeSlots);
    } else {
      alert("Please fill in all time slot fields.");
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-semibold mb-4">Add Time Slots</h2>
      <form onSubmit={handleSubmit}>
        {timeSlots.map((slot, index) => (
          <div key={index} className="flex items-center gap-4 mb-4">
            <Input
              type="time"
              value={slot.start}
              onChange={(e) => handleChange(index, "start", e.target.value)}
              placeholder="Start Time"
              className="flex-1"
            />
            <Input
              type="time"
              value={slot.end}
              onChange={(e) => handleChange(index, "end", e.target.value)}
              placeholder="End Time"
              className="flex-1"
            />
            <Button
              type="button"
              onClick={() => handleRemoveSlot(index)}
              color="danger"
              size="sm"
            >
              Remove
            </Button>
          </div>
        ))}
        <Button type="button" onClick={handleAddSlot} color="primary" className="mb-4">
          Add Another Slot
        </Button>
        <Button type="submit" color="success">
          Submit Time Slots
        </Button>
      </form>
    </div>
  );
};

export default AddTimeSlots;
