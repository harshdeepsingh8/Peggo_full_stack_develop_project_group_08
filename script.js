document.addEventListener("DOMContentLoaded", () => {
  const departments = [
    {
      name: "REPLACE WITH DEPARTMENT FROM CASE STUDY",
      employees: [
        { firstName: "REPLACE", lastName: "EMPLOYEE" },
        { firstName: "REPLACE", lastName: "EMPLOYEE" }
      ]
    },
    {
      name: "REPLACE WITH DEPARTMENT FROM CASE STUDY",
      employees: [
        { firstName: "REPLACE", lastName: "EMPLOYEE" },
        { firstName: "REPLACE", lastName: "EMPLOYEE" }
      ]
    }
  ];

  const directory = document.querySelector("#employee-directory");
  const currentYear = document.querySelector("#current-year");

  departments.forEach((department) => {
    const section = document.createElement("section");
    section.className = "department";

    const heading = document.createElement("h2");
    heading.textContent = department.name;

    const employeeList = document.createElement("ul");
    employeeList.className = "employee-list";

    department.employees.forEach((employee) => {
      const listItem = document.createElement("li");

      listItem.textContent = employee.lastName
        ? `${employee.firstName} ${employee.lastName}`
        : employee.firstName;

      employeeList.appendChild(listItem);
    });

    section.appendChild(heading);
    section.appendChild(employeeList);
    directory.appendChild(section);
  });

  currentYear.textContent = new Date().getFullYear();
});