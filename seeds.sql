-- Department Data --
INSERT INTO department
    (id, name)
VALUES
    (1, "Accounting");

INSERT INTO department
    (id, name)
VALUES
    (2, "Marketing");

INSERT INTO department
    (id, name)
VALUES
    (3, "Engineering");

INSERT INTO department
    (id, name)
VALUES
    (4, "Operations");

-- Role Data --
INSERT INTO role
    (id, title, salary, department_id)
VALUES
    (1, "Software Engineer", 85000, 12);

INSERT INTO role
    (id, title, salary, department_id)
VALUES
    (2, "Communications Coordinator", 52000, 15);

INSERT INTO role
    (id, title, salary, department_id)
VALUES
    (3, "HR Assistant", 45000, 9);

INSERT INTO role
    (id, title, salary, department_id)
VALUES
    (4, "Accountant", 65000, 3);

-- Employee Data --
INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (1, "Kyle", "Jackson", 12, 19);

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (2, "Sarah", "Smith", 14, 8);

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (3, "Maggie", "Lawson", 9, 13);

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (4, "Amanda", "Finney", 5, 17);