# Book Reading Planner

### Code Institute Milestone Project 2 - Interactive Frontend Development

## UX
User stories:
Helping to plan reading a book intentionally

### Strategy
Create a reading schedule for books, offering 2 tracks of information as an output:
- How long does it take to read the entire book by reading x pages or x chapters every x day(s)
- How many pages or chapters do I need to read per x day(s) to be finished by a certain date

### Scope
Initial Input from the user:
- Book title
- number of pages
- reading goal (date to finish or number of pages per read)

Have further options selectable such as:
- 7 weekdays to enable or disable
- What time the reading is happening
- how long a reading session normally is

Output: Calendar with the days marked when the reading needs to happen. The user has the following options how to proceed:
- generate a pdf with the schedule
- export to Google Calendar (main calendar)
- Save locally in the browser

### Structure

One page design, two main sections:
- input of data, adjustements of options
- calendar (schedule)


Navigation bar on top, links to jump to the two main sections. A dropdown menu in the navigation bar for the saves. The book title is used for the saves, a trash bin next to each item to delete it.

Footer at the bottom with copyright and contact information

### Skeleton
[Wireframe](/wireframe.pdf)

### Surface

Minimalistic design to avoid distraction from the functions. The color theme has an "old library"-feel. As a contrast, the used fonts are more modern (sans-serif).
Subtile footer.

## Technologies

- HTML
- CSS
- JavaScript
- Bootstrap 4.4.1 (getbootstrap.com)
- jQuery (jQuery.com)
- Google Fonts (fonts.google.com)
- GitPod (gitpod.io) IDE
- GitHub (github.com) for sharing
- Git (for version control)
- Google Calendar API


## Features

### Current Features

- Show a calendar with marked dates according to a reading plan for a book
- Two possible reading goals: Either with a finish date, or a number of pages to read at once
- Output options: PDF Calendar or Export to Google Calendar
- Saving Plan in the browser
- Responsive design

### Planned Features

- Localised Calendar (week starting on Monday instead of Sunday for most European countries)
- Alert in the calendar if the reading plan is conflicting with existing Calendar Events
- Reminder in the browser for reading
