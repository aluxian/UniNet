module.exports = {
  db: process.env.MONGOLAB_URI || 'mongodb://localhost:27017/uninet06',
  sessionSecret: process.env.SESSION_SECRET || 'Session Secret',
  sendgrid: {
    user: process.env.SENDGRID_USERNAME || 'hslogin',
    password: process.env.SENDGRID_PASSWORD || 'hspassword00'
  }
};
