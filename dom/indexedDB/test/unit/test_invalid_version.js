/**
 * Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/publicdomain/zero/1.0/
 */

/* exported testGenerator */
var testGenerator = testSteps();

// eslint-disable-next-line require-yield
function* testSteps() {
  const name = this.window ? window.location.pathname : "Splendid Test";

  try {
    indexedDB.open(name, 0);
    ok(false, "Should have thrown!");
  } catch (e) {
    ok(e instanceof TypeError, "Got TypeError.");
    is(e.name, "TypeError", "Good error name.");
  }

  try {
    indexedDB.open(name, -1);
    ok(false, "Should have thrown!");
  } catch (e) {
    ok(e instanceof TypeError, "Got TypeError.");
    is(e.name, "TypeError", "Good error name.");
  }

  finishTest();
}
