const errorResponse = {
  message: "An error occurred trying to process your request",
  isSuccessFull: false,
  status: 500,
  data: null,
};

const successResponse = {
  message: "Successful",
  isSuccessFull: true,
  status: 200,
  data: null,
};

module.exports = {
  errorResponse,
  successResponse,
};
