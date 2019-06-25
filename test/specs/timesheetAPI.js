var api = require('chakram')
global.expect = api.expect
const responseTime = 5000
import { sleep } from '../../util/common'

var response, timeSheetId, url
const baseUrl = `${process.env.BASE_URL}/api/v1/supervise/timesheet`
const params = {
    method: 'POST',
    auth: { bearer: process.env.TOKEN }
}

describe('Timesheet Methods', async () => {
    it('Start Timesheet  - POST /supervise/timesheet/start', async () => {
        url = `${baseUrl}/start`
        params.body = {
            'intEmployeeId': 482,
            'intOpunitId': 11
        }
        response = await api.options(url, params)
        expect(response)
            .to.have.status(200)
            .to.have.responsetime(responseTime)
        return timeSheetId = response.body.Id
    })

    it('Take 1 minute Break - POST /supervise/timesheet/pause', async () => {
        url = `${baseUrl}/pause`
        params.body = {
            'intTimesheetId': timeSheetId
        }
        response = await api.options(url, params)
        let breakStatus = await getBreakStatus()
        expect(response).to.have.status(200)
        expect(breakStatus).to.equal('OUT')

        await sleep(60000) //Take 1m Break
    })

    it('End Break - POST /supervise/timesheet/pause', async () => {
        url = `${baseUrl}/pause`
        params.body = {
            'intTimesheetId': timeSheetId
        }
        response = await api.options(url, params)
        let breakStatus = await getBreakStatus()
        expect(response).to.have.status(200)
        expect(breakStatus).to.equal('IN')

    })

    it('Update Timesheet - POST /supervise/timesheet/update', async () => {
        console.log('TIMESHEET ID :  ', timeSheetId)
    })

    it('Discard Timesheet - POST /supervise/timesheet/discard', async () => {
        await sleep(61000)

        url = `${baseUrl}/discard`
        params.body = {
            'intTimesheetId': timeSheetId
        }
        response = await api.options(url, params)
        expect(response).to.have.status(200)

    })
})


async function getBreakStatus() {
    // console.log('MEAL STATUS === ', response.body)
    var breakStatus = (breakStatus = Object.values(response.body.MealbreakSlots))[breakStatus.length - 1]
    return breakStatus
}