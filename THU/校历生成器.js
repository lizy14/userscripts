//School Calendar Generator

//Authored by Zhaoyang, 2015-10-6
//generates VEVENTs, to be placed in a `.ics` file

//options
var theFirstDayOfTheFirstWeek = [{
		year : 2015,
		month : 9, //do not minus 1 here
		day : 14
	}, {
		year : 2016,
		month : 2,
		day : 22
	}
];
var numberOfWeeks = 18;

var generatesAllDayEvent = true;
var prefix = "校历第";
var suffix = "周";
//end of options

var millisecondsInDay = 24 * 60 * 60 * 1000;

var ics = "";

function makeSemester(start) {
	var date = new Date();
	date.setYear(start.year);
	date.setMonth(start.month - 1);
	date.setDate(start.day);
	var i;
	var ics = "";
	for (i = 1; i <= numberOfWeeks; i++) {
		ics += "BEGIN:VEVENT\n";
		ics += "SUMMARY:" + (prefix + i + suffix) + " \n";
		ics += "CLASS:PUBLIC\n"
		if (generatesAllDayEvent) {
			ics += "DTSTART;VALUE=DATE:" + makeDate(date) + "\n";
			date.setTime(date.getTime() + 1 * millisecondsInDay);
			ics += "DTEND;VALUE=DATE:" + makeDate(date) + "\n";
			date.setTime(date.getTime() - 1 * millisecondsInDay);
		} else {
			ics += "DTSTART;TZID=Asia/Harbin:" + makeDate(date) + "T000000" + "\n";
			ics += "DTEND;TZID=Asia/Harbin:" + makeDate(date) + "T000000" + "\n";
		}
		ics += "LOCATION:\n";
		ics += "END:VEVENT\n";
		date.setTime(date.getTime() + 7 * millisecondsInDay);
	};
	return ics;
}

function addZero(n) {
	if (n < 10)
		n = "0" + n.toString();
	return n;
}
function makeDate(date) {
	return date.getFullYear().toString() + addZero(date.getMonth() + 1) + addZero(date.getDate());
}

theFirstDayOfTheFirstWeek.forEach(function (start) {
	ics += makeSemester(start)
});

console.log(ics);
