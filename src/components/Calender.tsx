import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type CalenderProps = {
    startDate: Date;
    setStartDate: (date: Date) => void;
};

function Calender({ startDate, setStartDate }: CalenderProps) {
    return (
        <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date as Date)}
            timeInputLabel="Time:"
            dateFormat="MM/dd/yyyy h:mm aa"
            showTimeInput
            className="border border-[#9e78cf] rounded-md p-1 w-full mt-2 bg-transparent text-sm text-purple-200 hover:text-purple-300 focus:text-purple-300 focus:outline-none"
        />
    );
}

export default Calender;
