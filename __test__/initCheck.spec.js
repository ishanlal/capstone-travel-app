// Import the js file to test
import { init } from "../src/client/js/app"
// The describe() function takes two arguments - a string description, and a test suite as a callback function.
// A test suite may contain one or more related tests
describe("Testing the name checker functionality", () => {
    test("Testing the checkForName() function", () => {
           expect(init).toBeDefined();
})
});
