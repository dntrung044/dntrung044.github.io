function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

$("#contactForm").on("submit", function(event) {
    event.preventDefault();

    var formData = {
        name: $("#contactForm [name=name]").val(),
        email: $("#contactForm [name=email]").val(),
        subject: $("#contactForm [name=subject]").val(),
        message: $("#contactForm [name=comments]").val(),
    };

    console.log(formData)

    var valid = true;
    if (!formData.name) {
        $("#contactForm [name=name]").focus();
        valid = false;
    }

    if (!(formData.email && validateEmail(formData.email))) {
        $("#contactForm [name=email]").focus();
        valid = false;
    }

    if (!formData.message) {
        $("#contactForm [name=comments]").focus();
        valid = false;
    }

    if (valid == false) {
        return;
    }

    console.log(formData);
    $("#contactForm [type=submit]").text("Sending...");

    // Gọi hàm gửi email
    sendEmail(formData.name, formData.email, formData.subject, formData.message);

    // Gửi dữ liệu qua AJAX
    $.ajax({
        type: "POST",
        url: "/php/contact.php", // Make sure the backend is configured to handle POST requests
        data: formData,
        success: function(response) {
          // Handle successful submission
        },
        error: function(error) {
          alert("There was an error with the form submission.");
        }
      });

    $.ajax({
        type: $("#contactForm").attr("method"),
        url: $("#contactForm").attr("action"),
        data: formData,
    }).done(function(data) {
        // Reset form sau khi gửi thành công
        $("#contactForm")[0].reset();
        $("#contactForm [type=submit]").text("Sent!");
        setTimeout(function() {
            $("#contactForm [type=submit]").text("Send Message");
        }, 4000);
    }).fail(function(error) {
        // Xử lý khi có lỗi xảy ra
        alert("There was an error sending the message. Please try again.");
        $("#contactForm [type=submit]").text("Send Message");
    });
});

function sendEmail(name, email, subject, message) {
    Email.send({
        Host: "smtp.gmail.com",
        Username: "trungdao10a1@gmail.com", // Đảm bảo email này là của bạn
        Password: "oxfmfzzthsdczdrp", // Không nên để mật khẩu trong mã nguồn
        To: "dntrung044@gmail.com", // Địa chỉ người nhận
        From: `${email}`,
        Subject: `${subject}`,
        Body: `Name: ${name}, <br/> Email: ${email}, <br/> Message: ${message}`
    }).then(function(response) {
        alert("Your email has been sent successfully.");
    }).catch(function(error) {
        alert("Error sending email: " + error.message);
    });
}