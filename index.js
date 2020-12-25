const { Builder, By, Key, until } = require("selenium-webdriver");
require("dotenv").config();

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const start = async () => {
  console.log("Auto rolling started. Press ctrl+c to stop program.");

  let driver = await new Builder().forBrowser("firefox").build();

  await driver.get("https://aimgods.finalmouse.com/");
  await driver.findElement(By.id("username")).sendKeys(process.env.USERNAME);
  await driver
    .findElement(By.id("password"))
    .sendKeys(process.env.PASSWORD, Key.RETURN);

  await sleep(5000);

  await driver.get("https://aimgods.finalmouse.com/goldenKey");

  await sleep(5000);

  let count = 0;

  while (true) {
    await driver
      .findElement(By.xpath('//button[text()="Use A Golden Key"]'))
      .sendKeys(Key.RETURN);

    await driver
      .wait(
        until.elementLocated(By.xpath('//button[text()="Play Again!"]')),
        30000
      )
      .sendKeys(Key.RETURN);

    await sleep(5000);

    console.log("Keys used: ", ++count);
  }
};

start();
