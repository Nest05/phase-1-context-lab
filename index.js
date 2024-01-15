/* Your Code Here */
function createEmployeeRecord(employeeInfo){
    const employeeRecord = {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employeeRecord;
}

function createEmployeeRecords(employeeRecords){
    const records = [];

    for(let i = 0; i < employeeRecords.length; i++){
        const employeeRecord = createEmployeeRecord(employeeRecords[i]);
        records.push(employeeRecord);
    }
    return records;
}

function createTimeInEvent(dateStamp){
    const [date, hour] = dateStamp.split(' ');

    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour),
        date: date
    });

    return this;
}

function createTimeOutEvent(dateStamp){
    const [date, hour] = dateStamp.split(' ');

    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour),
        date: date
    });

    return this;
}

function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find(event => event.date === date);
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date);

    const timeIn = timeInEvent.hour;
    const timeOut = timeOutEvent.hour;

    const hoursWorked = (timeOut - timeIn)/100;

    return hoursWorked;
}

function wagesEarnedOnDate(date){
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    const payRate = this.payPerHour;

    const wagesEarned = hoursWorked * payRate;

    return wagesEarned;
}

function calculatePayroll(employeeRecords) {
    let totalPayroll = 0;

    for (let i = 0;  i < employeeRecords.length; i++){
        const employeeRecord = employeeRecords[i];
        const timeInEvents = employeeRecord.timeInEvents;

        for (let j = 0; j < timeInEvents.length; j++){
            const date = timeInEvents[j].date;
            const wagesEarned = wagesEarnedOnDate.call(employeeRecord, date);
            totalPayroll += wagesEarned;
        }
    }

    return totalPayroll;
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(employee => employee.firstName === firstName);
}



/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

