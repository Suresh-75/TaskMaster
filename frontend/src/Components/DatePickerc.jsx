import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DateTimeField } from "@mui/x-date-pickers";
function DatePickerc({ start, time, set }) {
  return (
    <div className="mr-3">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimeField
          margin="none"
          size="small"
          variant="standard"
          label={`${start ? "StartTime" : "EndTime"}`}
          format="L HH:mm"
          value={time}
          onChange={(newValue) => set(newValue)}
        />
      </LocalizationProvider>
    </div>
  );
}
export default DatePickerc;
