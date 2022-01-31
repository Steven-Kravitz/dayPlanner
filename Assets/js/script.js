// Ensure your JS is connected
// console.log('Connected')

// Header has display of month and day of the week. Could add active clock to this too

// Create variables for present Month, day of month, and day of week.
var presentDOW = moment().format('dddd');
// console.log(presentDOW)
var presentMonth = moment().format('MMMM');
// console.log(presentMonth)
var presentDOM = moment().format('Do');
// console.log(presentDOM)

// List the current date as text in jumbrotron, html line 29 is your target
$('#currentDay').text(presentDOW + ', ' + presentMonth + ' ' + presentDOM);

// Create timeblock x 10 (8am - 6pm), you need a space on left for time of day, middle note area, a submit button on right to save text
// Reference container
    var plannerContainer = $('.container')
    // plannerContainer.text('test')

// Create multiple row. Using a for loop using current hour so it aligns with Moment
for (var hour = 8; hour <= 18; hour++) {
    var hIndex = hour - 8;

    // Build the row base
    var rowDiv = $('<div>')
    rowDiv.addClass('row');
    rowDiv.addClass('planRow');
    rowDiv.attr('hIndex', hour);

    // Build time of day part of row
    var hourTOD = 0;
    var amPM = "";
    if (hour > 12) {
        hourTOD = hour - 12;
        amPM = "pm";
    } else {
        hourTOD = hour;
        amPM = "am";
    }

    // Build time of day location
    var timeRowSize = $('<div>')
    timeRowSize.addClass('col-md-2 hour time-block')
    var timeRow = $('<span>')

    timeRow.text(hourTOD + amPM)
    //Append to row base
    rowDiv.append(timeRowSize);
    timeRowSize.append(timeRow);


    //build middle note area. Local Storage is needed for this
    var storedNotes = JSON.parse(localStorage.getItem("storedNotes"))
    // console.log(storedNotes)
    if (storedNotes !== null){
        noteArray = storedNotes
    } else {
        //input something into local storage to help page populate
        noteArray = new Array(10)
        noteArray[0] = "Enter your daily plans here"
    }

    var noteArea = $('<textarea>');
    noteArea.attr('id','index-' + hIndex);
    noteArea.attr('hIndex', hIndex);
    noteArea.attr('type', 'text');
    noteArea.addClass('noteArea description')

    // Pull correct item from local storage based on array position
    noteArea.val(noteArray[hIndex]);

    // Build middle note area location
    var noteAreaSize = $('<div>')
    noteAreaSize.addClass('col-md-9')

    // Append to row base
    rowDiv.append(noteAreaSize)
    noteAreaSize.append(noteArea)

    // Build save area.
    var saveArea = $('<div>')
    saveArea.addClass('col-md-1 saveBtn')

    var saveBtn = $('<i>')
    saveBtn.attr('id', 'saveid-' + hIndex)
    saveBtn.attr('save-id', hIndex)
    saveBtn.attr('class','fa fa-save floppy-disk');

    // Append to row base
    rowDiv.append(saveArea)
    saveArea.append(saveBtn)

    // Append row base to container
    plannerContainer.append(rowDiv)

    // Changes row color based on current hour
    changeRowColor(rowDiv, hour)
}

// Adds class to note area to indicate what time of day it is through color
function changeRowColor() {
    if (hour < moment().format('H')){
        noteAreaSize.addClass('past')
    } else if (hour > moment().format('H')){
        noteAreaSize.addClass('present')
    } else {
        noteAreaSize.addClass('future')
    }

}

// adds local storage saving

$(document).on('click', 'i', function(event) {
    event.preventDefault()

    var saveIndex = $(this).attr('save-id')
    var inputIndex = '#index-' + saveIndex
    var indexValue = $(inputIndex).val()
    
    noteArray[saveIndex] = indexValue
    localStorage.setItem("storedNotes", JSON.stringify(noteArray))
})