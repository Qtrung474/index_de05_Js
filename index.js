let employees = [
    { employessCode: "EMP-001", fullName: "Ngô Thanh Tùng", department: "Phòng Kỹ Thuật", age: 28, experienceYear: 5 },
    { employessCode: "EMP-002", fullName: "Hồ Thị Thu", department: "Phòng Nhân Sự", age: 35, experienceYear: 10 },
    { employessCode: "EMP-003", fullName: "Mai Quốc Việt", department: "Phòng Kỹ Thuật", age: 24, experienceYear: 1 }
];

let isRunning = true;


function validateEmployeeCode(code, isCheckDuplicate = true) {
    if (code === null || code === undefined || code.trim() === "") {
        return "Mã nhân viên không được để trống!";
    }

    let cleanCode = code.trim().toUpperCase();

    let codePattern = /^EMP-\d{3,}$/i;
    if (!codePattern.test(cleanCode)) {
        return "Mã nhân viên phải bắt đầu bằng 'EMP-' và theo sau là ít nhất 3 chữ số (VD: EMP-004)!";
    }

    if (isCheckDuplicate && findEmployeeIndex(cleanCode) !== -1) {
        return "Mã nhân viên đã tồn tại trong hệ thống!";
    }

    return "";
}

function findEmployeeIndex(code) {
    if (!code) return -1;
    let cleanCode = code.trim().toUpperCase();
    return employees.findIndex(emp => emp.employessCode.trim().toUpperCase() === cleanCode);
}


function normalizeText(rawText) {
    if (!rawText) return "";
    return rawText
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}


function inputIntegerInRange(message, min, max) {
    while (true) {
        let input = prompt(`${message} (từ ${min} đến ${max}):`);
        if (input === null) {
            return null; 
        }
        input = input.trim();
        let num = Number(input);
        if (input !== "" && Number.isInteger(num) && num >= min && num <= max) {
            return num;
        }
        alert(`Dữ liệu không hợp lệ! Vui lòng nhập số nguyên trong khoảng [${min}, ${max}].`);
    }
}


function displayEmployees(list) {
    if (!list || list.length === 0) {
        alert("Danh sách nhân viên trống!");
        return;
    }
    console.table(list);
    let result = list.map((emp, index) => 
        `${index + 1}. Mã: ${emp.employessCode} | Tên: ${emp.fullName} | Phòng: ${emp.department} | Tuổi: ${emp.age} | KN: ${emp.experienceYear} năm`
    ).join("\n");
    alert("=== DANH SÁCH NHÂN VIÊN ===\n\n" + result);
}


function handleDisplayEmployees() {
    displayEmployees(employees);
}

function handleAddEmployee() {

    let code;
    while (true) {
        let rawCode = prompt("Nhập mã nhân viên mới (VD: EMP-00):");
        if (rawCode === null) return; 

        let errorMsg = validateEmployeeCode(rawCode, true);
        if (errorMsg === "") {
            code = rawCode.trim().toUpperCase();
            break;
        }
        alert(errorMsg);
    }

    let rawName = prompt("Nhập họ và tên nhân viên:");
    if (rawName === null) return;
    let fullName = normalizeText(rawName);
    if (!fullName) {
        alert("Tên nhân viên không được để trống!");
        return;
    }


    let rawDept = prompt("Nhập phòng ban:");
    if (rawDept === null) return;
    let department = normalizeText(rawDept);
    if (!department) {
        alert("Phòng ban không được để trống!");
        return;
    }


    let age = inputIntegerInRange("Nhập tuổi nhân viên", 18, 65);
    if (age === null) return;

    let experienceYear = inputIntegerInRange("Nhập số năm kinh nghiệm", 0, 50);
    if (experienceYear === null) return;

    employees.push({
        employessCode: code,
        fullName: fullName,
        department: department,
        age: age,
        experienceYear: experienceYear
    });

    alert(`Thêm nhân viên "${fullName}" (${code}) thành công!`);
}


function handleUpdateEmployee() {
    let rawCode = prompt("Nhập mã nhân viên cần cập nhật:");
    if (rawCode === null) return;

    let index = findEmployeeIndex(rawCode);
    if (index === -1) {
        alert("Không tìm thấy nhân viên với mã: " + rawCode.trim().toUpperCase());
        return;
    }

    let emp = employees[index];

    let newName = prompt(`Nhập họ và tên mới (Hiện tại: ${emp.fullName}) - Để trống nếu giữ nguyên:`);
    if (newName === null) return;
    if (newName.trim() !== "") {
        emp.fullName = normalizeText(newName);
    }


    let newDept = prompt(`Nhập phòng ban mới (Hiện tại: ${emp.department}) - Để trống nếu giữ nguyên:`);
    if (newDept === null) return;
    if (newDept.trim() !== "") {
        emp.department = normalizeText(newDept);
    }


    let updateAgeChoice = confirm(`Tuổi hiện tại là: ${emp.age}. Bạn có muốn đổi tuổi không?`);
    if (updateAgeChoice) {
        let newAge = inputIntegerInRange("Nhập tuổi mới", 18, 65);
        if (newAge !== null) {
            emp.age = newAge;
        }
    }


    let updateExpChoice = confirm(`Số năm kinh nghiệm hiện tại là: ${emp.experienceYear}. Bạn có muốn đổi không?`);
    if (updateExpChoice) {
        let newExp = inputIntegerInRange("Nhập số năm kinh nghiệm mới", 0, 50);
        if (newExp !== null) {
            emp.experienceYear = newExp;
        }
    }

    alert(`Cập nhật thông tin nhân viên "${emp.employessCode}" thành công!`);
}


function handleDeleteEmployee() {
    let rawCode = prompt("Nhập mã nhân viên muốn xóa:");
    if (rawCode === null) return;

    let index = findEmployeeIndex(rawCode);
    if (index === -1) {
        alert("Không tìm thấy nhân viên với mã: " + rawCode.trim().toUpperCase());
        return;
    }

    let confirmDelete = confirm(`Bạn có chắc chắn muốn xóa nhân viên "${employees[index].fullName}" (${employees[index].employessCode}) không?`);
    if (confirmDelete) {
        let deleted = employees.splice(index, 1);
        alert(`Đã xóa nhân viên "${deleted[0].fullName}" thành công!`);
    } else {
        alert("Đã hủy thao tác xóa.");
    }
}

function handleSearchByDepartment() {
    let rawDept = prompt("Nhập tên phòng ban cần tìm kiếm:");
    if (rawDept === null) return;

    let keyword = rawDept.trim().toLowerCase();
    if (!keyword) {
        alert("Vui lòng nhập tên phòng ban để tìm kiếm!");
        return;
    }

    let results = employees.filter(emp => emp.department.toLowerCase().includes(keyword));

    if (results.length > 0) {
        displayEmployees(results);
    } else {
        alert(`Không tìm thấy nhân viên nào thuộc phòng ban "${rawDept.trim()}"!`);
    }
}


function runProgram() {
    let isRunning = true;

    while (isRunning) {
        let choice = prompt(`==================================================
  HỆ THỐNG QUẢN LÝ NHÂN VIÊN CÔNG TY SKYTECH
==================================================
1. Hiển thị danh sách nhân viên
2. Thêm nhân viên mới
3. Cập nhật thông tin nhân viên
4. Xóa nhân viên
5. Tìm kiếm nhân viên theo phòng ban
0. Thoát chương trình
==================================================
Vui lòng nhập lựa chọn của bạn (0 - 5):`);
        if (choice === null) {
            alert("Cảm ơn bạn đã sử dụng hệ thống! Tạm biệt.");
            break;
        }

        switch (choice.trim()) {
            case "1":
                handleDisplayEmployees();
                break;
            case "2":
                handleAddEmployee();
                break;
            case "3":
                handleUpdateEmployee();
                break;
            case "4":
                handleDeleteEmployee();
                break;
            case "5":
                handleSearchByDepartment();
                break;
            case "0":
                isRunning = false;
                alert("Cảm ơn bạn đã sử dụng hệ thống! Tạm biệt.");
                break;
            default:
                alert("Lựa chọn không hợp lệ! Vui lòng chọn từ 0 đến 5.");
                break;
        }
    }
}


runProgram();
