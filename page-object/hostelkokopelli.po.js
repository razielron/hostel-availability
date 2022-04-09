class Hostelkokopelli {

    get nights() { return $('#nights'); }
    get nightsOptions() { return $$('#nights option'); }
    get datePiacker() { return $('#dp'); }
    get availabiliyBtn() { return $('button[onclick="proceed()"]'); }
    get currentDayElem() { return $('td.day.active'); }
    get month() { return $('th.switch'); }
    get nextMonthBtn() { return $('th.next'); }
    get prevPage() { return $('button[onclick="prevpage()"]'); }
    get resultTable() { return $('fieldset table'); }
    get noRoomsError() { return $('.alert.alert-error'); }
    get roomsResult() { return this.resultTable.$$('td'); }

    async getDay(day = 1) {
        console.log({day});
        let allDays = await $$(`td.day=${day.toString()}`);
        let filterDisabledDays = await allDays.reduce(async (filteredArr, currentElem) => {
            let attribute = await currentElem.getAttribute('class');
            if(!attribute.includes('disabled') && await currentElem.isClickable()) {
                filteredArr = [...await filteredArr, await currentElem];
            }
            return filteredArr;
        }, []);

        let arrLength = filterDisabledDays.length;

        return arrLength ? filterDisabledDays[arrLength - 1] : undefined;
    }


    async openDatePicker() {
        if(!(await this.currentDayElem.isDisplayed())) {
            await this.datePiacker.click();
        }
    }

    async clickNextDay(currentDate) {
        if(!currentDate) throw "missing currenDay";

        if((await this.getDay(currentDate.day + 1))) {
            currentDate.day += 1;
            await this.getDay(currentDate.day).click();
        } else {
            currentDate.day = 1;
            await this.nextMonthBtn.click();
            await  this.getDay(currentDate.day).click();
        }

        currentDate.month = await this.month.getText();
    }

    async checkForAvailableRooms() {
        return await this.resultTable.isExisting();
    }
}

module.exports = Hostelkokopelli;