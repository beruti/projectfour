var Contact = require("../models/contact");
var User = require("../models/user");

function contactsIndex(req, res){
  Contact.find({}, function(err, contacts) {
    if (err) return res.status(404).send(err);
    res.status(200).send(contacts);
  });
}

function contactsCreate(req, res){
  console.log("contactsCreate being hit")
  console.log(req.body.contact)
  var contact = new Contact(req.body.contact);

  contact.save(function(err){
    if (err) return res.status(500).send(err);
    var id = req.body.contact.user_id;
    User.findById(id, function(err, user){
       user.contacts.push(contact);
       user.save();
       return res.status(201).send(contact);
    });
  });
}

function contactsShow(req, res){
  var id = req.params.id;
  Contact.findById({ _id: id }, function(err, contact) {
    if (err) return res.status(500).send(err);
    if (!contact) return res.status(404).send(err);
    res.status(200).send(contact);
    console.log(contact)
  });
}

function contactsUpdate(req, res){
  var id = req.params.id;
  Contact.findByIdAndUpdate({ _id: id }, req.body.contact, function(err, contact){
    if (err) return res.status(500).send(err);
    if (!contact) return res.status(404).send(err);
    res.status(200).send(contact);
  });
}

function contactsDelete(req, res){
  var id = req.params.id;
  Contact.remove({ _id: id }, function(err) {
    if (err) return res.status(500).send(err);
    res.status(200).send();
  });
}

module.exports = {
  contactsIndex:  contactsIndex,
  contactsCreate: contactsCreate,
  contactsShow:   contactsShow,
  contactsUpdate: contactsUpdate,
  contactsDelete: contactsDelete
};
