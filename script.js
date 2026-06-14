document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    const inputDay = document.getElementById('day');
    const inputMonth = document.getElementById('month');
    const inputYear = document.getElementById('year');
    const errorDay = document.getElementById('day-error');
    const errorMonth = document.getElementById('month-error');
    const errorYear = document.getElementById('year-error');
    const resultYears = document.getElementById('result-years');
    const resultMonths = document.getElementById('result-months');
    const resultDays = document.getElementById('result-days');

    function validateInputs() {
        let isValid = true;
        
        // Reset lỗi
        errorDay.textContent = '';
        errorMonth.textContent = '';
        errorYear.textContent = '';
        inputDay.closest('.input-group').classList.remove('error');
        inputMonth.closest('.input-group').classList.remove('error');
        inputYear.closest('.input-group').classList.remove('error');

        // Kiểm tra trống
        if (!inputDay.value) {
            errorDay.textContent = 'Trường này bắt buộc';
            inputDay.closest('.input-group').classList.add('error');
            isValid = false;
        }
        if (!inputMonth.value) {
            errorMonth.textContent = 'Trường này bắt buộc';
            inputMonth.closest('.input-group').classList.add('error');
            isValid = false;
        }
        if (!inputYear.value) {
            errorYear.textContent = 'Trường này bắt buộc';
            inputYear.closest('.input-group').classList.add('error');
            isValid = false;
        }

        if (!isValid) return false;

        const day = parseInt(inputDay.value);
        const month = parseInt(inputMonth.value);
        const year = parseInt(inputYear.value);
        const today = new Date();

        // Kiểm tra phạm vi
        if (day < 1 || day > 31) {
            errorDay.textContent = 'Ngày không hợp lệ';
            inputDay.closest('.input-group').classList.add('error');
            isValid = false;
        }
        if (month < 1 || month > 12) {
            errorMonth.textContent = 'Tháng không hợp lệ';
            inputMonth.closest('.input-group').classList.add('error');
            isValid = false;
        }
        if (year > today.getFullYear()) {
            errorYear.textContent = 'Phải trong quá khứ';
            inputYear.closest('.input-group').classList.add('error');
            isValid = false;
        }

        if (!isValid) return false;

        // Kiểm tra tính hợp lệ của ngày cụ thể (ví dụ: ngày 31 tháng 2)
        const dateObj = new Date(year, month - 1, day);
        if (dateObj.getDate() !== day || dateObj.getMonth() !== month - 1 || dateObj.getFullYear() !== year) {
            errorDay.textContent = 'Ngày không hợp lệ';
            inputDay.closest('.input-group').classList.add('error');
            isValid = false;
        }
        // Kiểm tra nếu ngày là trong tương lai
        if (dateObj > today) {
             errorDay.textContent = 'Ngày phải trong quá khứ';
             inputDay.closest('.input-group').classList.add('error');
             isValid = false;
        }

        return isValid;
    }

    function calculateAge() {
        if (!validateInputs()) {
            resultYears.textContent = '—';
            resultMonths.textContent = '—';
            resultDays.textContent = '—';
            return;
        }

        const birthDay = parseInt(inputDay.value);
        const birthMonth = parseInt(inputMonth.value);
        const birthYear = parseInt(inputYear.value);
        
        const today = new Date();
        const currentDay = today.getDate();
        const currentMonth = today.getMonth() + 1; // getMonth() là 0-indexed
        const currentYear = today.getFullYear();

        let ageYears = currentYear - birthYear;
        let ageMonths = currentMonth - birthMonth;
        let ageDays = currentDay - birthDay;

        // Xử lý nếu ngày sinh lớn hơn ngày hiện tại
        if (ageDays < 0) {
            ageMonths--;
            // Lấy số ngày của tháng trước
            const lastMonthDate = new Date(currentYear, currentMonth - 1, 0);
            ageDays += lastMonthDate.getDate();
        }

        // Xử lý nếu tháng sinh lớn hơn tháng hiện tại
        if (ageMonths < 0) {
            ageYears--;
            ageMonths += 12;
        }

        // Cập nhật kết quả với số cụ thể
        resultYears.textContent = ageYears;
        resultMonths.textContent = ageMonths;
        resultDays.textContent = ageDays;
    }

    calculateBtn.addEventListener('click', calculateAge);
    
    // Thêm chức năng nhấn Enter để tính toán
    [inputDay, inputMonth, inputYear].forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                calculateAge();
            }
        });
    });
});