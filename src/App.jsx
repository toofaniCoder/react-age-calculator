import {
  Container,
  Paper,
  Stack,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import "./App.css";
import { Fragment, useMemo, useState } from "react";
import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { blue } from "@mui/material/colors";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function App() {
  // TEST DATES
  // const [startDate, setStartDate] = useState(moment("Feb-07-1955"));
  // const [endDate, setEndDate] = useState(moment("Aug-13-2024"));

  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const years = useMemo(
    () => endDate.clone().diff(startDate, "years"),
    [startDate, endDate]
  );

  const months = useMemo(
    () => endDate.clone().subtract(years, "years").diff(startDate, "months"),
    [years]
  );
  const days = useMemo(
    () =>
      endDate
        .clone()
        .subtract(years, "years")
        .subtract(months, "months")
        .diff(startDate, "days"),
    [months, years]
  );

  // useEffect(() => {
  //   if (startDate && endDate) {
  //   }
  // }, [startDate, endDate]);

  return (
    <Container sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }} component={Stack} spacing={5}>
        <Typography variant="h2" align="center">
          ⏳ Age Calculator
        </Typography>

        <Stack
          direction={"row"}
          spacing={5}
          sx={{
            "&>*": {
              flex: 1,
            },
          }}
        >
          <DatePicker
            label="Date of Birth"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
          />
          <DatePicker
            label="Age at the Date of"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
          />
        </Stack>
        {/* use this for number formatter: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat */}
        <List
          disablePadding
          component={Paper}
          variant="outlined"
          sx={{ borderColor: blue[100] }}
        >
          <ListItemButton
            sx={{
              bgcolor: blue[50],
              "&:hover": { bgcolor: blue[100] },
            }}
          >
            <ListItemIcon>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText
              primary={`${years} years, ${months} months, ${days} days`}
            />
          </ListItemButton>
          <Divider sx={{ bgcolor: blue[100] }} />
          {startDate &&
            endDate &&
            ["weeks", "days", "hours", "minutes", "seconds"].map(
              (item, index, arr) => (
                <Fragment key={item}>
                  <ListItemButton
                    sx={{
                      bgcolor: blue[50],
                      "&:hover": { bgcolor: blue[100] },
                    }}
                  >
                    <ListItemIcon>
                      <CalendarMonthIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${new Intl.NumberFormat().format(
                        endDate.diff(startDate, item)
                      )} ${item}`}
                    />
                  </ListItemButton>
                  {index < arr.length - 1 && (
                    <Divider sx={{ bgcolor: blue[100] }} />
                  )}
                </Fragment>
              )
            )}
        </List>
      </Paper>
    </Container>
  );
}

export default App;
