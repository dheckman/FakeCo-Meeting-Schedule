// current time
var interval = setInterval(function() {
  var momentNow = moment();
  $('#time').html(momentNow.format(' hh:mm A'));
}, 100);


//ajax call to JSON api
var getMeetings = function() {
  $.ajax({
    url: "http://fake-co-calendar.herokuapp.com/api/v1/events",
    dataType: "jsonp",
    success: function(data) {
      var meetings = data.events.list;
      var allMeetings = $.map(meetings, function(meeting) {
        var attendees = " ";
        $.each(meeting.attendees, function(index) {
          var person = meeting.attendees[index]
          attendees += "<li><img src='" + person.photo +"'></li>";
        });

        // cueing audience when meetings are about to start
        var meetingCue = "Beginning " + moment(meeting.start_time).fromNow();
        var meetingAlert = function(s) {
          var meetingSoon = moment(s).subtract(15, 'minutes');
          if (meetingSoon > moment()) {
            return meetingCue;
          }
          else {
            return '';
          }
        };
       
        // adding to HTML
        var meetingTime = "<div class='meeting-alert'>" + meetingAlert(meeting.start_time, meeting.end_time) + "</div>" 
        + "<div class='meeting-time'>"  + moment(meeting.start_time).format('h:mm') 
        + "-" + moment(meeting.end_time).format('h:mmA') + "</div>";  
        var meetingName = "<div class='meeting-name'>" + meeting.name + "</div>";
        var meetingLocation = "<div class='meeting-location'>" + meeting.location + "</div>";
        var meetingAttendees = "<ul class='people'><div class='photos'>" + attendees + "</div></ul>";  

        return "<div class='meeting'><ul class='info'><li>" + meetingTime + meetingName 
        + meetingLocation + "</li></ul>" +meetingAttendees + "</div>"
       
      
      });


      $('.meetings').append(allMeetings) 
    }
  });
};

getMeetings();
