class FullUser {
    _id;
    firstName;
    lastName;
    phone;
    url;
    alt;
    state;
    country;
    city;
    street;
    houseNumber;
    zip;

    constructor(_id, firstName, lastName, phone, url, alt,
        state, country, city, street, houseNumber, zip) {
        this._id = _id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.url = url;
        this.alt = alt;
        this.state = state;
        this.country = country;
        this.city = city;
        this.street = street;
        this.houseNumber = houseNumber;
        this.zip = zip;
    }

    validate = () => {
        const formErrors = {};
        const stringReg = /^.{2,256}$/;
        const urlReg = /^[\s\S]{14,}$/;
        const phoneReg = /^0([2345789])(-?\d){8,10}$/;;


        // Validate firstName field
        if (!stringReg.test(this.firstName)) {
            formErrors['firstName'] = "First Name must be from 2 to 256 characters."
        }

        // Validate lastName field
        if (!stringReg.test(this.lastName)) {
            formErrors['lastName'] = "Last Name must be from 2 to 256 characters."
        }

        // Validate phone field
        if (!phoneReg.test(this.phone)) {
            formErrors['phone'] = "Phone must be a valid Israeli phone number ."
        }


        // Validate Image-url field
        if (!urlReg.test(this.url)) {
            formErrors['url'] = "Image-url must be at lest 14 characters."
        }

        // Validate Image-alt field
        if (!stringReg.test(this.alt)) {
            formErrors['alt'] = "Image-alt must be from 2 to 256 characters."
        }

        // Validate country field
        if (!stringReg.test(this.country)) {
            formErrors['country'] = "Country must be from 2 to 256 characters."
        }

        // Validate city field
        if (!stringReg.test(this.city)) {
            formErrors['city'] = "City must be from 2 to 256 characters."
        }

        // Validate street field

        if (!stringReg.test(this.street)) {
            formErrors['street'] = "Street must be from 2 to 256 characters."
        }


        // Validate zip field
        if (!stringReg.test(this.zip)) {
            formErrors['zip'] = "Zip must be from 2 to 256 Digits."
        }

        return formErrors;
    }

    updateField(fieldName, value) {
        if (Object.hasOwnProperty.call(this, fieldName))
            this[fieldName] = value;
    }
}

export default FullUser; 