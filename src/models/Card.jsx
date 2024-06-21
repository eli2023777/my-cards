class Card {
    _id;
    title;
    subtitle;
    description;
    phone;
    email;
    url;
    alt;
    state;
    country;
    city;
    street;
    houseNumber;
    zip;

    constructor(_id, title, subtitle, description, phone,
        email, url, alt, state, country, city, street, houseNumber, zip) {

        this._id = _id;
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
        this.phone = phone;
        this.email = email;
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
        const titleReg = /^[\s\S]{2,256}$/;
        const descriptionReg = /^[\s\S]{2,1024}$/;
        const phoneReg = /^0([2345789])(-?\d){8,10}$/;;
        const urlReg = /^[\s\S]{14,}$/;

        // // Validate Title field
        if (!this.title) {
            formErrors['title'] = "'Title' field must not be empty."
            // } else if (!this.title.match(titleReg)) {
        } else if (!titleReg.test(this.title)) {
            formErrors['title'] = "Title must be from 2 to 256 characters."
        }

        // Validate Subtitle field
        if (!this.subtitle) {
            formErrors['subtitle'] = "'Subtitle' field must not be empty."
            // } else if (!this.subtitle.match(titleReg)) {
        } else if (!titleReg.test(this.subtitle)) {
            formErrors['subtitle'] = "Subtitle must be from 2 to 256 characters."
        }

        // Validate Description field
        if (!this.description) {
            formErrors['description'] = "'Description' field must not be empty."
            // } else if (!this.description.match(descriptionReg)) {
        } else if (!descriptionReg.test(this.description)) {
            formErrors['description'] = "Description must be from 2 to 1024 characters."
        }

        // Validate phone field
        if (!this.phone) {
            formErrors['phone'] = "'Phone' field must not be empty."
            // } else if (!this.phone.match(phoneReg)) {
        } else if (!phoneReg.test(this.phone)) {
            formErrors['phone'] = "Phone must be a valid Israeli phone number ."
        }


        // NO NEED for Email Validate, bec. there is a bootstrap validate on that.


        // Validate Image-url field
        if (!this.url) {
            formErrors['url'] = "'Image-url' field must not be empty."
            // } else if (!this.url.match(urlReg)) {
        } else if (!urlReg.test(this.url)) {
            formErrors['url'] = "Image-url must be at lest 14 characters."
        }

        // Validate Image-alt field
        if (!this.alt) {
            formErrors['alt'] = "'Image-alt' field must not be empty."
            // } else if (!this.alt.match(titleReg)) {
        } else if (!titleReg.test(this.alt)) {
            formErrors['alt'] = "Image-alt must be from 2 to 256 characters."
        }


        // NO NEED for House-number and Zip Validates, bec. there is a bootstrap validate on that.


        return formErrors;
    }


    updateField(fieldName, value) {
        if (Object.hasOwnProperty.call(this, fieldName))
            this[fieldName] = value;
    }
}

export default Card; 