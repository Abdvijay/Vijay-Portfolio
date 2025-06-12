<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

  // Replace with your email address
  $to = "abdvijay19@gmail.com";

  // Sanitize form inputs
  $name = htmlspecialchars(trim($_POST["name"]));
  $email = htmlspecialchars(trim($_POST["email"]));
  $subject = htmlspecialchars(trim($_POST["subject"]));
  $message = htmlspecialchars(trim($_POST["message"]));

  // Validate inputs
  if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    echo "All fields are required!";
    exit;
  }

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Invalid email format!";
    exit;
  }

  // Email content
  $email_subject = "Portfolio Contact: $subject";
  $email_body = "You have received a new message from your portfolio contact form:\n\n" .
                "Name: $name\n" .
                "Email: $email\n" .
                "Subject: $subject\n" .
                "Message:\n$message\n";

  $headers = "From: $email\r\n";
  $headers .= "Reply-To: $email\r\n";

  // Send the email
  if (mail($to, $email_subject, $email_body, $headers)) {
    echo "OK";
  } else {
    echo "Message could not be sent. Please try again later.";
  }

} else {
  echo "Invalid request.";
}
?>