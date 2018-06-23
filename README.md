# test-cartguru
A little game for cartguru ;)
## Install & Start:

To install all dependencies, run
```bash
npm install
```

Then to run the game with the default input file, just run
```js
npm start
```

Run the tests with
```bash
npm test
```

## Streaming the logs instead of a report

You can use the flag `OUTPUT_MODE=stream` to stream all the logs instead of just getting the final report of the game run.

ie: `OUTPUT_MODE=stream node index.js`

## Inputs

You might want to try some other inputs!

- Either you can modify the `input` file in the project directory
- Or you can run the script with a location argument to pass it one of the test inputs in the `/src/lib/test/` directory

```bash
node index.js --location='/src/lib/test/correct.input.spec'
```

## Notes

- You can set the MAX_RETRIES variable when running the `index.js` script
to not get stuck in an infinite loop if your input cannot be won.
-
