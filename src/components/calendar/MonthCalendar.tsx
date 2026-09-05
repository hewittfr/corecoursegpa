import { Box, Typography } from '@mui/material'
import type { CalendarEvent, CalendarEventType } from '../../types'

const TYPE_COLOR: Record<CalendarEventType, string> = {
  'Dead Period': '#A52828',
  'Quiet Period': '#C47B17',
  'Contact Period': '#1B7A4E',
  'Evaluation Period': '#3A4A86',
  'Recruiting Shutdown': '#3B0A0A',
  Deadline: '#A52828',
  'Test Date': '#222A5B',
  'Important Date': '#5A6072',
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function isoDate(year: number, month: number, day: number): string {
  const value = new Date(year, month, day)
  const y = value.getFullYear()
  const m = String(value.getMonth() + 1).padStart(2, '0')
  const d = String(value.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function eventsOnDay(date: string, events: CalendarEvent[]): CalendarEvent[] {
  return events.filter((event) => event.startDate <= date && event.endDate >= date)
}

interface MonthCalendarProps {
  year: number
  month: number
  events: CalendarEvent[]
}

export default function MonthCalendar({ year, month, events }: MonthCalendarProps) {
  const firstWeekday = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: Array<{ day: number | null; date: string | null }> = []

  for (let i = 0; i < firstWeekday; i += 1) {
    cells.push({ day: null, date: null })
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ day, date: isoDate(year, month, day) })
  }
  while (cells.length % 7 !== 0) {
    cells.push({ day: null, date: null })
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          overflow: 'hidden',
        }}
      >
        {WEEKDAYS.map((label) => (
          <Box
            key={label}
            sx={{
              px: 1,
              py: 1,
              bgcolor: 'primary.main',
              color: 'white',
              textAlign: 'center',
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            {label}
          </Box>
        ))}
        {cells.map((cell, index) => {
          const dayEvents = cell.date ? eventsOnDay(cell.date, events) : []
          const visible = dayEvents.slice(0, 3)
          const extra = dayEvents.length - visible.length
          return (
            <Box
              key={`${cell.date ?? 'empty'}-${index}`}
              sx={{
                minHeight: { xs: 88, md: 112 },
                p: 0.75,
                borderTop: '1px solid',
                borderLeft: index % 7 === 0 ? 'none' : '1px solid',
                borderColor: 'divider',
                bgcolor: cell.day ? 'background.paper' : '#F5F7FB',
              }}
            >
              {cell.day ? (
                <>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {cell.day}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.4, mt: 0.5 }}>
                    {visible.map((event) => (
                      <Box
                        key={`${event.id}-${cell.date}`}
                        sx={{
                          px: 0.5,
                          py: 0.15,
                          borderRadius: 0.5,
                          bgcolor: TYPE_COLOR[event.type],
                          color: 'white',
                          fontSize: 10,
                          lineHeight: 1.3,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                        title={`${event.title} — ${event.notes}`}
                      >
                        {event.title}
                      </Box>
                    ))}
                    {extra > 0 ? (
                      <Typography variant="caption" color="text.secondary">
                        +{extra} more
                      </Typography>
                    ) : null}
                  </Box>
                </>
              ) : null}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export { TYPE_COLOR }
