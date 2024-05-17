const { getAvatars } = require("../controllers/avatar.controller");

describe("getAvatars function", () => {
  // Mock req and res objects
  let req;
  let res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of avatar file paths with status 200", () => {
    getAvatars(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
    // Add more specific expectations as needed based on your implementation
  });

  // You can add more test cases to cover edge cases or specific scenarios
});
