import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 2, maxlength: 50 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    phone: { type: String },
    messengers: [{ type: String }], // наприклад ["telegram", "viber"]
    password: { type: String, required: true },
    ads: [{ type: Schema.Types.ObjectId, ref: 'Advert' }],
    notificationsAllowed: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('User', userSchema);
