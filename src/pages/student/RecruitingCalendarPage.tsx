import ArrowBack from '@mui/icons-material/ArrowBack'
import CalendarMonthOutlined from '@mui/icons-material/CalendarMonthOutlined'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import ChevronRight from '@mui/icons-material/ChevronRight'
import PrintOutlined from '@mui/icons-material/PrintOutlined'
import TableRowsOutlined from '@mui/icons-material/TableRowsOutlined'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  GlobalStyles,
  IconButton,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import MonthCalendar, { TYPE_COLOR } from '../../components/calendar/MonthCalendar'
import PageHeader from '../../components/PageHeader'
import {
  CALENDAR_SOURCE,
  CALENDAR_SPORTS,
  mockCalendarEvents,
  type CalendarSport,
} from '../../mock/calendarEvents'
import type { CalendarEventType } from '../../types'
import { formatDateRange } from '../../utils/format'

const EVENT_TYPES: CalendarEventType[] = [
  'Dead Period',
  'Quiet Period',
  'Contact Period',
  'Evaluation Period',
  'Recruiting Shutdown',
  'Deadline',
  'Test Date',
  'Important Date',
]

function eventsForSport(sport: CalendarSport) {
  if (sport === 'All') return mockCalendarEvents
  return mockCalendarEvents.filter((event) => event.sport === sport || event.sport === 'All')
}

export default function RecruitingCalendarPage() {
  const [sport, setSport] = useState<CalendarSport>('Football')
  const [view, setView] = useState<'table' | 'calendar'>('calendar')
  const [cursor, setCursor] = useState(new Date(2026, 8, 1))

  const events = useMemo(
    () =>
      [...eventsForSport(sport)].sort((a, b) => a.startDate.localeCompare(b.startDate)),
    [sport],
  )

  const monthLabel = cursor.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const printLabel = view === 'table' ? 'Print table' : 'Print calendar'

  return (
    <Stack spacing={2}>
      <GlobalStyles
        styles={{
          '@media print': {
            'body *': { visibility: 'hidden' },
            '#calendar-print-area, #calendar-print-area *': { visibility: 'visible' },
            '#calendar-print-area': {
              position: 'absolute',
              inset: 0,
              width: '100%',
              background: '#fff',
            },
            '.no-print': { display: 'none !important' },
          },
        }}
      />

      <Button
        className="no-print"
        component={RouterLink}
        to="/recruiting"
        startIcon={<ArrowBack />}
        sx={{ alignSelf: 'flex-start', px: 0 }}
      >
        Back to recruiting
      </Button>
      <PageHeader
        title="Recruiting Calendar"
        subtitle="NCAA Division I 2026–27 recruiting periods, signing windows, camps, and official SAT/ACT dates. Confirm any date with ncaa.org — calendars can change."
        action={
          <Button
            className="no-print"
            variant="contained"
            color="secondary"
            startIcon={<PrintOutlined />}
            onClick={() => window.print()}
          >
            {printLabel}
          </Button>
        }
      />

      <Box className="no-print">
        <Tabs
          value={sport}
          onChange={(_event, value: CalendarSport) => setSport(value)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {CALENDAR_SPORTS.map((item) => (
            <Tab key={item} value={item} label={item} />
          ))}
        </Tabs>
      </Box>

      <Stack
        className="no-print"
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.5}
        sx={{ justifyContent: 'space-between' }}
      >
        <ToggleButtonGroup
          exclusive
          value={view}
          onChange={(_event, value: 'table' | 'calendar' | null) => {
            if (value) setView(value)
          }}
          size="small"
        >
          <ToggleButton value="calendar">
            <CalendarMonthOutlined sx={{ mr: 1 }} fontSize="small" />
            Calendar
          </ToggleButton>
          <ToggleButton value="table">
            <TableRowsOutlined sx={{ mr: 1 }} fontSize="small" />
            Table
          </ToggleButton>
        </ToggleButtonGroup>
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
          {EVENT_TYPES.map((type) => (
            <Chip
              key={type}
              size="small"
              label={type}
              sx={{ bgcolor: TYPE_COLOR[type], color: 'white' }}
            />
          ))}
        </Stack>
      </Stack>

      <Box id="calendar-print-area">
        <Typography variant="h6" sx={{ display: 'none', '@media print': { display: 'block', mb: 1 } }}>
          {sport === 'All' ? 'All sports' : sport} recruiting calendar — {view === 'table' ? 'table view' : monthLabel}
        </Typography>

        {view === 'calendar' ? (
          <Card>
            <CardContent>
              <Stack
                direction="row"
                spacing={1}
                sx={{ justifyContent: 'space-between', mb: 2 }}
              >
                <IconButton
                  className="no-print"
                  aria-label="Previous month"
                  onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
                >
                  <ChevronLeft />
                </IconButton>
                <Typography variant="h6" color="primary">
                  {monthLabel}
                </Typography>
                <IconButton
                  className="no-print"
                  aria-label="Next month"
                  onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
                >
                  <ChevronRight />
                </IconButton>
              </Stack>
              <MonthCalendar
                year={cursor.getFullYear()}
                month={cursor.getMonth()}
                events={events}
              />
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent sx={{ overflowX: 'auto' }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Event</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Sport</TableCell>
                    <TableCell>Dates</TableCell>
                    <TableCell>Notes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>{event.title}</TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={event.type}
                          sx={{ bgcolor: TYPE_COLOR[event.type], color: 'white' }}
                        />
                      </TableCell>
                      <TableCell>{event.sport}</TableCell>
                      <TableCell>{formatDateRange(event.startDate, event.endDate)}</TableCell>
                      <TableCell>{event.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </Box>

      <Typography variant="caption" color="text.secondary">
        Sources: {CALENDAR_SOURCE} Volleyball and lacrosse tabs use the published women’s Division I
        calendars. Basketball uses the men’s Division I calendar. Soccer lists men’s and women’s
        dates from the Other Sports calendar.
      </Typography>
    </Stack>
  )
}
