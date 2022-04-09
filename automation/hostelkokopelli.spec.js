import Hostelkokopelli from '../page-object/hostelkokopelli.po';
import telegram from '../telegram';

const hostelkokopelli = new Hostelkokopelli();
let currentDate = { day: 1, month: 1 };
let numberOfNights = 1;

describe('Check availability', () => {

    beforeAll(async () => {
        await browser.url('https://www.hostelkokopelli.com/cusco');
        await browser.pause(1000);
        let iframe = await $('iframe');
        let a = await iframe.getAttribute('src');
        console.log({ a });
        await browser.switchToFrame(iframe);
    });

    it('should select 2 nights', async () => {
        await hostelkokopelli.nights.click();
        await hostelkokopelli.nightsOptions[numberOfNights - 1].click();
    });

    it('should get current date', async () => {
        await hostelkokopelli.datePiacker.waitForDisplayed({ timeout: 1000 });
        await hostelkokopelli.openDatePicker();
        currentDate.day = await hostelkokopelli.currentDayElem.getText();
        currentDate.day = parseInt(currentDate.day);
        currentDate.month = await hostelkokopelli.month.getText();
        console.log({ currentDate });
        await browser.pause(500);
    });
});


for (let i = 0; i < 35; i++) {
    describe(`Check availability: ${i}`, () => {
        it(`should select next day and press search`, async () => {
            await hostelkokopelli.openDatePicker();
            await hostelkokopelli.clickNextDay(currentDate);
            await hostelkokopelli.availabiliyBtn.click();
        });

        it(`should check availability`, async () => {
            if (!(await hostelkokopelli.noRoomsError.isExisting())) {
                let roomsText = '';
                await hostelkokopelli.resultTable.waitForExist();

                console.log('asdasdasdasd')
                let results = await hostelkokopelli.roomsResult;
                console.log({ length: results.length })
                for (let result of results) {
                    console.log({result})
                    let a = await result.isClickable();
                    console.log({a})
                    roomText = await results[3].getText();
                    console.log({ roomsText })
                    if (roomsText.includes('Private')) {
                        console.log("MATCH!!!!!!!!!!!!!!!!!")
                        console.log({ currentDate })
                    }
                }
            }
        });

        it(`should go back`, async () => {
            await hostelkokopelli.prevPage.scrollIntoView(false);
            await hostelkokopelli.prevPage.click();
        });
    });
}
