// Name validation
function validateName() {
  const name = document.getElementById("Name");
  const nameError = document.getElementById("nameError");
  const nameSuccess = document.getElementById("nameSuccess");

  nameError.style.display = "none";
  nameSuccess.style.display = "none";

  if (name.value.trim().length == 0) {
    nameError.innerHTML = "Name is required";
    name.style.border = "1px solid red";
    nameError.style.display = "block";
    return false;
  }

  if (!name.value.match(/^[a-zA-Z ]+$/)) {
    nameError.innerHTML = "Name should contain letters only";
    name.style.border = "1px solid red";
    nameError.style.display = "block";
    return false;
  }
  nameError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  name.style.border = "1px solid green";
  nameSuccess.style.display = "block";
  return true;
}

// Email validation
function validateEmail() {
  const email = document.getElementById("Email");
  const emailError = document.getElementById("emailError");
  const emailSuccess = document.getElementById("emailSuccess");

  emailError.style.display = "none";
  emailSuccess.style.display = "none";

  if (email.value.trim().length == 0) {
    emailError.innerHTML = "Email is required";
    email.style.border = "1px solid red";
    emailError.style.display = "block";
    return false;
  }

  if (!email.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
    emailError.innerHTML = "Email is invalid";
    email.style.border = "1px solid red";
    emailError.style.display = "block";
    return false;
  }
  emailError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  email.style.border = "1px solid green";
  emailSuccess.style.display = "block";
  return true;
}

// Mobile Number validation
function validateMobileNo() {
  const mobileNo = document.getElementById("mobileNo");
  const MobileNoError = document.getElementById("MobileNoError");
  const MobileNoSuccess = document.getElementById("MobileNoSuccess");

  var mobileNoLength = 10;
  MobileNoError.style.display = "none";
  MobileNoSuccess.style.display = "none";

  if (mobileNo.value.trim().length == 0) {
    MobileNoError.innerHTML = "MobileNo is required";
    mobileNo.style.border = "1px solid red";
    MobileNoError.style.display = "block";
    return false;
  }
  if (!mobileNo.value.match(/^[0-9 ]+$/)) {
    MobileNoError.innerHTML = "MobileNo should conatin Numbers only";
    mobileNo.style.border = "1px solid red";
    MobileNoError.style.display = "block";
    return false;
  }
  if (mobileNo.value.length !== mobileNoLength) {
    MobileNoError.innerHTML = "MobileNo should contain 10 numbers";
    mobileNo.style.border = "1px solid red";
    MobileNoError.style.display = "block";
    return false;
  }

  MobileNoError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  mobileNo.style.border = "1px solid green";
  MobileNoSuccess.style.display = "block";
  return true;
}

// Using jquery

//  DOB validation
$("#DOB").datepicker({
  changeMonth: true,
  changeYear: true,
  yearRange: "-100:+0", // allows 100 years back
  maxDate: new Date(), // prevents future dates
  dateFormat: "dd/mm/yy",
});

$("#DOB").on("change", function () {
  validateDOB(); // call validation on change
});

function validateDOB() {
  const dobStr = $("#DOB").val().trim();
  const dobError = $("#dobError");
  const dobSuccess = $("#dobSuccess");

  dobError.hide();
  dobSuccess.hide();

  if (dobStr === "") {
    dobError.text("Date of Birth is required").css("display", "block");
    $("#DOB").css("border", "1px solid red");
    return false;
  }

  const parts = dobStr.split("/");

  if (parts.length !== 3) {
    dobError.text("Invalid date format").css("display", "block");
    $("#DOB").css("border", "1px solid red");
    return false;
  }

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // month is 0 indexed
  const year = parseInt(parts[2], 10);

  const dobDate = new Date(year, month, day);
  const today = new Date();

  // Clear time part for accurate comparison
  dobDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  // Validate correct date
  if (
    dobDate.getFullYear() !== year ||
    dobDate.getMonth() !== month ||
    dobDate.getDate() !== day
  ) {
    dobError.text("Invalid date").css("display", "block");
    $("#DOB").css("border", "1px solid red");
    return false;
  }

  // Future date check
  if (dobDate > today) {
    dobError
      .text("Date of Birth cannot be in the future")
      .css("display", "block");
    $("#DOB").css("border", "1px solid red");
    return false;
  }

  $("#DOB").css("border", "1px solid green");
  dobSuccess.show();
  return true;
}

// password validation
function validatePassword() {
  const passwordVal = $("#password").val().trim();
  const passwordError = $("#passwordError");
  const passwordSuccess = $("#passwordSuccess");

  passwordError.hide();
  passwordSuccess.hide();

  // Checking the validations
  if (passwordVal.length < 8) {
    passwordError.text("Password must be at least 8 characters").show();
    $("#password").css("border", "1px solid red");
    return false;
  }

  if (!/[A-Z]/.test(passwordVal)) {
    passwordError
      .text("Password must include at least one uppercase letter")
      .show();
    $("#password").css("border", "1px solid red");
    return false;
  }

  if (!/[a-z]/.test(passwordVal)) {
    passwordError
      .text("Password must include at least one lowercase letter")
      .show();
    $("#password").css("border", "1px solid red");
    return false;
  }

  if (!/[0-9]/.test(passwordVal)) {
    passwordError.text("Password must include at least one number").show();
    $("#password").css("border", "1px solid red");
    return false;
  }

  $("#password").css("border", "1px solid green");
  passwordSuccess.show();
  return true;
}

// show and hide functionality for password
$("#togglePassword").on("click", function () {
  const input = $("#password");
  const icon = $(this);
  const isVisible = input.attr("type") === "text";

  input.attr("type", isVisible ? "password" : "text");
  icon.toggleClass("fa-eye fa-eye-slash");
});

// confirm password validations
function validateConfirmPassword() {
  const passwordVal = $("#password").val().trim();
  const confirmVal = $("#confirmPassword").val().trim();

  $("#confirmPasswordError").hide();
  $("#confirmPasswordSuccess").hide();

  if (confirmVal !== passwordVal || confirmVal === "") {
    $("#confirmPasswordError")
      .text("Passwords do not match")
      .css("display", "block");
    $("#confirmPassword").css("border", "1px solid red");
    return false;
  } else {
    $("#confirmPassword").css("border", "1px solid green");
    $("#confirmPasswordSuccess").show();
    return true;
  }
}

// show and hide functionality for confirm password
$("#toggleConfirmPassword").on("click", function () {
  const input = $("#confirmPassword");
  const icon = $(this);
  const isVisible = input.attr("type") === "text";

  input.attr("type", isVisible ? "password" : "text");
  icon.toggleClass("fa-eye fa-eye-slash");
});

// form validation
$("#signupForm").on("submit", function (e) {
  e.preventDefault(); // prevent actual form submit

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isMobileValid = validateMobileNo();
  const isDOBValid = validateDOB();
  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();

  if (
    isNameValid &&
    isEmailValid &&
    isMobileValid &&
    isPasswordValid &&
    isConfirmPasswordValid &&
    isDOBValid
  ) {
    $(".form_right").html(`
      <div class="thank_you_msg">
        <h2>🎉Thank You!</h2>
        <p>Your form has been submitted successfully.</p>
      </div>
    `);
  } else {
    alert("Please fix the errors before submitting");
  }
});
