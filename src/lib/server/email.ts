import * as nodemailer from 'nodemailer';

let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'alantheking0899@gmail.com',
      pass: 'Alan0323123'
    }
});

export { transport };