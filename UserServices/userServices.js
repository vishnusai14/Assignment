const transporter = require("../utils/transporter").transporter;
const userModel = require("../Database/Models/User").userModel;

//Get Users

const getUsers = () => {
  const promise = new Promise((resolve, reject) => {
    userModel.find({}, (err, found) => {
      console.log(found);
      console.log(err);
      if (found) {
        resolve(found);
      } else {
        reject(err);
      }
    });
  });
  return promise;
};

//Save User
const addUser = (name, email, phoneNumber, hobbies) => {
  const promise = new Promise((resolve, reject) => {
    const user = new userModel({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      hobbies: hobbies,
    });
    user
      .save()
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return promise;
};

//Update User

const updateUser = (id, name, email, phoneNumber, hobbies) => {
  const promise = new Promise((resolve, reject) => {
    userModel.findOneAndUpdate(
      { id: id },
      { name: name, email: email, phoneNumber: phoneNumber, hobbies: hobbies },
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
  return promise;
};

const deleteUser = (id) => {
  const promise = new Promise((resolve, reject) => {
    userModel.deleteOne({ id: id }, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });

  return promise;
};

const sendEmail = (users) => {
  const promise = new Promise((resolve, reject) => {
    let html =
      '<table style="width:100%"><tr><th>ID</th><th>Name</th><th>Email</th><th>Phone Number</th><th>Hobbies</th></tr>';

    users.map((user) => {
      html += `<tr>
            <td style = "text-align:center">${user.id}</td>
            <td style = "text-align:center">${user.name}</td>
            <td style = "text-align:center">${user.email}</td>
            <td style = "text-align:center">${user.phoneNumber}</td>
            <td style = "text-align:center">${user.hobbies}</td>
          </tr>`;
    });

    html += "</table>";

    let mailOptions = {
      from: process.env.GMAIL,
      to: "info@redpositive.in",
      subject: "Here is the Data of the Selected Member",
      html: html,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
  return promise;
};

module.exports = {
  addUser,
  getUsers,
  updateUser,
  deleteUser,
  sendEmail,
};
