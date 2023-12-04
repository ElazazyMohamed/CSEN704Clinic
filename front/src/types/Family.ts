type Family = {
  name: {
    type: String;
    required: true;
  };
  nationalID: {
    type: String;
    required: true;
    unique: true;
  };
  age: {
    type: Number;
    required: true;
  };
  gender: {
    type: String;
    required: true;
  };
  relationToPatient: {
    type: String;
    enum: ["wife", "husband", "child"];
    required: true;
  };
  packageType: {
    type: String;
    required: false;
  };
};
