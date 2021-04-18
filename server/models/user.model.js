const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema (
    {
        firstName: {
            type: String,
            required: [ true, "First Name is required"],
        },
        lastName: {
            type: String,
            required: [ true, "Last Name is required"],
        },
        email: {
            type: String,
            required: [ true, "Email is required"],
        },
        password: {
            type: String,
            required: [ true, "Password is required"],
            minLength: [ 8, "Password must be atleast 8 characters"]
        },
        address: {
            type: String,
            required: [ true, "Address is required"],
        },
        city: {
            type: String,
            required: [ true, "City is required"],
        },
        state: {
            type: String,
            required: [ true, "State is required"],
        },

        orders: [
            {
                date: {
                    type: Date
                },
                favorite: {
                    type: Boolean
                },
                
                size: {
                    type: String
                },
                method: {
                    type: String
                },
                crust: {
                    type: String
                },
                price: {
                    type: Number,
                },
                toppings: [
                    {
                        type: String
                    }
                ],
            }
        ],

        favorite: {            
            size: {
                type: String
            },
            method: {
                type: String
            },
            crust: {
                type: String
            },
            price: {
                type: Number,
            },
            toppings: [
                {
                    type: String
                }
            ],
        }
    },
    { timestamps: true }
);

UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set((value) => this._confirmPassword = value);

// validate passwords BEFORE the normal model validation
UserSchema.pre("validate", function(next) {
    if(this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Passwords must match!");
    }
    next();
})

// hash the password prior to saving in to MongoDB
UserSchema.pre("save", function(next) {
bcrypt.hash(this.password, 10)
    .then((hashedPass) => {
        this.password = hashedPass;
        next();
    })
})

// this will create a NEW collection in the same DB as Karaoke Models
// the new collection will have a lowercase name and will be made plural
//    This will be:   users
const User = mongoose.model("User", UserSchema);

module.exports = User;
