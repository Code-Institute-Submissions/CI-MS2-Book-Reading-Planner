# Book Reading Planner

### Code Institute Milestone Project 2 - Interactive Frontend Development

This projects helps people to read a book intentionnaly by creating a reading plan.

***
## UX
User stories:
As a reader, I want to know when I finish reading a book, or how much I have to read when I set a goal.

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
- What time the reading is happening (used for Google export)
- how long a reading session normally is (used for Google export)

Output: Calendar with the days marked when the reading needs to happen. The user has the following options how to proceed:
- generate a popup tab with the schedule for printing
- export to Google Calendar (main calendar)

### Structure

One page design, three main sections:
- home page with a short introduction
- input of data, adjustements of options
- calendar (schedule), and output options

Navigation bar on top, links to jump to the main sections.

Footer at the bottom of the home page with copyright and contact information

### Skeleton
[Wireframe](/wireframe.pdf)

### Surface

Minimalistic design to avoid distraction from the functions.
Subtile footer.

***
## Features

### Current Features

- Show a calendar with marked dates according to the given input. The plan adjusts dynamically when the user changes values (as described under "Scope")
- Two possible reading goals: Either with a finish date, or a number of pages to read at once. The goal changes when selecting the according radio button with its option
- Output options: Print View of the reading schedule or Export to Google Calendar. The user can select one of the 2 buttons above the calendar. When Choosing the Google Calendar Export, the user will be prompted to the Google Login.
- Responsive design

### Planned Features

- Choosing another date as a start point
- Saving of books to read. (This is why the object "savedData" in script.js contains an array of books, and not just one book. This will make implementation easier)
- Showing multiple saved books in the calendar section
- Showing the progress of the reading of saved books
- Localised Calendar (week starting on Monday instead of Sunday for most European countries)
- Alert in the calendar if the reading plan is conflicting with existing Calendar Events
- Reminder in the browser for reading

***
## Technologies used

- HTML
- CSS
- JavaScript
- Bootstrap 4.4.1 (getbootstrap.com)
- jQuery (jQuery.com) to access DOM elements quicker and easy react to user input
- Google Fonts (fonts.google.com) for 2 fonts
- GitPod (gitpod.io) IDE
- GitHub (github.com) for sharing
- Git (for version control)
- Google Calendar API (https://developers.google.com/calendar/) for creating calendar events from the reading schedule

***
## Testing

I had used Jasmine to test some functions and initial error messages. Later in the project, I did extensive manual testing, as described in the document [Manual Testing](https://c-ronics.com/course/iReadMore-testing.xls).

***
## Deployment

### Create a local repository

This is the GitHub link to the repository: https://github.com/andreasjost/CI-MS2-Book-Reading-Planner

Follow this steps to make a local clone of the repository:
https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository

IMPORTANT: Export to Google Calendar won't work locally. I only whitelisted my own domain (https://c-ronics.com) for the use of the API with my client-id.

***
## Credits

### Media

The photos used are from pixabay.com.

### Code

Besides the Code Institute Walkthrough projects, I often consulted stackoverflow.com and w3schools.com for tips.

The Google Calendar API documentation provided the necessary knowledge for writing the code in /assets/js/export-schedule.js. Especially the following two examples helped greatly:
- [JavaScript implementation of the API](https://developers.google.com/calendar/quickstart/js)
- [Saving calendar events](https://developers.google.com/calendar/create-events)
