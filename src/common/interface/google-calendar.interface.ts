interface EventDateTime {
    dateTime: string; // ISO 8601 format date-time string
    timeZone?: string; // Time zone of the date-time
  }
  
  interface EventReminder {
    method: string; // 'email' or 'popup'
    minutes: number; // Minutes before the event for the reminder
  }
  
  interface EventReminders {
    useDefault: boolean;
    overrides?: EventReminder[]; // Custom reminders
  }
  
  interface EventAttendee {
    email: string; // Email address of the attendee
    responseStatus?: string; // 'accepted', 'declined', 'tentative', etc.
  }
  
  export interface EventGoogle {
    summary: string; // Title of the event
    location?: string; // Location of the event
    description?: string; // Description of the event
    start: EventDateTime; // Start date and time
    end: EventDateTime; // End date and time
    attendees?: EventAttendee[]; // List of attendees
    reminders?: EventReminders; // Reminders for the event
  }
  
  export interface UpdateEventGoogle extends EventGoogle {
    eventId: string;
  }
  
  export interface IGetList {
    calendarId: string;
    maxResults: 2500;
    timeMin: string;
    singleEvents: false;
    nextPageToken: '';
  }