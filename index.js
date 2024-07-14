const { expect } = require('chai'); // Importing expect from Chai for assertions
const {
  createEmployeeRecord,
  createEmployeeRecords,
  createTimeInEvent,
  createTimeOutEvent,
  hoursWorkedOnDate,
  wagesEarnedOnDate,
  allWagesFor,
  calculatePayroll
} = require('./helpers'); // Adjust the path as per your file structure

describe("Payroll System Tests", function () {
  
  describe("createEmployeeRecord", function () {
    it("creates an employee record with correct fields", function () {
      let employee = createEmployeeRecord(["John", "Doe", "Manager", 25]);
      expect(employee.firstName).to.equal("John");
      expect(employee.familyName).to.equal("Doe");
      expect(employee.title).to.equal("Manager");
      expect(employee.payPerHour).to.equal(25);
      expect(employee.timeInEvents).to.eql([]);
      expect(employee.timeOutEvents).to.eql([]);
    });
  });

  describe("createEmployeeRecords", function () {
    it("creates employee records from an array of arrays", function () {
      let employeesData = [
        ["John", "Doe", "Manager", 25],
        ["Jane", "Smith", "Developer", 30]
      ];
      let employees = createEmployeeRecords(employeesData);
      expect(employees.length).to.equal(2);
      expect(employees[0].firstName).to.equal("John");
      expect(employees[1].firstName).to.equal("Jane");
    });
  });

  describe("createTimeInEvent", function () {
    it("adds a timeIn event to an employee record", function () {
      let employee = createEmployeeRecord(["John", "Doe", "Manager", 25]);
      createTimeInEvent.call(employee, "2024-07-14 0900");
      expect(employee.timeInEvents.length).to.equal(1);
      expect(employee.timeInEvents[0].type).to.equal("TimeIn");
      expect(employee.timeInEvents[0].date).to.equal("2024-07-14");
      expect(employee.timeInEvents[0].hour).to.equal(900);
    });
  });

  describe("createTimeOutEvent", function () {
    it("adds a timeOut event to an employee record", function () {
      let employee = createEmployeeRecord(["John", "Doe", "Manager", 25]);
      createTimeOutEvent.call(employee, "2024-07-14 1700");
      expect(employee.timeOutEvents.length).to.equal(1);
      expect(employee.timeOutEvents[0].type).to.equal("TimeOut");
      expect(employee.timeOutEvents[0].date).to.equal("2024-07-14");
      expect(employee.timeOutEvents[0].hour).to.equal(1700);
    });
  });

  describe("hoursWorkedOnDate", function () {
    it("calculates hours worked on a specific date", function () {
      let employee = createEmployeeRecord(["John", "Doe", "Manager", 25]);
      createTimeInEvent.call(employee, "2024-07-14 0900");
      createTimeOutEvent.call(employee, "2024-07-14 1700");
      let hoursWorked = hoursWorkedOnDate.call(employee, "2024-07-14");
      expect(hoursWorked).to.equal(8);
    });
  });

  describe("wagesEarnedOnDate", function () {
    it("calculates wages earned on a specific date", function () {
      let employee = createEmployeeRecord(["John", "Doe", "Manager", 25]);
      createTimeInEvent.call(employee, "2024-07-14 0900");
      createTimeOutEvent.call(employee, "2024-07-14 1700");
      let wagesEarned = wagesEarnedOnDate.call(employee, "2024-07-14");
      expect(wagesEarned).to.equal(200);
    });
  });

  describe("allWagesFor", function () {
    it("calculates total wages earned for all dates", function () {
      let employee = createEmployeeRecord(["John", "Doe", "Manager", 25]);
      createTimeInEvent.call(employee, "2024-07-14 0900");
      createTimeOutEvent.call(employee, "2024-07-14 1700");
      createTimeInEvent.call(employee, "2024-07-15 0900");
      createTimeOutEvent.call(employee, "2024-07-15 1500");
      let totalWages = allWagesFor.call(employee);
      expect(totalWages).to.equal(400);
    });
  });

  describe("calculatePayroll", function () {
    it("calculates total payroll for an array of employee records", function () {
      let employeesData = [
        ["John", "Doe", "Manager", 25],
        ["Jane", "Smith", "Developer", 30]
      ];
      let employees = createEmployeeRecords(employeesData);
      employees.forEach(emp => {
        createTimeInEvent.call(emp, "2024-07-14 0900");
        createTimeOutEvent.call(emp, "2024-07-14 1700");
      });
      let totalPayroll = calculatePayroll(employees);
      expect(totalPayroll).to.equal(1100); // 8 hours * 25 + 8 hours * 30 = 1100
    });
  });

});
