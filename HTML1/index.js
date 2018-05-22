/**
 * @description Contact Class
 */
class Contact {
    constructor(id, name, phoneNumber, email, dateOfBirth, address, state) {
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.state = state;
    }
    setId(id){
        this.id = id;
    }
    getId(){
        return this.id;
    }
    setName(name){
        this.name = name;
    }
    getName(){
        return this.name;
    }
    setPhoneNumber(phoneNumber){
        this.phoneNumber = phoneNumber;
    }
    getPhoneNumber(){
        return this.phoneNumber;
    }
    setEmail(email){
        this.email = email;
    }
    getEmail(){
        return this.email;
    }
    setDateOfBirth(dateOfBirth){
        this.dateOfBirth = dateOfBirth;
    }
    getDateOfBirth(){
        return this.dateOfBirth;
    }
    setAddress(address){
        this.address = address;
    }
    getAddress(){
        return this.address;
    }
    setState(state){
        this.state = state;
    }
    getState(){
        return this.state;
    }
    toString(){
        return "id: " + this.getId() + ", name: " + this.getName() + ", phoneNumber: " + this.getPhoneNumber() + ", email: " + this.getEmail() + ", dateOfBirth: " + this.getDateOfBirth() + ", address: " + this.getAddress() + ", state: " + this.getState();
    }
}
// Holds complete contacts list
contactList = [];
//Global Variables
var contacts = null;
var deleteFlag = true;
/**
 * @description init function
 */
window.onload = function (){
    // sample records
    var contact1 = new Contact(1, "Santhosh", 9003435809, "gsaku0091@gmail.com", "2018-05-21", "Coimbatore", "Tamil Nadu");
    var contact2 = new Contact(2, "Kumar", 9003689126, "gsaku0092@gmail.com", "2018-04-21", "Chennai", "Tamil Nadu");
    contactList.push(contact1);
    contactList.push(contact2);
    //Events
    contacts = document.getElementById("contacts-list");
    setMaxData();
    setMinDate();
    loadContacts();
    var deleteBtn = document.getElementById("Delete");
    deleteBtn.onclick = deleteSelected;
    var selectAll = document.getElementById("Select-All");
    selectAll.onclick = selectAllContacts;
    var unSelectAll = document.getElementById("UnSelect-All");
    unSelectAll.onclick = deSelectAllContacts;
    var add_Contact = document.getElementById("Add-Contact");
    add_Contact.onclick = addContact;
    var reset = document.getElementById("Reset");
    reset.onclick = resetForm;
}
/**
 * @description sets min attribute of date input field
 */
function setMinDate(){
    var minDate = new Date();
    var yyyy = minDate.getFullYear() - 100;
    var dd = "01";
    var mm = "01";
    minDate = yyyy + "-" + mm + "-" + dd;
    document.getElementById("dob").setAttribute("min", minDate);
}
/**
 * @description sets max attribute of date input field
 */
function setMaxData(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
        dd = '0' + dd;
    }
    if(mm<10){
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("dob").setAttribute("max", today);
}
/**
 * @description unselects all contacts
 */
function deSelectAllContacts(){
    var checkboxes = document.getElementsByName("select-contact");
    var selectedCheckboxes = [];
    for (let index = 0; index < checkboxes.length; index++) {
        var element = checkboxes[index];
        element.checked = false;
    }
}
/**
 * @description selects all contacts
 */
function selectAllContacts(){
    var checkboxes = document.getElementsByName("select-contact");
    var selectedCheckboxes = [];
    for (let index = 0; index < checkboxes.length; index++) {
        var element = checkboxes[index];
        element.checked = true;
    }
}
/**
 * @description displays the JSON Object into Table format
 */
function loadContacts(){
    var jsonContacts = contactList;
    if(jsonContacts != null && jsonContacts.length > 0){
        var tableContent = "<table id=\"list\" border=\"1\"><thead><tr><th>Select</th><th>Name</th><th>Mobile Number</th><th>EMail</th><th>DOB</th><th>Address</th><th>State</th><th>Actions</th></tr></thead><tbody>";
        var tempData = "";
        var chkboc_value = 0;
        jsonContacts.forEach(function(contact) {
            var tempState = contact.state;
            if(contact.state == "Select State"){
                tempState = "";
            }
            tempData += "<tr>" + "<td><input type=\"checkbox\" name=\"select-contact\" value=\"" + chkboc_value + "\" ></td>" + "<td>" + contact.name + "</td>" + "<td>" + contact.phoneNumber + "</td>" + "<td>" + contact.email + "</td>" + "<td>" + contact.dateOfBirth + "</td>" + "<td>" + contact.address + "</td>" + "<td>" + tempState + "</td>" + "<td>&nbsp;<img src=\"delete.png\" alt=\"delete contact\" height=\"25\" width=\"25\" onclick=\"deleteUpdateUtil(this.id)\" id=\"" + chkboc_value + "-delete\" class=\"delete-icon\" title=\"delete contact\" >&nbsp;&nbsp;<img src=\"edit.svg\" alt=\"Update contact\" height=\"25\" width=\"25\" onclick=\"deleteUpdateUtil(this.id)\" id=\"" + chkboc_value + "-update\" class=\"update-icon\" title=\"edit contact\" ></td>" + "</tr>";
            chkboc_value ++;
        });
        tableContent += tempData;
        tableContent += "</tbody></table>";
        contacts.innerHTML = tableContent;
    }
    else{
        contacts.innerHTML = "";
    }
}
/**
 * @description Util function to delete or update the specified record
 * @param {string} clickedImg id of the clicked icon (delete/update)
 */
function deleteUpdateUtil(clickedImg){
    var rowNumber = parseInt(clickedImg);
    var cmd = clickedImg.split('-');
    if(cmd[1] == "delete"){
        if(deleteFlag){
            deleteContact(rowNumber);
        }
        else{
            alert("Can't delete while updating");
        }
    }
    else if(cmd[1] == "update"){
        toUpdate(rowNumber);
        deleteFlag = false;
    }
}
/**
 * @description Deletes the specified record
 * @param {Number} rowNumber row number of the record to be deleted
 */
function deleteContact(rowNumber){
    if(confirm("Confirm Delete ?")){
        var jsonContacts = contactList;
        var tempContacts = [];
        var it = 0;
        jsonContacts.forEach(function(contact) {
            if(it == rowNumber){
                //Continue
            }
            else{
                tempContacts.push(contact);
            }
            it ++;
        });
        contactList = tempContacts;
        loadContacts();
    }
}
/**
 * @description Makes Specified Record's data to edit
 * @param {Number} rowNumber 
 */
function toUpdate(rowNumber){
    var jsonContacts = contactList;
    var _name = document.getElementById("name");
    _name.value = jsonContacts[rowNumber].name;
    var _phone = document.getElementById("phone");
    _phone.value = jsonContacts[rowNumber].phoneNumber;
    var _email = document.getElementById("email");
    _email.value = jsonContacts[rowNumber].email;
    var _dob = document.getElementById("dob");
    _dob.value = jsonContacts[rowNumber].dateOfBirth;
    var _address = document.getElementById("address");
    _address.value = jsonContacts[rowNumber].address;
    var stateOp = document.getElementById("state");
    if(jsonContacts[rowNumber].state == "Select State"){
        stateOp.selectedIndex = 0;
    }
    else{
        stateOp.value = jsonContacts[rowNumber].state;
    }
    var add_Contact = document.getElementById("Add-Contact");
    add_Contact.style.display = "none";
    var update_Contact = document.getElementById("Update-Contact");
    update_Contact.style.display = "block";
    var reset = document.getElementById("Reset");
    reset.style.display = "none";
    var cancel = document.getElementById("Cancel");
    cancel.style.display = "block";
    cancel.onclick = cancelUpdate;
    update_Contact.onclick = function(){
        updateContact(rowNumber);
    }
}
/**
 * @description Cancel the Update Operation
 */
function cancelUpdate(){
    deleteFlag = true;
    var add_Contact = document.getElementById("Add-Contact");
    add_Contact.style.display = "block";
    var update_Contact = document.getElementById("Update-Contact");
    update_Contact.style.display = "none";
    var reset = document.getElementById("Reset");
    reset.style.display = "block";
    var cancel = document.getElementById("Cancel");
    cancel.style.display = "none";
    resetForm();
}
/**
 * @description Updates the specified record
 * @param {Number} rowNumber row number of the record to be updated
 */
function updateContact(rowNumber){
    console.log("updated record is: " + rowNumber);
    var _name = document.getElementById("name").value;
    var _phone = document.getElementById("phone").value;
    var _email = document.getElementById("email").value;
    var _dob = document.getElementById("dob").value;
    var isValid = validateInput(_name, _phone, _email, _dob);
    if(isValid){
        var _address = document.getElementById("address").value;
        var stateOp = document.getElementById("state");
        var _state = stateOp.options[stateOp.selectedIndex].text;
        var jsonContacts = contactList;
        var newContact = null;
        if(jsonContacts.length == 0){
            newContact = new Contact(1, _name, _phone, _email, _dob, _address, _state);
        }
        else{
            var newId = jsonContacts[rowNumber].id;
            jsonContacts.splice(rowNumber, 1); //if not deleted anything -> delete is disabled while updating
            newContact = new Contact(newId, _name, _phone, _email, _dob, _address, _state);
            jsonContacts.splice(rowNumber, 0, newContact);
        }
        contactList = jsonContacts;
        var error = document.getElementById("Error-Msg");
        error.innerHTML = "Contact Updated";
        error.style.display = "block";
        setTimeout(function() {
            error.innerHTML = null;
            error.style.display = "none";
        }, 5000);
        cancelUpdate();
        loadContacts();
    }
    else{
        var error = document.getElementById("Error-Msg");
        error.style.display = "block";
        setTimeout(function() {
            // error.innerHTML = null;
            // error.style.display = "none";
        }, 3000);
    }
}
/**
 * @description Adds new Contact
 */
function addContact(){
    var _name = document.getElementById("name").value;
    var _phone = document.getElementById("phone").value;
    var _email = document.getElementById("email").value;
    var _dob = document.getElementById("dob").value;
    var isValid = validateInput(_name, _phone, _email, _dob);
    if(isValid){
        var _address = document.getElementById("address").value;
        var stateOp = document.getElementById("state");
        var _state = stateOp.options[stateOp.selectedIndex].text;
        var jsonContacts = contactList;
        var newContact = null;
        if(jsonContacts.length == 0){
            newContact = new Contact(1, _name, _phone, _email, _dob, _address, _state);
        }
        else{
            var newId = jsonContacts[jsonContacts.length-1].id;
            newContact = new Contact(newId, _name, _phone, _email, _dob, _address, _state);
        }
        jsonContacts.push(newContact);
        contactList = jsonContacts;
        var error = document.getElementById("Error-Msg");
        error.innerHTML = "Contact Added";
        error.style.display = "block";
        setTimeout(function() {
            error.innerHTML = null;
            error.style.display = "none";
        }, 5000);
        resetForm();
        loadContacts();
    }
    else{
        var error = document.getElementById("Error-Msg");
        error.style.display = "block";
        setTimeout(function() {
            // error.innerHTML = null;
            // error.style.display = "none";
        }, 3000);
    }
}
/**
 * @description validates name, phone, email, dob
 * @param {string} _name 
 * @param {string} _phone 
 * @param {string} _email 
 * @param {string} _dob 
 */
function validateInput(_name, _phone, _email, _dob){
    var error = document.getElementById("Error-Msg");
    if(_name.length == 0){
        error.innerHTML = "Name is Empty";
        return false;
    }
    else if(_phone.length == 0){
        error.innerHTML = "Phone Number is Empty";
        return false;
    }
    else if(!isPhoneNumber(_phone)){
        error.innerHTML = "Phone Number should have only digits";
        return false;
    }
    else if(_phone.length < 10){
        error.innerHTML = "Phone Number should be 10 digit";
        return false;
    }
    else if(_email != "" && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/i.test(_email))){
        error.innerHTML = "InValid Email ID";
        return false;
    }
    else if(_dob != "" && !checkDOB(_dob)){
        error.innerHTML = "DOB is Invalid";
        return false;
    }
    else{
        return true;
    }
}
/**
 * @description Validates the date with min and max attribute
 * @param {string} _dob 
 */
function checkDOB(_dob){
    var newDate = new Date(_dob);
    var date = new Date();
    var minYear = date.getFullYear() - 100;
    var minDate = new Date(minYear + "-01-01");
    if(!(newDate <= date && newDate >= minDate)){
        return false;
    }
    return true;
}
/**
 * @description Validates the phone number
 * @param {string} _phone 
 */
function isPhoneNumber(_phone){
    var flag = true;
    for (let index = 0; index < _phone.length; index++) {
        if((_phone[index] >= 'A' && _phone[index] <= 'Z') || (_phone[index] >= 'a' && _phone[index] <= 'z')){
            flag = false;
            break;
        }
    };
    return flag;
}
/**
 * @description Resets the input fields
 */
function resetForm(){
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("dob").value = "";
    document.getElementById("address").value = "";
    var stateOp = document.getElementById("state");
    stateOp.selectedIndex = 0;
}
/**
 * @description Deletes all selected records
 */
function deleteSelected(){
    if(deleteFlag){
        var checkboxes = document.getElementsByName("select-contact");
        var selectedCheckboxes = [];
        for (let index = 0; index < checkboxes.length; index++) {
            var element = checkboxes[index];
            if(element.checked){
                selectedCheckboxes.push(parseInt(element.value));
            }
        }
        if(selectedCheckboxes.length == 0){
            alert("Select any one record to proceed..!");
        }
        else{
            if(confirm("Confirm Delete ?")){
                var jsonContacts = contactList;
                var tempContacts = [];
                var it = 0;
                console.log(selectedCheckboxes);
                jsonContacts.forEach(function(contact) {
                    if(selectedCheckboxes.includes(it)){
                        //Continue
                    }
                    else{
                        tempContacts.push(contact);
                    }
                    it ++;
                });
                contactList = tempContacts;
                loadContacts();
            }
        }
    }
    else{
        alert("Can't delete while updating");
    }
}