type User = {
  id: number;
  email: string;
};

function sendEmail(email: string, subject: string): void {
  console.log(`Sending "${subject}" to ${email}`);
}

const user: User = {
  id: 42,
  email: "serdar@example.com"
};

const userId = user.id;
const subject = "Welcome";

sendEmail(userId, subject);

