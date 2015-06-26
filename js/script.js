// current time
    var interval = setInterval(function() {
        var momentNow = moment();
        $('#time').html(momentNow.format(' hh:mm A'));
    }, 100);


//ajax call to JSON api
var getMeetings = function() {
	$.ajax({
		dataType: "jsonp",
		url: "http://fake-co-calendar.herokuapp.com/api/v1/events",
		success: function(data) {
			var meetings = data.events.list;
			var allMeetings = $.map(meetings, function (meeting) {
      	var attendees = " ";
        $.each(meeting.attendees, function (index) {
        	var person = meeting.attendees[index]
          attendees += "<li><img src='" + person.photo +"'></li>";
        });

        // cueing audience when meetings are about to start
        var meetingTime = moment(meeting.start_time).subtract(10,'minutes').format('hh:mm');
        var currentTime = moment().format('hh:mm');
        var meetingAlert = function() {
        	if (meetingTime < currentTime){
        		return "you gotta go";
        	};
        }
       


			 	// adding to HTML			 
			 	return "<div class='meeting'><ul class='info'><li>" + 
			 	"<div class='meeting-time'>" + 
			 	moment(meeting.start_time).format('h:mm') + "-"
			 	+ moment(meeting.end_time).format('h:mmA') + "</div>" +
			 	"<div class='meeting-name'>" + meeting.name + "</div>" + 
			 	"<div class='meeting-location'>" + meeting.location + 
			 	"</div></ul>" + "<ul class='people'><div class='photos'>" 
			 	+ attendees + "</div></ul></li></div>" +	"<div class='soon'>" 
			 	+  "</div>"
 		 	
			});

			$('.meetings').append(allMeetings.join('')) 
	  }
 	});

 

};

getMeetings();
