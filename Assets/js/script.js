// Ensure your JS is connected
// console.log('Connected')

// Header has display of month and day of the week. Could add active clock to this too

// Create variables for present Month, day of month, and day of week.
var presentDOW = moment().format('dddd')
// console.log(presentDOW)
var presentMonth = moment().format('MMMM')
// console.log(presentMonth)
var presentDOM = moment().format('do')
// console.log(presentDOM)

// List the current date as text in jumbrotron, html line 29 is your target
$('#currentDay').text(presentDOW + ', ' + presentMonth + ' ' + presentDOM)

// Create timeblock x 10 (8am - 6pm), you need a space on left for time of day, middle note area, a submit button on right to save text

// Create multiple row. Using a for loop using current hour so it aligns with Moment
for (var hour = 8; hour <= 18; hour++) {
    var hIndex = hour - 8;

    // Build the row base
    $('<div>').addClass('row')
    $('<div>').addClass('planRow')
    
}