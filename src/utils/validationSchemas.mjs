const createUserValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage:
        "Username must be at least 5 chracters with a max of 32 characters",
    },
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
    isString: {
      errorMessage: "Username must be a string!",
    },
  },
  displayName: {
    notEmpty: true,
  },
};

const filterUserValidationSchema = {
  filter: {
    isLength: {
      options: {
        min: 3,
        max: 5,
      },
      errorMessage: "Must be at least 3-10 characters",
    },
    notEmpty: {
      errorMessage: "Must not be empty",
    },
    isString: true,
  },
};

export { createUserValidationSchema, filterUserValidationSchema };
