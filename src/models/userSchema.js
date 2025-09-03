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
    phone: {
      type: String,
      match: [
        /^\+?\d{9,15}$/,
        'Phone number must be 9 to 15 digits, optionally starting with +',
      ],
    },
    messengers: [{ type: String }], // наприклад ["telegram", "viber"]
    password: { type: String, required: true },
    ads: [{ type: Schema.Types.ObjectId, ref: 'Advert' }],
    favAds: [{ type: Schema.Types.ObjectId, ref: 'Advert' }],
    notificationsAllowed: { type: Boolean, default: false },
    termsAccepted: { type: Boolean, required: true },
    termsAcceptedAt: { type: Date, default: Date.now },
    termsVersion: { type: String, default: '1.0' },
  },
  { timestamps: true, versionKey: false },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.termsAcceptedAt;
  delete obj.termsVersion;
  return obj;
};

export const UsersCollection = model('User', userSchema);
