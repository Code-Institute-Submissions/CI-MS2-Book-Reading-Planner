# Book Reading Planner

### Code Institute Milestone Project 2 - Interactive Frontend Development

This projects helps people to read a book intentionnaly by creating and a reading plan.

![Responsiveness Screenshot](attachments/responsiveness-screenshot.png)

Link to live website: https://c-ronics.com/ireadmore/index.html


***
## UX
User stories:
- I want to know when I finish reading a book, or how much I have to read when I set a goal
- I consider buying a book, and want to know approximately how much effort I have to put into reading it
- I'd like to see in my calendar what pages I have to read of a certain book
- I want to print a reading plan and pin it on my fridge as a reminder

### Strategy
Create a reading schedule for books, offering 2 tracks of information as an output:
- How long does it take to read the entire book by reading n pages every n day(s)
- How many pages do I need to read per n day(s) to be finished by a certain date

### Scope
Initial Input from the user:
- Book title
- Number of pages
- Reading goal (date to finish or number of pages per read)

Further options selectable such as:
- 7 weekdays to enable or disable
- What time the reading is happening (used for Google export)
- How long a reading session normally is (used for Google export)

Output: Calendar with the days marked when the reading needs to happen, or a detailed schedule. The user has the following options to proceed:
- Print a reading schedule
- Export schedule to Google Calendar as calendar events (main calendar)

### Structure

One page design, three main sections:
- home page with a short introduction
- input of data, adjustements of options
- calendar as a table or detailed schedule (selectable), and Export/Print button

Fixed navigation bar on top with a logo and links to jump to the main sections.

Footer at the bottom of the home page with copyright information and contact links

### Skeleton
[Wireframe](/attachments/wireframe.pdf)

### Surface

- Minimalistic design to avoid distraction from the functions
- Subtile footer
- Short introduction with a tagline and a call to action
- Sample values when opening the page ( > promting users to experiment through changing the values)
- Update happens automatically, following the trend of many modern web-forms (no action-button to create the plan)

***
## Features

### Current Features

- Visualizing a reading plan according to the user input. The plan adjusts dynamically when the user changes values.
- Two possible reading goals: Either with a finish date, or a number of pages to read at once. The goal changes when selecting the radio button respectivly.
- Output options: Print or Export to Google Calendar (/assets/js/export-schedule.js). The user can push the Export or Print button. When choosing Export, the user will be prompted to the Google Login.
- Responsive design

### Planned Features

- Choosing another date as a start point
- Saving of books to read. (This is why the object "savedData" in script.js contains an array of books, and not just one book. This will make implementation easier)
- Showing multiple saved books in the calendar section
- Showing the progress of the reading of saved books
- Localised Calendar (week starting on Monday instead of Sunday for most European countries)
- Alert in the calendar if the reading plan is conflicting with existing Calendar Events
- Customize the reminder of the Google Calendar Events (currently it's 30 minutes before the event).

***
## Technologies used

- HTML
- CSS
- JavaScript
- Bootstrap 4.4.1 (getbootstrap.com)
- jQuery 3.4.1 (jQuery.com) to access DOM elements quicker, and react to user input
- Google Fonts (fonts.google.com) for 2 fonts
- GitPod (gitpod.io) IDE
- GitHub (github.com) for sharing
- Git (for version control)
- Google Calendar API (https://developers.google.com/calendar/) for creating calendar events from the reading schedule

***
## Testing

I had used Jasmine to test some functions and initial error messages. Later in the project, I did extensive manual testing, as described in the document [iReadMore-testing](attachments/iReadMore-testing.xlsx).

I ran the code through validation services (https://validator.w3.org/, http://jigsaw.w3.org/css-validator/ and https://jshint.com/). The following errors still appear:

- HTML: Attribute onreadystatechange not allowed on element script at this point. I left it as it is because this is the recommended link from the Google API.
- CSS warning: ...is an unknown vendor extended pseudo-class. I left it in the code because it's the recommentded solution of w3schools to avoid displaying arrows in the number-inputfileds. And: it works anyway.


***
## Deployment

### Create a local repository

This is the GitHub link to the repository: https://github.com/andreasjost/CI-MS2-Book-Reading-Planner

Follow this steps to make a local clone of the repository:
https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository

IMPORTANT: Export to Google Calendar won't work locally. I only whitelisted my own domain (https://c-ronics.com) for the use of the API with my client-id.

### Deployment of project

I deployed the project on https://www.hetzner.de on my domain c-ronics.com, taking the following steps:

1. Download the project from GitHub:    
    1.1 Open the repository on GitHub    
    1.2 Click the button "Clone or download" > download ZIP  
    1.3 Unpack the ZIP-File

2. Upload the project to the host     
    2.1 Open the host's server in Cyberduck (cyberduck.io)   
    2.2 Create a new folder on the root directory (ireadmore) and grag all the files from the unpacked ZIP-file

***
## Credits

### Media

The photos used are from pixabay.com.

### Code

Besides the Code Institute Walkthrough projects, I often consulted stackoverflow.com and w3schools.com for tips.

Thanks also to my Code Institute Mentor Adegbenga Adeye for all the useful input.

The Google Calendar API documentation provided the necessary knowledge for writing the code in /assets/js/export-schedule.js. Especially the following two examples helped greatly:
- [JavaScript implementation of the API](https://developers.google.com/calendar/quickstart/js)
- [Saving calendar events](https://developers.google.com/calendar/create-events)
