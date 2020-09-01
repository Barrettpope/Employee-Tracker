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
    (1, "Software Engineer", 85000, 3);

INSERT INTO role
    (id, title, salary, department_id)
VALUES
    (2, "Communications Coordinator", 52000, 2);

INSERT INTO role
    (id, title, salary, department_id)
VALUES
    (3, "HR Assistant", 45000, 4);

INSERT INTO role
    (id, title, salary, department_id)
VALUES
    (4, "Accountant", 65000, 1);

-- Employee Data --
INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (1, "Kyle", "Jackson", 1, 1);

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (2, "Sarah", "Smith", 2, 2);

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (3, "Maggie", "Lawson", 3, 3);

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (4, "Amanda", "Finney", 4, 4);